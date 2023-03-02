import React, { useCallback, useContext } from "react"

import { FormControl, FormLabel, InputBase, styled } from "@mui/material"
import { HtmlTooltip } from "../Tooltips"
import { descriptions, labels } from "../../cslTypes/fieldsMapping"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { FieldProps } from "./types"
import { GeneratorContext } from "../../provider/GeneratorProvider"

const TextField: React.FC<FieldProps> = ({ id, required, multiline }) => {
  const { setValue, citation } = useContext(GeneratorContext)

  const handleChange = useCallback((e) => {
    const { id, value } = e.target
    setValue(id, value)
  }, [])

  // @ts-ignore
  const value = citation[id] || ""

  return (
    <FormControl fullWidth variant="standard">
      <Label focused={false}>
        {labels[id]}
        <HtmlTooltip title={descriptions[id]}>
          {/* @ts-ignore */}
          <HelpOutlineIcon fontSize="16" sx={{ margin: "-4px 4px" }} />
        </HtmlTooltip>
      </Label>
      <Input
        onChange={handleChange}
        value={value}
        required={required}
        multiline={multiline}
        fullWidth
        id={id}
      />
    </FormControl>
  )
}

const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #646b81",
    fontSize: 16,
    padding: "4px 12px",
    transition: "unset",
    "&:focus": {
      border: "2px solid #161719",
    },
  },
}))

export const Label = styled(FormLabel)(() => ({
  fontFamily: "Noto Sans, sans-serif",
  color: "#161719",
  fontSize: "1em",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "22px",
}))

export default TextField
