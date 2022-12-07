import * as React from "react"
import styled from "styled-components"
import Header from "../Header"
import Footer from "../Footer"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "../../styles/global.css"
import { Helmet } from "react-helmet"

import "typeface-catamaran"

import { FeedbackModel } from "../Model"

const theme = createTheme({
  typography: {
    fontFamily: ["catamaran"].join(","),
  },
})

const Layout: React.FC = ({ children }) => (
  <Wrapper className="site">
    <Helmet>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8835129466793937"
        crossOrigin="anonymous"
      />
    </Helmet>
    <ThemeProvider theme={theme}>
      <Header />
      <main style={{ background: "#f7f7f7" }} className="site-content">
        {children}
      </main>
      <Footer />
      <FeedbackModel />
    </ThemeProvider>
  </Wrapper>
)

const Wrapper = styled.div`
  height: 100%;
`

export default Layout
