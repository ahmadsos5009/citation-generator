import styled from "styled-components"
import { Button, Typography } from "@mui/material"

export const Logo = styled(Typography).attrs(() => ({
  component: "a",
  href: "/",
  noWrap: true,
}))`
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: inherit;
  text-decoration: none;
`

export const Primary = styled(Typography).attrs(() => ({ variant: "h1" }))`
  font-family: "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 40px;
  color: #241f23;
`

export const Secondary = styled(Typography).attrs(() => ({ variant: "h4" }))`
  font-family: "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #241f23;
`

export const PrimaryText = styled(Typography).attrs(() => ({ variant: "h6" }))`
  font-family: "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #3d3939;
`

export const PrimaryButton = styled(Button)`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #190f1e;
`
