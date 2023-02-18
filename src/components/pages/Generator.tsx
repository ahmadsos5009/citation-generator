import * as React from "react"
import { useMemo } from "react"

import Layout from "./Layout"
import Seo from "../Seo"

import { CitationStyle } from "../../types"

import { Container, Grid, Paper, Stack } from "@mui/material"
import { PrimaryStart, PrimaryTextStart } from "../Typography"

import { GeneratorProvider } from "../../provider/GeneratorProvider"
import CitationForm from "../CitationForm"

interface PageProps {
  pageContext: {
    id: string
    title: string
    metaTitle: string
    style: CitationStyle
    xml: string
  }
}

const Generator: React.FC<PageProps> = ({ pageContext }) => {
  const { title, metaTitle, style, xml } = pageContext

  const pageTitle = useMemo(() => {
    if (style.includes("_")) {
      const [_style, edition] = style.split("_")
      return `${_style.toUpperCase()} (${edition} ed.)`
    } else return style.toUpperCase()
  }, [style])

  return (
    <Layout>
      <Seo
        title={metaTitle}
        description={`${pageTitle} citation & in text citation generator, and bibliography/reference list generator.`}
      />
      <GeneratorProvider xml={xml} style={style}>
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: "primary.main",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            py={2}
            item
            xs={10}
          >
            <Paper
              elevation={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: { xs: "98%", md: "100%" },
              }}
            >
              <Grid item xs={12} md={8}>
                <Stack
                  px={{ xs: 1, md: 0 }}
                  rowGap={2}
                  textAlign={{ xs: "center", md: "start" }}
                >
                  <Stack py={2}>
                    <PrimaryStart>{`${pageTitle} Citation Generator`}</PrimaryStart>
                    <PrimaryTextStart>{`${title} Citation and Footnote/Endnote generator`}</PrimaryTextStart>
                  </Stack>
                </Stack>

                <CitationForm />
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </GeneratorProvider>
    </Layout>
  )
}

export default Generator
