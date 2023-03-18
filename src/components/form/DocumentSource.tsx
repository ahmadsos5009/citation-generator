import React, { useCallback, useContext } from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import config from "../../config"
import { GeneratorContext } from "../../provider/GeneratorProvider"

const DocumentSource: React.FC = () => {
  const { documentType, setDocumentType, reset, setCitation, citation } =
    useContext(GeneratorContext)

  const onDocumentChange = useCallback(
    (event, type) => {
      const newCitation = setCitation(citation, type)
      reset({})
      setDocumentType(type)
      reset({ ...newCitation })
    },
    [citation],
  )

  const onSelectChange = useCallback((e) => {
    setDocumentType(e.target.value)
  }, [])

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent={{ xs: "center", md: "start" }}
      rowGap={{ xs: 2, md: 0 }}
      spacing={{ xs: 1, md: 2 }}
    >
      <ToggleButtonGroup
        size="small"
        exclusive
        value={documentType}
        color="secondary"
        onChange={onDocumentChange}
      >
        <ToggleButton value="journal">Journal</ToggleButton>
        <ToggleButton value="book">Book</ToggleButton>
        <ToggleButton value="website">Website</ToggleButton>
      </ToggleButtonGroup>
      <FormControl color="secondary" sx={{ ml: 0, minWidth: 140 }} size="small">
        <InputLabel sx={{ fontSize: "small" }}>more source type</InputLabel>
        <Select
          value={documentType}
          label="more source type"
          onChange={onSelectChange}
        >
          {config.DOCUMENT_TYPES.map((doc) => (
            <MenuItem key={doc} value={doc}>
              {doc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default DocumentSource
