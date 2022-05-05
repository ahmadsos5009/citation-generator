import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Alert, Box, Snackbar, Stack } from "@mui/material"
import { StoreContext } from "../provider/Store"
import { CiteResourceButton, ClearFields } from "./Buttons"
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
import { ImportCitationBox, OnFlyCitationBox } from "./Citation"
import { DBContext } from "../provider/DBProvider"
import { clearCitationFields, fillCitationFields } from "./utilities/html_fields"
import { documentFields, labels } from "../cslTypes/fieldsMapping"
import { ContributorsInput, DateField, LinkInput, TextField } from "./Inputs"

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
  const refNode = useRef<HTMLDivElement>()

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
    <Box
      ref={refNode}
      id="form-container"
      sx={{
        "& .MuiTextField-root": { m: 1 },
        height: "100%",
      }}
    >
      {documentType !== CitationDocumentType.REPORT && (
        <ImportCitationBox documentType={documentType} />
      )}

      <OnFlyCitationBox citation={citation} handleClick={handleClick} />

      <Box
        display="flex"
        sx={{
          height: "min-content",
          width: "100%",
        }}
      >
        <Box width="100%">
          {fields.map((field, index) => (
            <Fragment key={index.toString()}>
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
            </Fragment>
          ))}
        </Box>

        <Stack
          spacing={4}
          sx={{
            position: "sticky",
            top: "10%",
            display: "block",
            height: "100%",
            margin: "40px 0 0 20px",
          }}
        >
          <CiteResourceButton onCiteResource={onCiteResource} />
          <ClearFields document={documentType} />
        </Stack>
      </Box>

      <Snackbar open={showAlert} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Citation Copied to clipboard
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Form
