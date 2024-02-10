import * as React from "react"
import { useMemo } from "react"
import { ErrorBoundary } from "react-error-boundary"

import Layout from "./Layout"
import Seo from "../Seo"

import { CitationStyle } from "../../types"

import { Container, Grid, Paper, Stack, Typography } from "@mui/material"
import { PrimaryStart } from "../Typography"

import { GeneratorProvider } from "../../provider/GeneratorProvider"
import CitationForm from "../CitationForm"
import QuickActionsSection from "../form/QuickActionsSection"

interface PageProps {
  pageContext: {
    id: string
    title: string
    metaTitle: string
    style: CitationStyle
    xml: string
    note?: boolean
  }
}

const Generator: React.FC<PageProps> = ({ pageContext }) => {
  const { title, metaTitle, style, xml, note } = pageContext

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
      <GeneratorProvider xml={xml} style={style} note={note}>
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
              <Grid display={{ xs: "none", md: "unset" }} item md={2}>
                {/* TODO:: Add External and Internal links */}
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack
                  px={{ xs: 1, md: 0 }}
                  rowGap={2}
                  textAlign={{ xs: "center", md: "start" }}
                >
                  <Stack py={2}>
                    <PrimaryStart>{`${pageTitle} Citation Generator ${
                      note ? "+ Annotated Bibliography" : ""
                    }`}</PrimaryStart>
                    <Typography
                      align="left"
                      variant="caption"
                    >{`${title} Citation generator`}</Typography>
                  </Stack>
                </Stack>

                <ErrorBoundary
                  FallbackComponent={({ error }) => <strong>{error}</strong>}
                  onReset={() => {
                    // reset the state of your app here
                  }}
                  resetKeys={["someKey"]}
                >
                  <CitationForm />
                </ErrorBoundary>
              </Grid>

              <Grid
                display={{ xs: "none", md: "flex" }}
                md={2}
                item
                p={2}
                container
                direction="column"
              >
                <QuickActionsSection pageTitle={pageTitle} />
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </GeneratorProvider>
    </Layout>
  )
}

export default Generator
