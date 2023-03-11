import * as React from "react"
import { Container, Grid, Paper, Stack, Typography } from "@mui/material"
import Loadable from "@loadable/component"

import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"
import { EditorProvider } from "../provider/EditorProvider"
import { PrimaryStart } from "../components/Typography"
import QuickActionsSection from "../components/editor/QuickActionsSection"

const CitationEditor = Loadable(() => import("../components/editor/CitationEditor"))

const CitationsListPage: React.FC = () => {
  return (
    <Layout>
      <Seo title="Reference List and Bibliography Generator" />
      <EditorProvider>
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
                    <PrimaryStart>Reference List Generator</PrimaryStart>
                    <Typography align="left" variant="caption">
                      Create your Reference or Bibliography with the ability to edit
                      the list before exporting it to (PDF, Word, BibTex, or LaTex)
                    </Typography>
                  </Stack>
                </Stack>

                <CitationEditor />
              </Grid>

              <Grid
                display={{ xs: "none", md: "flex" }}
                md={2}
                item
                p={2}
                container
                direction="column"
              >
                <QuickActionsSection />
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </EditorProvider>
    </Layout>
  )
}

export default CitationsListPage
