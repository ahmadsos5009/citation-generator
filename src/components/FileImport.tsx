import React, { useCallback, useContext, useRef, useState } from "react"
import { CitationStyle } from "../types"
import { styled as MUIStyled } from "@mui/material/styles"
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  createTheme,
  Modal,
  Stack,
  Typography,
} from "@mui/material"
import { Spinner } from "./editor/Spinner"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { convertBibTexToCSL } from "./utilities/citation_generator"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { referenceColumns } from "./manger/ReferencesTable"
import themes from "../themes"
import { ThemeProvider } from "@emotion/react"
import { DBContext } from "../provider/DBProvider"
import { TCitation } from "../db/types"

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

const FileImport: React.FC<{
  style?: CitationStyle
  xml?: string
  accept: string
  button: React.ReactChild
}> = ({ style, xml, accept, button }) => {
  const [citations, setCitations] = useState<TCitation[]>([])
  const [selectedCitations, setSelectedCitations] = useState<string[]>([])

  const [open, setOpen] = useState(false)
  const [uploadError, setUploadError] = useState<string | undefined>(undefined)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadRef = useRef<HTMLInputElement>()

  const setSelectedCitationsId = useCallback(
    (citations: string[]) => setSelectedCitations(citations),
    [],
  )

  const updateCitations = useCallback(
    (citations: TCitation[]) => setCitations(citations),
    [],
  )

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
        const citations = convertBibTexToCSL(fileReader.result as string)
        setCitations(citations)
      }

      fileReader.onprogress = (e) =>
        setUploadProgress(Math.round((e.loaded * 100) / e.total))

      fileReader.onerror = () => setUploadError("Upload file error, try again")

      fileReader.readAsText(file)
    } catch (e) {
      setUploadError("Upload file error, try again")
    }
  }, [])

  return (
    <>
      <label htmlFor="contained-button-file">
        <Input
          // @ts-ignore
          ref={uploadRef}
          onChange={onFileUpload}
          accept={accept}
          id="contained-button-file"
          multiple
          type="file"
        />
        {button}
      </label>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...importStyle, width: "50%", height: "50%" }}>
          {uploadProgress > 0 && uploadProgress > 100 && <Spinner />}

          {uploadError && <Alert severity="error">{uploadError}</Alert>}

          <Toolbar
            selectedCitations={selectedCitations}
            citations={citations}
            close={handleClose}
          />

          {(style && <></>) || (
            <CitationDataView
              setSelectedCitations={setSelectedCitationsId}
              updateCitations={updateCitations}
              selectedCitations={selectedCitations}
              citations={citations}
            />
          )}
        </Box>
      </Modal>
    </>
  )
}

const Input = MUIStyled("input")({
  display: "none",
})

const DataGridTheme = createTheme({
  ...themes,
  components: {
    //@ts-ignore
    MuiDataGrid: {
      styleOverrides: {
        "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
        },
      },
    },
  },
})

const CitationDataView: React.FC<{
  setSelectedCitations: (citations: string[]) => void
  updateCitations: (citations: TCitation[]) => void
  selectedCitations: string[]
  citations: TCitation[]
}> = ({ setSelectedCitations, updateCitations, citations, selectedCitations }) => {
  if (!citations.length) {
    return <></>
  }

  const { citationDao } = useContext(DBContext)

  const onAddCitation = useCallback(
    (e) => {
      const citation = citations.find((c) => c.id === e.currentTarget.value)
      if (citation) {
        citationDao.add(citation)
        updateCitations(citations.filter((c) => c.id !== e.currentTarget.value))
        setSelectedCitations(selectedCitations.filter((c) => c !== citation.id))
      }
    },
    [citations, selectedCitations],
  )

  const viewColumns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      width: 80,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => (
        <Stack direction="row">
          <Button
            value={params.id}
            onClick={onAddCitation}
            startIcon={<AddCircleIcon />}
            size="small"
          >
            Add
          </Button>
        </Stack>
      ),
    },
    ...referenceColumns,
  ]

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <ThemeProvider theme={DataGridTheme}>
          <DataGrid
            columns={viewColumns}
            rows={citations}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            // @ts-ignore
            onSelectionModelChange={setSelectedCitations}
          />
        </ThemeProvider>
      </div>
    </>
  )
}

const Toolbar: React.FC<{
  selectedCitations: string[]
  citations: TCitation[]
  close: () => void
}> = ({ selectedCitations, citations, close }) => {
  const { citationDao } = useContext(DBContext)

  const handleImportAll = useCallback(() => {
    citationDao.bulkAdd(citations)
    close()
  }, [citations])

  const importSelectedCitation = useCallback(() => {
    const selectedItems = citations.filter((c) => selectedCitations.includes(c.id))
    citationDao.bulkAdd(selectedItems)
    close()
  }, [citations, selectedCitations])

  if (!citations.length) {
    return <></>
  }

  return (
    <Stack
      justifyContent="space-between"
      p={1}
      bgcolor="primary.main"
      direction="row"
    >
      <Typography alignSelf="center" variant="subtitle1" textAlign="center">
        {`${citations.length} Item Uploaded`}
      </Typography>
      <ButtonGroup color="secondary">
        <Button onClick={handleImportAll}>Import All</Button>
        <Button
          onClick={importSelectedCitation}
          disabled={!selectedCitations.length}
        >
          Import Selected Item
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default FileImport
