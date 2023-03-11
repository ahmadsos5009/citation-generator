import React, { useCallback, useContext, useState } from "react"
import { Box, Button, ButtonGroup, Modal, Stack } from "@mui/material"
import StorageIcon from "@mui/icons-material/Storage"
import { CitationDataView } from "../FileImport"

import { EditorContext } from "../../provider/EditorProvider"
import { DBContext } from "../../provider/DBProvider"

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

const ImportReferences: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleShow = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const [selectedCitations, setSelectedCitations] = useState<string[]>([])

  const setSelectedCitationsId = useCallback(
    (citations: string[]) => setSelectedCitations(citations),
    [],
  )

  const { citations, setCitations } = useContext(EditorContext)

  const { citationDao } = useContext(DBContext)

  const dbCitations = citationDao.getList()

  const importSelectedCitations = useCallback(async () => {
    setCitations([...citations, ...(await citationDao.bulkGet(selectedCitations))])
    handleClose()
  }, [citations, selectedCitations])

  const onAddCitation = useCallback(
    async (e) => {
      const citation = await citationDao.get(e.currentTarget.value)
      setCitations([...citations, citation])
      handleClose()
    },
    [citations],
  )

  return (
    <>
      <Button size="small" onClick={handleShow} startIcon={<StorageIcon />}>
        Import from Storage
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...importStyle, width: "50%", height: "50%" }}>
          <Toolbar
            importSelectedCitations={importSelectedCitations}
            isThereSelection={!!selectedCitations.length}
          />

          <CitationDataView
            setSelectedCitations={setSelectedCitationsId}
            onAddCitation={onAddCitation}
            citations={dbCitations}
          />
        </Box>
      </Modal>
    </>
  )
}

const Toolbar: React.FC<{
  isThereSelection: boolean
  importSelectedCitations: () => void
}> = ({ isThereSelection, importSelectedCitations }) => {
  return (
    <Stack
      justifyContent="space-between"
      p={1}
      bgcolor="primary.main"
      direction="row"
    >
      <ButtonGroup color="secondary">
        <Button onClick={importSelectedCitations} disabled={!isThereSelection}>
          Import Selected Item
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default ImportReferences
