import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Alert, Container, Grid, Snackbar } from "@mui/material"
import { StoreContext } from "../provider/Store"

import {
  Citation,
  CitationDocumentType,
  CitationJSDocumentType,
  CitationOutput,
  Events,
} from "../types"
import { generateCitation } from "./utilities/citation_generator"
import { isEmptyObject } from "./utilities/object"
import { useClipboard } from "./hooks"

import { DBContext } from "../provider/DBProvider"
import { clearCitationFields, fillCitationFields } from "./utilities/html_fields"
import { documentFields, labels } from "../cslTypes/fieldsMapping"

import { CiteResourceButton, ClearFields } from "./Buttons"
import { ContributorsInput, DateField, LinkInput, TextField } from "./Inputs"
import { ImportCitationBox, OnFlyCitationBox } from "./Citation"

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

const Form: React.FC<{ type: CitationDocumentType }> = ({ type }) => {
  switch (type) {
    case CitationDocumentType.JOURNAL:
      return <DocumentForm documentType={CitationDocumentType.JOURNAL} />
    case CitationDocumentType.BOOK:
      return <DocumentForm documentType={CitationDocumentType.BOOK} />
    case CitationDocumentType.REPORT:
      return <DocumentForm documentType={CitationDocumentType.REPORT} />
    case CitationDocumentType.WEBSITE:
      return <DocumentForm documentType={CitationDocumentType.WEBSITE} />
    default:
      return <></>
  }
}

const DocumentForm: React.FC<{ documentType: CitationDocumentType }> = ({
  documentType,
}) => {
  const refNode = useRef<HTMLDivElement>(null)

  const { state, dispatch } = useContext(StoreContext)
  const DB = useContext(DBContext)
  const [citation, setCitation] = useState<CitationOutput | undefined>()

  useEffect(() => {
    fillCitationFields(documentType, state[documentType])
  }, [])

  useEffect(() => {
    if (!isEmptyObject(state[documentType])) {
      const { convertedCitation, inText } = generateCitation(
        state[documentType],
        CitationJSDocumentType[documentType],
        "html",
        DB.format,
      )
      setCitation({
        html: convertedCitation,
        inText,
      })
      //  TODO:: show error in the UI
    } else {
      setCitation(undefined)
    }
  }, [state])

  const onCiteResource = useCallback(() => {
    // TODO:: add validation
    if (documentType in state && !isEmptyObject(state[documentType])) {
      DB.dispatch({
        type: "save",
        citationDocument: documentType,
        citation: state[documentType],
      })
      clearCitationFields(documentType)

      dispatch({ type: "clear", documentType })

      if (!DB.showCitationsList) {
        DB.setShowCitationsList(true)
      }
    }
  }, [setCitation, state[documentType]])

  const { showAlert, handleClick, handleClose } = useClipboard(
    state[documentType],
    CitationJSDocumentType[documentType],
  )

  useEffect(() => {
    if (!refNode.current) return

    const callback = (e: CustomEvent<{ payload: Citation }>) =>
      dispatch({
        type: "fill",
        documentType: documentType,
        value: e.detail.payload,
      })
    refNode.current?.addEventListener(Events.CITATION, callback as EventListener)
    return () =>
      refNode.current?.removeEventListener(
        Events.CITATION,
        callback as EventListener,
      )
  }, [refNode])

  const fields = useMemo(
    () =>
      documentFields[CitationJSDocumentType[documentType]].filter(
        (field) => !eliminatedFields[documentType].includes(field),
      ),
    [],
  )

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      ref={refNode}
      id="form-container"
    >
      {documentType !== CitationDocumentType.REPORT && (
        <ImportCitationBox documentType={documentType} />
      )}

      <Grid item container justifyContent="center" py={2}>
        <OnFlyCitationBox citation={citation} handleClick={handleClick} />
      </Grid>

      {/* TODO:: move to form component */}
      <Grid container justifyContent="center" item>
        <Grid item xs={8} sm={10} lg={11} container>
          {fields.map((field, index) => (
            <Grid item xs={12} py={2} pl={{ md: 4 }} key={index.toString()}>
              {/* TODO:: move logic up */}
              {((field === "issued" || field === "accessed") && (
                <>
                  <ContributorsInput documentType={documentType} />
                  <DateField
                    label={labels[field]}
                    id={field}
                    documentType={documentType}
                  />
                </>
              )) ||
                (field === "DOI" &&
                  documentType === CitationDocumentType.JOURNAL && (
                    <LinkInput documentType={documentType} />
                  )) ||
                (!(
                  field === "URL" && documentType === CitationDocumentType.JOURNAL
                ) && (
                  <TextField
                    label={labels[field]}
                    id={field}
                    required
                    documentType={documentType}
                  />
                ))}
            </Grid>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          alignItems="center"
          xs={2}
          sm={1}
          lg={1}
        >
          <Container
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "column",
              top: 0,
              bottom: 0,
              position: "sticky",
              pl: "6px",
            }}
          >
            <CiteResourceButton onCiteResource={onCiteResource} />
            <ClearFields document={documentType} />
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

export default Form
