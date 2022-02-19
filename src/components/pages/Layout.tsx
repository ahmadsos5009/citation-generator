import * as React from "react"
import styled from "styled-components"
import Header from "../Header"
import Footer from "../Footer"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import "typeface-catamaran"

const theme = createTheme({
  typography: {
    fontFamily: ["catamaran"].join(","),
  },
})

const Layout: React.FC = ({ children }) => (
  <Wrapper>
    <ThemeProvider theme={theme}>
      <Header />
      <main style={{ background: "#f7f7f7" }}>{children}</main>
      <Footer />
    </ThemeProvider>
  </Wrapper>
)

const Wrapper = styled.div`
  height: 100%;
`

export default Layout
