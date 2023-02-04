import { Button, Typography } from "@mui/material"
import styled from "@emotion/styled"

export const Logo = styled(Typography)`
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: inherit;
  text-decoration: none;
  margin: 0;
`

export const Primary = styled("h1")`
  font-family: "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 40px;
  color: #241f23;
  margin: 0;
  text-align: center;
`

export const PrimaryStart = styled(Primary)`
  text-align: start;
  padding: 12px 0;
`

export const Secondary = styled("h4")`
  font-family: "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #241f23;
  margin: 0;
`

export const PrimaryText = styled("h6")`
  font-family: "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #3d3939;
  margin: 0;
  text-align: center;
`

export const PrimaryTextStart = styled(PrimaryText)`
  text-align: start;
  padding: 12px 0;
`

export const PrimaryButton = styled(Button)`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #190f1e;
`
