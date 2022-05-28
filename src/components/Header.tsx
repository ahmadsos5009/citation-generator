import * as React from "react"
import ListAltIcon from "@mui/icons-material/ListAlt"
import SupportIcon from "@mui/icons-material/Support"

import { AppBar, Link, Stack, styled, Toolbar, Typography } from "@mui/material"
const logoImageData =
  "data:image/png;base64,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"

const Header: React.FC = () => (
  <AppBar position="relative" color="transparent" sx={{ background: "#2f69a3" }}>
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Link href="/" sx={{ margin: "2px" }}>
        <img src={logoImageData} alt="Citation Generator" />
      </Link>
      {/*  TODO:: add other options, eg: search for a style   */}
      <Stack direction="row" spacing={2}>
        <PageLink href="/citationsList" underline="none" color="white">
          <ListAltIcon sx={{ margin: "0 4px" }} />
          References / Bibliography
        </PageLink>
        <PageLink href="/cslList" underline="none" color="white">
          <SupportIcon sx={{ margin: "0 4px" }} />
          Supported Styles
        </PageLink>
      </Stack>
    </Toolbar>
  </AppBar>
)

const PageLink = styled(Link)`
  display: flex;
  flex-direction: row;
  :hover {
    color: #a2acbd;
  }
  cursor: pointer;
`

const ButtonTitle = styled(Typography)`
  margin: 0;
  line-height: 1em;
`

export default Header
