import * as React from "react"

import Header from "../Header"

import { createTheme, ThemeProvider } from "@mui/material"
import "../../styles/global.css"

import "typeface-catamaran"
import themes from "../../themes"
import Footer from "../Footer"
import styled from "@emotion/styled"

const theme = createTheme(themes)

const Layout: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </ThemeProvider>
)

const Main = styled.main`
  flex: 1;
`

export default Layout
