import React, { useContext } from "react"

import { FormControl, FormLabel, InputBase, styled } from "@mui/material"
import { HtmlTooltip } from "../Tooltips"
import { descriptions, labels } from "../../cslTypes/fieldsMapping"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { FieldProps } from "./types"
import { GeneratorContext } from "../../provider/GeneratorProvider"
import { Controller } from "react-hook-form"

const TextField: React.FC<FieldProps> = ({ id, required, multiline }) => {
  const { control } = useContext(GeneratorContext)

  return (
    <FormControl fullWidth variant="outlined">
      <FormLabel
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          color: "#161719",
          fontSize: "1em",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "22px",
        }}
        focused={false}
      >
        {labels[id]}
        <HtmlTooltip title={descriptions[id]}>
          {/* @ts-ignore */}
          <HelpOutlineIcon fontSize="16" sx={{ margin: "-4px 4px" }} />
        </HtmlTooltip>
      </FormLabel>
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            required={required}
            multiline={multiline}
            fullWidth
            id={id}
          />
        )}
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
    padding: "10px 12px",
    transition: "unset",
    "&:focus": {
      border: "2px solid #161719",
    },
  },
}))

export default TextField
