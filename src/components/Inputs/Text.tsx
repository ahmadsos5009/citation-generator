import React from "react"
import { callBack } from "../../provider/Store"
import { FormControl, FormLabel, InputBase, styled } from "@mui/material"
import { HtmlTooltip } from "../Tooltips"
import { descriptions } from "../../cslTypes/fieldsMapping"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { FieldProps } from "./types"

const TextField: React.FC<FieldProps> = ({
  label,
  id,
  required,
  multiline,
  documentType,
  error,
}) => {
  const onChange = callBack(id, documentType)

  return (
    <FormControl fullWidth variant="outlined">
      <FormLabel
        sx={{
          color: "#161719",
          fontSize: "18px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "22px",
        }}
        focused={false}
        error={error}
      >
        {label}
        <HtmlTooltip title={descriptions[id]}>
          {/* @ts-ignore */}
          <HelpOutlineIcon fontSize="16" sx={{ margin: "-4px 4px" }} />
        </HtmlTooltip>
      </FormLabel>
      <Input
        required={required}
        multiline={multiline}
        onChange={onChange}
        error={error}
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
    padding: "10px 12px",
    transition: "unset",
    "&:focus": {
      border: "2px solid #161719",
    },
  },
}))

export default TextField
