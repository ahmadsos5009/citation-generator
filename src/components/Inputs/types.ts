import { InputBaseComponentProps } from "@mui/material"

export interface FieldProps {
  id: string
  required?: boolean | false
  // eslint-disable-next-line react/require-default-props
  multiline?: boolean
  error?: boolean
}

export interface NumberFieldProps {
  width?: number
  inputProps?: InputBaseComponentProps | undefined
}
