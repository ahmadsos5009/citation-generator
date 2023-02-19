import React, { useCallback, useContext, useMemo } from "react"
import {
  Alert,
  Container,
  FormControl,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material"

import { Citation, CitationDocumentType, CitationJSDocumentType } from "../types"

import { documentFields } from "../cslTypes/fieldsMapping"

import { ClearFields, SaveCitationButton } from "./Buttons"
import { ContributorsInput, DateField, LinkInput, TextField } from "./Inputs"
import { ImportCitationBox } from "./Citation"
import { GeneratorContext } from "../provider/GeneratorProvider"

import { useClipboard } from "./hooks"
import CitationToolbar from "./form/CitationToolbar"
import QuickCitationPreview from "./form/QuickCitationPreview"

export const eliminatedFields: { [key in CitationDocumentType]: string[] } = {
  [CitationDocumentType.JOURNAL]: [
    "abstract",
    "shortTitle",
    "journalAbbreviation",
    "language",
    "ISSN",
    "accessed",
    "source",
    "call-number",
    "note",
  ],
  [CitationDocumentType.BOOK]: [
    "abstract",
    "collection-title",
    "collection-number",
    "number-of-volumes",
    "publisher-place",
    "number-of-pages",
    "language",
    "ISBN",
    "source",
    "accessed",
    "call-number",
    "note",
  ],
  [CitationDocumentType.WEBSITE]: [
    "abstract",
    "publisher-place",
    "language",
    "source",
    "accessed",
    "call-number",
    "note",
  ],
  [CitationDocumentType.REPORT]: [
    "abstract",
    "language",
    "note",
    "source",
    "accessed",
    "call-number",
  ],
}

const CitationForm: React.FC = () => {
  const { documentType, style, xml, reset } = useContext(GeneratorContext)

  const { showAlert, handleClick, handleClose } = useClipboard()

  const fields = useMemo(
    () =>
      documentFields[CitationJSDocumentType[documentType]].filter((field) => {
        if (!eliminatedFields[documentType].includes(field)) {
          if (field === "DOI" && documentType === CitationDocumentType.JOURNAL) {
            return field
          }

          if (!(field === "URL" && documentType === CitationDocumentType.JOURNAL)) {
            return field
          }
        }
      }),
    [documentType],
  )

  const setImportedCitation = useCallback(
    (citation: Citation) => reset(citation),
    [],
  )

  return (
    <Grid container direction="column" justifyContent="center" id="form-container">
      <CitationToolbar />

      <QuickCitationPreview />

      <Typography
        py={1}
        textAlign={{ xs: "center", md: "start" }}
        variant="subtitle2"
        fontWeight="500"
      >
        Fill entry to generate citation manually on the fly or Import citation from
        an external source
      </Typography>

      {documentType !== CitationDocumentType.REPORT && (
        <ImportCitationBox
          documentType={documentType}
          style={style}
          xml={xml}
          updateCitation={setImportedCitation}
        />
      )}

      <Grid container justifyContent="center" item>
        <Grid item xs={8} md={10} container>
          <FormControl fullWidth component="form">
            {fields.map((field, index) => (
              <Grid item xs={12} py={1} key={index.toString()}>
                {{
                  issued: <DateField id={field} />,
                  accessed: <DateField id={field} />,
                  DOI: <LinkInput />,
                  contributors: <ContributorsInput />,
                }[field] || <TextField id={field} />}
              </Grid>
            ))}
          </FormControl>
        </Grid>

        <Grid item container direction="column" alignItems="center" xs={2} md={2}>
          <Container
            disableGutters
            sx={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              top: 0,
              bottom: 0,
              position: "sticky",
              pl: "6px",
              pt: "32px",
            }}
          >
            <SaveCitationButton />
            <ClearFields />
          </Container>
        </Grid>
      </Grid>
      {/* TODO:: move to form component */}

      <Snackbar open={showAlert} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Citation Copied to clipboard
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default CitationForm
