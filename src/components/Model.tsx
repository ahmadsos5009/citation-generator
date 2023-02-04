import React, { useCallback, useContext, useRef, useState } from "react"
import {
  Alert,
  Box,
  Button,
  Fab,
  FilledInput,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Snackbar,
  Stack,
  styled as MUIStyled,
  TextField,
  Typography,
} from "@mui/material"
import {
  export_bibTex,
  export_pdf,
  export_word,
} from "./utilities/citation_exporter"

import { DBContext } from "../provider/DBProvider"
import { generateCitation } from "./utilities/citation_generator"
import { Citation, CitationDocumentType, DocumentType } from "../types"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import { Cite } from "@citation-js/core"
import sendFeedback from "./utilities/feedback-api"

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export const ExportFileNameModel: React.FC<{
  buttonText: string
  citationHtml: string
  citationsJson: Citation & { type: DocumentType }[]
  buttonIcon: React.ReactNode
  closeDropDown: () => void
}> = ({ buttonText, buttonIcon, closeDropDown, citationHtml, citationsJson }) => {
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState("references")
  const [showAlert, setShowAlert] = useState(false)

  const handleOpen = useCallback(() => {
    if (citationsJson.length > 0) {
      setOpen(true)
    } else {
      setShowAlert(true)
    }
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
    closeDropDown()
  }, [setOpen])

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.currentTarget.value),
    [setFileName],
  )

  const handleDownloadClick = useCallback(() => {
    switch (buttonText) {
      case "PDF":
        export_pdf(citationHtml, fileName)
        break
      case "Word":
        export_word(citationHtml, fileName)
        break
      case "BibTex":
        export_bibTex(citationsJson, fileName)
        break
    }
    handleClose()
  }, [citationHtml, citationsJson, fileName])

  const closeSnackbar = useCallback(() => setShowAlert(false), [setShowAlert])

  return (
    <div>
      <MenuItem onClick={handleOpen} sx={{ justifyContent: "space-between" }}>
        {buttonText}
        {buttonIcon}
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Export To {buttonText} file
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            File Name:
          </Typography>
          <FilledInput onChange={onChange} fullWidth value={fileName} />
          <Button onClick={handleDownloadClick}>Download</Button>
        </Box>
      </Modal>

      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity="warning" sx={{ width: "100%" }}>
          Select All Citations / Or at least one of them
        </Alert>
      </Snackbar>
    </div>
  )
}

require("@citation-js/plugin-isbn")
require("@citation-js/plugin-doi")
require("@citation-js/plugin-bibjson")
require("@citation-js/plugin-bibtex")

import { Spinner } from "./editor/Spinner"
import EditIcon from "@mui/icons-material/Edit"
import { DocumentIcon, ImportCitation } from "./Citation"
import { clearCitationFields, fillCitationFields } from "./utilities/html_fields"
import { StoreContext } from "../provider/Store"
import SaveIcon from "@mui/icons-material/Save"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"
import { navigate } from "gatsby"
import { EditorContext } from "../provider/EditorProvider"
import FeedbackIcon from "@mui/icons-material/Feedback"
import { Feedback } from "./Buttons"
import { validateFeedback } from "./utilities/text-validation"

export const UploadFileModel: React.FC<{
  documentType: CitationDocumentType
  editor?: boolean
}> = ({ documentType, editor }) => {
  const [open, setOpen] = useState(false)
  const [uploadError, setUploadError] = useState<string | undefined>(undefined)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [outputJson, setOutputJson] = useState<ImportCitation[]>()

  const uploadRef = useRef<HTMLInputElement>()

  const handleClose = useCallback(async () => {
    setOpen(false)
    if (uploadRef.current) uploadRef.current.value = ""
  }, [setOpen])

  const onFileUpload = useCallback((event) => {
    try {
      setOpen(true)

      const file = event.target.files[0]

      if (file.size > 25431761) {
        setUploadError("File size is more than allowed space")
        return
      }

      const fileReader = new FileReader()

      fileReader.onloadend = async () => {
        const cite = Cite(fileReader.result, { format: "string" })
        const outputJson = cite.get({ format: "real", type: "json", style: "csl" })
        setOutputJson(outputJson)
      }

      fileReader.onprogress = (e) =>
        setUploadProgress(Math.round((e.loaded * 100) / e.total))

      fileReader.onerror = () => setUploadError("Upload file error, try again")

      fileReader.readAsText(file)
    } catch (e) {
      setUploadError("Upload file error, try again")
    }
  }, [])

  const Store = useContext(StoreContext)
  const Editor = useContext(EditorContext)

  const onEditClick = useCallback(
    (e) => {
      if (!e.currentTarget.value || !outputJson) return

      if (editor) {
        Editor.citations.push(outputJson[e.currentTarget.value])
        Editor.setCitations([...Editor.citations])
      } else {
        clearCitationFields(documentType)
        fillCitationFields(documentType, outputJson[e.currentTarget.value])

        Store.dispatch({
          type: "fill",
          documentType,
          value: outputJson[e.currentTarget.value],
        })
      }

      setOpen(false)
      if (uploadRef.current) uploadRef.current.value = ""
    },
    [setOpen, outputJson, documentType],
  )

  const { format, dispatch } = useContext(DBContext)

  const onSaveAllClick = useCallback(() => {
    if (editor && outputJson) {
      Editor.setCitations([...Editor.citations, ...outputJson])
    } else {
      outputJson?.map((citation) =>
        dispatch({
          type: "save",
          citationDocument: documentType,
          // @ts-ignore
          citation,
        }),
      )
    }
    setOpen(false)
    if (uploadRef.current) uploadRef.current.value = ""
  }, [outputJson, documentType])

  const onBibliographyListClick = useCallback(() => {
    if (!outputJson) return

    return navigate("/citationsList", {
      state: {
        citations: outputJson,
        style: format,
        citationDocument: documentType,
      },
    })
  }, [outputJson, format])

  return (
    <div>
      <label htmlFor="contained-button-file">
        <Input
          // @ts-ignore
          ref={uploadRef}
          onChange={onFileUpload}
          accept="*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <IconButton
          color="secondary"
          sx={{ p: "10px", ":hover": { borderRadius: "8px" } }}
          aria-label="upload"
          component="span"
        >
          <UploadFileIcon />
          <Typography color="secondary.main">Import form .bib/.tex</Typography>
        </IconButton>
      </label>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: "50%", height: "50%" }}>
          {uploadProgress > 0 && uploadProgress > 100 && <Spinner />}
          {uploadError && <Alert severity="error">{uploadError}</Alert>}
          {outputJson && outputJson.length > 0 && (
            <Box sx={{ width: "100%", height: "90%" }}>
              <Box display="flex" justifyContent="end">
                <Button startIcon={<SaveIcon />} onClick={onSaveAllClick}>
                  {(editor && "Import") || "Save"} All
                </Button>
                {!editor && (
                  <Button
                    startIcon={<FormatQuoteIcon />}
                    onClick={onBibliographyListClick}
                  >
                    Bibliography List
                  </Button>
                )}
              </Box>
              <List sx={{ margin: "8px", height: "100%", overflowY: "scroll" }}>
                {outputJson.map((citation, index) => (
                  <CitationListItem
                    citation={citation}
                    documentType={documentType}
                    onEditClick={onEditClick}
                    index={index}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  />
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  )
}

const CitationListItem: React.FC<{
  citation: ImportCitation
  documentType: CitationDocumentType
  index: number
  onEditClick: (e: React.MouseEvent) => void
}> = ({ citation, documentType, index, onEditClick }) => {
  const { format } = useContext(DBContext)
  const { convertedCitation, inText } = generateCitation(
    citation,
    documentType,
    "html",
    format,
  )

  return (
    <ListItem
      secondaryAction={
        <IconButton
          value={index}
          edge="end"
          aria-label="edit-citation"
          onClick={onEditClick}
        >
          <EditIcon />
        </IconButton>
      }
    >
      {citation && <ListItemIcon>{DocumentIcon[citation.type]}</ListItemIcon>}
      <ListItemText>
        <div dangerouslySetInnerHTML={{ __html: convertedCitation }} />
        <Typography variant="caption" display="block" gutterBottom margin={0}>
          In-text Citation:
          <div dangerouslySetInnerHTML={{ __html: inText }} />
        </Typography>
      </ListItemText>
    </ListItem>
  )
}

const Input = MUIStyled("input")({
  display: "none",
})

export const FeedbackModel: React.FC = () => {
  const [open, setOpen] = useState(false)

  const toggleModel = useCallback(() => setOpen(!open), [open])

  const [feedback, setFeedback] = useState("")
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackApiError, setFeedbackApiError] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const onFeedbackChange = useCallback((e) => setFeedback(e.target.value), [])

  const onPublishPost = useCallback(async () => {
    if (validateFeedback(feedback)) {
      const response = await sendFeedback(feedback)
      if (response) {
        toggleModel()
        setFeedbackSent(true)
      } else {
        setFeedbackApiError(true)
      }
    } else {
      setErrorMessage("Your input should be less than 200 character")
    }
  }, [feedback])

  return (
    <>
      <Feedback
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        style={{ font: "10" }}
        onClick={toggleModel}
      >
        <FeedbackIcon />
        <Typography variant="overline" display="block" marginLeft="2px">
          Feedback
        </Typography>
      </Feedback>
      <Modal open={open} onClose={toggleModel}>
        <Box sx={{ ...style, width: "50%", height: "50%" }}>
          <Typography padding={2} fontWeight="fontWeightMedium">
            Any feedback will be valuable to improve the website:
          </Typography>
          <Stack>
            <TextField
              id="standard-multiline-static"
              label="Add your Feedback about any issue you face"
              variant="standard"
              multiline
              rows={4}
              onChange={onFeedbackChange}
            />
            <Fab
              size="medium"
              color="primary"
              aria-label="post"
              onClick={onPublishPost}
              sx={{ m: 2, padding: 2 }}
            >
              Send
            </Fab>
          </Stack>
          {feedbackApiError && (
            <Alert severity="error">
              Please try again, there is an issue with the network
            </Alert>
          )}
          {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
        </Box>
      </Modal>
      <Snackbar
        open={feedbackSent}
        autoHideDuration={2000}
        onClose={() => setFeedbackSent(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Thanks for your Feedback 👍
        </Alert>
      </Snackbar>
    </>
  )
}
