import * as React from "react"
import { Container, Grid, Stack, Typography } from "@mui/material"
import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"
import Loadable from "@loadable/component"
import { EditorProvider } from "../provider/EditorProvider"
import { ReferencesListProvider } from "../provider/ReferencesListProvider"

const CitationEditor = Loadable(() => import("../components/editor/CitationEditor"))

const CitationsListPage: React.FC = () => {
  return (
    <Layout>
      <Seo title="Reference List and Bibliography Generator" />
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
          <Stack marginBottom={2}>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ p: 1 }}
            >
              Reference List / Bibliography Generator
            </Typography>
            <Typography textAlign="center" color="text.secondary" gutterBottom>
              Create your Reference or Bibliography with the ability to edit the list
              before exporting it to (PDF, Word, or BibTex)
            </Typography>
          </Stack>
        </Grid>

        <Container>
          <ReferencesListProvider>
            <EditorProvider>
              <CitationEditor />
            </EditorProvider>
          </ReferencesListProvider>
        </Container>
      </Grid>
    </Layout>
  )
}

export default CitationsListPage
