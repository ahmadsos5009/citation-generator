import React, { useCallback, useContext, useState } from "react"
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Modal,
  Snackbar,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material"
import { blue, red } from "@mui/material/colors"
import ArticleIcon from "@mui/icons-material/Article"

import {
  export_bibTex,
  export_latex,
  export_pdf,
  export_word,
} from "../utilities/citation_exporter"
import { EditorContext } from "../../provider/EditorProvider"

const importStyle = {
  position: "absolute" as const,
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const Icons = {
  pdf: <ArticleIcon sx={{ color: red[500] }} />,
  docx: <ArticleIcon sx={{ color: blue[500] }} />,
  tex: <ArticleIcon sx={{ color: "#008080" }} />,
  bib: <ArticleIcon color="secondary" />,
}

const label = {
  pdf: "PDF",
  docx: "Word doc",
  tex: "LaTex",
  bib: "BibTex",
}

const ReferencesExport: React.FC = () => {
  return (
    <ButtonGroup
      sx={{ flexWrap: "wrap", justifyContent: "center" }}
      color="primary"
      size="small"
      variant="contained"
    >
      <ExportFile file="pdf" />
      <ExportFile file="docx" />
      <ExportFile file="tex" />
      <ExportFile file="bib" />
    </ButtonGroup>
  )
}

export const ExportFile: React.FC<{
  file: "pdf" | "docx" | "tex" | "bib"
}> = ({ file }) => {
  const { citations, html } = useContext(EditorContext)

  const [fileName, setFileName] = useState("references")
  const [showAlert, setShowAlert] = useState(false)

  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    if (citations.length > 0) {
      setOpen(true)
    } else {
      setShowAlert(true)
    }
  }, [setOpen, citations])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.currentTarget.value),
    [setFileName],
  )

  const handleDownloadClick = useCallback(async () => {
    switch (file) {
      case "pdf":
        await export_pdf(html || "", fileName)
        break
      case "docx":
        await export_word(html || "", fileName)
        break
      case "bib":
        export_bibTex(citations, fileName)
        break
      case "tex":
        export_latex(citations, fileName)
        break
    }
    handleClose()
  }, [file, citations, html, fileName])

  const closeSnackbar = useCallback(() => setShowAlert(false), [setShowAlert])

  return (
    <>
      <ExportButton endIcon={Icons[file]} onClick={handleOpen}>
        {label[file]}
      </ExportButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={importStyle}>
          <Typography variant="subtitle1">
            Export Reference List To a {label[file]} file
          </Typography>
          <Stack py={1} spacing={2}>
            <Stack spacing={1}>
              <Typography variant="caption">
                Edit file name if you prefer that:
              </Typography>
              <TextField
                label="File Name:"
                onChange={onChange}
                fullWidth
                value={fileName}
              />
            </Stack>
            <Button onClick={handleDownloadClick}>
              Download {fileName}.{file} file
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity="warning" sx={{ width: "100%" }}>
          Add Citation to your Reference List
        </Alert>
      </Snackbar>
    </>
  )
}

const ExportButton = styled(Button)`
  align-items: start;
`

export default ReferencesExport
