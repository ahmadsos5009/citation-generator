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

import { GeneratorContext } from "../../provider/GeneratorProvider"
import { DocumentLabel } from "../../types"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

const DocumentSource: React.FC = () => {
  const { documentType, setDocumentType, reset, setCitation, citation } =
    useContext(GeneratorContext)

  const onDocumentChange = useCallback(
    (event) => {
      const type = event.target.value
      const newCitation = setCitation(citation, type)
      reset({})
      setDocumentType(type)
      reset({ ...newCitation })
    },
    [citation],
  )

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
        <ToggleButton value="article-journal">Journal</ToggleButton>
        <ToggleButton value="book">Book</ToggleButton>
        <ToggleButton value="webpage">Webpage</ToggleButton>
      </ToggleButtonGroup>
      <FormControl color="secondary" sx={{ ml: 0, minWidth: 200 }} size="small">
        <InputLabel sx={{ fontSize: "small" }}>more source type</InputLabel>
        <Select
          MenuProps={MenuProps}
          value={documentType}
          label="more source type"
          onChange={onDocumentChange}
        >
          {Object.entries(DocumentLabel).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default DocumentSource
