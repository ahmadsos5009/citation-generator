import React, { useCallback, useState } from "react"
import {
  Alert,
  Box,
  Button,
  Fab,
  FilledInput,
  MenuItem,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import {
  export_bibTex,
  export_pdf,
  export_word,
} from "./utilities/citation_exporter"

import { Citation, DocumentType } from "../types"

import sendFeedback from "./utilities/feedback-api"

import { validateFeedback } from "./utilities/text-validation"

const importStyle = {
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
        <Box sx={importStyle}>
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

import { Feedback } from "./Buttons"

import FeedbackIcon from "@mui/icons-material/Feedback"

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
        <Box sx={{ ...importStyle, width: "50%", height: "50%" }}>
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
