import * as React from "react"
import { useMemo } from "react"

import Layout from "./Layout"
import Seo from "../Seo"

import { CitationStyle } from "../../types"

import { Grid, Stack } from "@mui/material"
import { Primary, PrimaryText } from "../Typography"

import TabPanel, { DocumentTabs } from "../TabPanel"

import { GeneratorProvider } from "../../provider/GeneratorProvider"

interface PageProps {
  pageContext: { id: string; title: string; style: CitationStyle; xml: string }
}

const Generator: React.FC<PageProps> = ({ pageContext }) => {
  const { title, style, xml } = pageContext

  const pageTitle = useMemo(() => {
    if (style.includes("_")) {
      const [_style, edition] = style.split("_")
      return `${_style.toUpperCase()} (${edition} ed.)`
    } else return style.toUpperCase()
  }, [style])

  return (
    <Layout>
      <Seo
        title={`${pageTitle} Citation Generator | ${pageTitle} Citation Generator Free`}
        description={`${pageTitle} citation & in text citation generator, and bibliography/reference list generator.`}
      />
      <GeneratorProvider xml={xml} style={style}>
        <Grid
          container
          height="100%"
          direction="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="primary.main"
          flexWrap="nowrap"
        >
          <Grid xs={2} md={4} item>
            <Stack p={2}>
              <Primary>{`${pageTitle} Citation Generator`}</Primary>
              <PrimaryText>{title}</PrimaryText>
            </Stack>
          </Grid>

          <Grid p={{ xs: 1 }} container justifyContent="center" direction="column">
            <DocumentTabs />

            <TabPanel />
          </Grid>
        </Grid>
      </GeneratorProvider>
    </Layout>
  )
}

export default Generator
