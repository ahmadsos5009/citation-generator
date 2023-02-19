import React, { useCallback, useContext, useState } from "react"
import {
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"

import { GeneratorContext } from "../../provider/GeneratorProvider"

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
    <Stack margin="8px">
      <FormLabel>Link</FormLabel>
      <ToggleButtonGroup exclusive value={link} onChange={handleLinkChange}>
        <ToggleButton value="DOI">DOI</ToggleButton>
        <ToggleButton value="URL">URL</ToggleButton>
      </ToggleButtonGroup>
      <FormControl variant="standard" sx={{ margin: "0 12px" }}>
        <InputLabel focused={false} shrink>
          DOI / URL
        </InputLabel>
        <Input id="link" onChange={handleChange} value={value} />
      </FormControl>
    </Stack>
  )
}

export default LinkInput
