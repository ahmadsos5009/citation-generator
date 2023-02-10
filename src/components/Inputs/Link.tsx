import React, { useContext } from "react"
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
import { Controller } from "react-hook-form"

const LinkInput: React.FC = () => {
  const { control } = useContext(GeneratorContext)

  return (
    <Stack margin="8px">
      <FormLabel>Link</FormLabel>
      <Controller
        name="link-type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ToggleButtonGroup
            exclusive
            color="primary"
            value={value || ""}
            onChange={onChange}
          >
            <ToggleButton value="DOI">DOI</ToggleButton>
            <ToggleButton value="URL">URL</ToggleButton>
          </ToggleButtonGroup>
        )}
      />
      <FormControl variant="standard" sx={{ margin: "0 12px" }}>
        <InputLabel focused={false} shrink>
          DOI / URL
        </InputLabel>
        <Controller
          name="link"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input id="link" onChange={onChange} value={value || ""} />
          )}
        />
      </FormControl>
    </Stack>
  )
}

export default LinkInput
