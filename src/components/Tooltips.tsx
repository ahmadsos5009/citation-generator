import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material"
import React from "react"
import styled from "@emotion/styled"

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tooltip {...props} classes={{ popper: className }}>
    {props.children}
  </Tooltip>
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: 12,
    border: "1px solid #dadde9",
  },
}))
