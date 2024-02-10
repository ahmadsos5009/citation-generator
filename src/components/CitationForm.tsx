import React, { useCallback, useContext } from "react"
import { Container, Grid } from "@mui/material"

import { Citation } from "../types"

import { ClearFields, SaveCitationButton } from "./Buttons"

import { GeneratorContext } from "../provider/GeneratorProvider"

export const eliminatedFields = {
  "article-journal": [
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
  book: [
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
  webpage: [
    "abstract",
    "publisher-place",
    "language",
    "source",
    "accessed",
    "call-number",
    "note",
  ],
  report: ["abstract", "language", "note", "source", "accessed", "call-number"],
}

const CitationForm: React.FC = () => {
  const { documentType, style, note, xml, reset } = useContext(GeneratorContext)

  const setImportedCitation = useCallback(
    (citation: Citation) => reset(citation),
    [],
  )

  return (
    <Grid container direction="column" justifyContent="center" id="form-container">
      {/*<CitationToolbar />*/}

      {/*<QuickCitationPreview />*/}

      {/*<Typography*/}
      {/*  py={1}*/}
      {/*  textAlign={{ xs: "center", md: "start" }}*/}
      {/*  variant="subtitle2"*/}
      {/*  fontWeight="500"*/}
      {/*>*/}
      {/*  Fill entry to generate citation manually on the fly or Import citation from*/}
      {/*  an external source*/}
      {/*</Typography>*/}

      {/*<ImportCitationBox*/}
      {/*  documentType={documentType}*/}
      {/*  style={note ? `annotation/${style}` : style}*/}
      {/*  xml={xml}*/}
      {/*  updateCitation={setImportedCitation}*/}
      {/*/>*/}

      {/*<Form />*/}
    </Grid>
  )
}

export const Form: React.FC = () => {
  // const { documentType, note } = useContext(GeneratorContext)

  // const fields = useMemo(
  //   () =>
  //     documentType === "article-journal" ||
  //     documentType === "book" ||
  //     documentType === "webpage" ||
  //     documentType === "report"
  //       ? documentFields[documentType].filter((field) => {
  //           if (note && field === "note") {
  //             return field
  //           }
  //
  //           // @ts-ignore
  //           if (!eliminatedFields[documentType].includes(field)) {
  //             if (field === "DOI" && documentType === "article-journal") {
  //               return field
  //             }
  //
  //             if (!(field === "URL" && documentType === "article-journal")) {
  //               return field
  //             }
  //           }
  //         })
  //       : documentFields[documentType],
  //   [documentType, note],
  // )

  return (
    <Grid container justifyContent="center" item>
      {/*<Grid item xs={8} md={10} container>*/}
      {/*  <FormControl fullWidth component="form">*/}
      {/*    {fields.map((field, index) => (*/}
      {/*      <Grid item xs={12} py={1} key={index.toString()}>*/}
      {/*        {{*/}
      {/*          issued: <DateField id={field} />,*/}
      {/*          accessed: <DateField id={field} />,*/}
      {/*          DOI: <LinkInput />,*/}
      {/*          contributors: <ContributorsInput />,*/}
      {/*        }[field] || <TextField id={field} />}*/}
      {/*      </Grid>*/}
      {/*    ))}*/}
      {/*  </FormControl>*/}
      {/*</Grid>*/}

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
  )
}

export default CitationForm
