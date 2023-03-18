import React, { useCallback, useContext, useState } from "react"
import { Form } from "../CitationForm"

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material"

import {
  GeneratorContext,
  GeneratorProvider,
} from "../../provider/GeneratorProvider"
import { CitationStyle, DocumentLabel } from "../../types"

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
  overflowY: "scroll",
}

const AddReferenceForm: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleShow = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const userClose = useCallback((e) => {
    const label = e.target.getAttribute("aria-label")
    if (label === "cite") setOpen(false)
  }, [])

  return (
    <>
      <Button color="primary" onClick={handleShow}>
        Create New Reference
      </Button>
      <Modal open={open} onClose={handleClose}>
        <GeneratorProvider xml="" style={"apa" as CitationStyle}>
          <Box
            sx={{ ...importStyle, width: "50%", height: "60%" }}
            onClick={userClose}
          >
            <Typography variant="subtitle1" py={2} pb={4}>
              Add Reference Manually
            </Typography>
            {/* TODO:: add import citation box */}
            <DocumentSelect />
            <Form />
          </Box>
        </GeneratorProvider>
      </Modal>
    </>
  )
}

const DocumentSelect: React.FC = () => {
  const { setDocumentType, documentType } = useContext(GeneratorContext)

  const onSetDocument = useCallback((e) => {
    setDocumentType(e.target.value)
  }, [])

  return (
    <FormControl color="secondary" sx={{ ml: 0, minWidth: 140 }} size="small">
      <InputLabel sx={{ m: -1 }}>Document type</InputLabel>
      <Select value={documentType} onChange={onSetDocument}>
        {Object.entries(DocumentLabel).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AddReferenceForm
