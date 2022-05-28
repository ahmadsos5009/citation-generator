import * as React from "react"
import { Box, Container, Stack, Typography } from "@mui/material"
import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"
import Loadable from "@loadable/component"
import { EditorProvider } from "../provider/EditorProvider"
import { ReferencesListProvider } from "../provider/ReferencesListProvider"
const CitationEditor = Loadable(() => import("../components/editor/CitationEditor"))

const CitationsListPage: React.FC = () => {
  return (
    <Layout>
      <Seo title="Citation List(Bibliography) editor" />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container>
          <ReferencesListProvider>
            <EditorProvider>
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
                  Create your Reference or Bibliography with the ability to edit the
                  list before exporting it to (PDF, Word, or BibTex)
                </Typography>
              </Stack>
              <CitationEditor />
            </EditorProvider>
          </ReferencesListProvider>
        </Container>
      </Box>
    </Layout>
  )
}

export default CitationsListPage
