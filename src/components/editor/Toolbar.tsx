import React, { useCallback, useContext } from "react"
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material"

import ClearIcon from "@mui/icons-material/Clear"

import config from "../../config"
import { EditorContext } from "../../provider/EditorProvider"
import { CSL_METADATA, CSL_NOTE_METADATA } from "../../csl_metadata"
import { DBContext } from "../../provider/DBProvider"
import { defaultEditorMessage } from "./CitationEditor"
import ImportReferences from "./ImportReferences"
import ReferencesExport from "./ReferencesExport"

const Toolbar: React.FC = () => {
  const {
    documentType,
    setDocumentType,
    style,
    setStyle,
    setXml,
    setCitations,
    setHtml,
  } = useContext(EditorContext)
  const { cslDao } = useContext(DBContext)

  const onDocumentChange = useCallback((e) => {
    setDocumentType(e.target.value)
  }, [])

  const onStyleChange = useCallback(async (e) => {
    const newStyle = e.target.value
    const { xml } = await cslDao.get(newStyle)
    setXml(xml)
    setStyle(newStyle)
  }, [])

  const onClearCitationsClick = useCallback(() => {
    setCitations([])
    setHtml(defaultEditorMessage)
  }, [])

  return (
    <Grid
      item
      xs={11}
      lg={12}
      p={{ xs: 1, md: 2 }}
      container
      flexWrap="wrap"
      justifyContent={{ xs: "center", md: "space-between" }}
      bgcolor="#F4F3F5"
    >
      <Stack>
        <FormControl color="secondary" sx={{ ml: 0, minWidth: 140 }} size="small">
          <InputLabel sx={{ fontSize: "small" }}>--</InputLabel>
          <Select
            value={documentType}
            label="more source type"
            onChange={onDocumentChange}
          >
            {config.DOCUMENT_TYPES.map((doc) => (
              <MenuItem key={doc} value={doc}>
                {doc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="caption" align="center" p={1}>
          Document Type
        </Typography>
      </Stack>

      <Stack>
        <FormControl color="secondary" sx={{ ml: 0, minWidth: 140 }} size="small">
          <InputLabel sx={{ fontSize: "small" }}>-</InputLabel>
          <Select
            MenuProps={{ style: { height: "220px" } }}
            value={style || "apa"}
            label="more source type"
            onChange={onStyleChange}
          >
            {[
              ...Object.values(CSL_METADATA),
              ...Object.values(CSL_NOTE_METADATA),
            ].map(({ id, label }) => (
              <MenuItem key={id.toLowerCase()} value={id.toLowerCase()}>
                {id.replace("annotation/", "").toLowerCase()}{" "}
                {`${(label && "(annotated bibliography)") || ""}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="caption" align="center" p={1}>
          Citation Style
        </Typography>
      </Stack>

      <Stack justifyContent="start" py={{ xs: 1, md: 0 }}>
        <Stack spacing={1}>
          <ImportReferences />
          <Button
            size="small"
            onClick={onClearCitationsClick}
            startIcon={<ClearIcon />}
          >
            Clear Reference List
          </Button>
        </Stack>
      </Stack>

      <Stack alignItems="center">
        <ReferencesExport />
        <Typography variant="caption" align="center" p={1}>
          Export References list
        </Typography>
      </Stack>
    </Grid>
  )
}

export default Toolbar
