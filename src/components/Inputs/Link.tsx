import React, { useCallback, useContext, useState } from "react"
import {
  FormControl,
  Input,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"

import { GeneratorContext } from "../../provider/GeneratorProvider"
import { Label } from "./Text"

const LinkInput: React.FC = () => {
  const { citation, setValue } = useContext(GeneratorContext)

  //  TODO:: remove this
  const [link, setLink] = useState("DOI")

  const handleLinkChange = useCallback((e, value) => setLink(value), [])

  const handleChange = useCallback(
    (e) => {
      setValue(link, e.target.value)
    },
    [link],
  )

  // @ts-ignore
  const value = citation[link] || ""

  return (
    <Stack py={1}>
      <Label focused={false}>Link</Label>
      <Stack direction={{ xs: "column", md: "row" }}>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={link}
          onChange={handleLinkChange}
        >
          <ToggleButton value="DOI">DOI</ToggleButton>
          <ToggleButton value="URL">URL</ToggleButton>
        </ToggleButtonGroup>
        <FormControl
          size="small"
          variant="standard"
          sx={{ margin: "0 12px", flex: 1 }}
        >
          <InputLabel focused={false} shrink>
            {link}
          </InputLabel>
          <Input id="link" fullWidth onChange={handleChange} value={value} />
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default LinkInput
