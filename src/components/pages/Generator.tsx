import * as React from "react"
import { useCallback, useMemo, useState } from "react"

import Layout from "./Layout"
import Seo from "../Seo"

import { CitationDocumentType, CitationStyle } from "../../types"
import { DBProvider } from "../../provider/DBProvider"
import { Box, Container, Grid, Stack, Tab, Tabs } from "@mui/material"
import { Primary, PrimaryText } from "../Typography"
import { StoreProvider } from "../../provider/Store"
import TabPanel from "../TabPanel"
import CitationForm from "../CitationForm"

interface PageProps {
  pageContext: { id: string; title: string; style: CitationStyle }
}

const Generator: React.FC<PageProps> = ({ pageContext }) => {
  const [documentType, setDocumentType] = useState<CitationDocumentType>(
    CitationDocumentType.JOURNAL,
  )
  const onDocumentTypeClick = useCallback((event, type) => setDocumentType(type), [])

  const pageTitle = useMemo(() => {
    const style = pageContext.style
    if (style.includes("_")) {
      const [_style, edition] = style.split("_")
      return `${_style.toUpperCase()} (${edition} ed.)`
    } else return style.toUpperCase()
  }, [pageContext.style])

  return (
    <DBProvider format={pageContext.style} citationDocument={documentType}>
      <Layout>
        <Seo
          title={`${pageTitle} Citation Generator`}
          description={`${pageTitle} citation & in text citation generator, and bibliography/reference list generator.`}
        />
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
              <Primary align="center" gutterBottom>
                {`${pageTitle} Citation Generator`}
              </Primary>
              <PrimaryText textAlign="center" gutterBottom>
                {pageContext.title}
              </PrimaryText>
            </Stack>
          </Grid>

          <Grid p={{ xs: 1 }} container justifyContent="center" direction="column">
            <Container
              sx={{
                bgcolor: "white",
                py: 2,
                borderRadius: "50px 50px 0 0",
                boxShadow: `0 0 0 0.5px #878da2, 0 0 2px 0.5px rgb(135 141 162 / 50%),
                            0 1px 8px 0.5px rgb(135 141 162 / 10%),
                            0 2px 12px 0.5px rgb(135 141 162 / 10%),
                            0 4px 20px 0.5px rgb(135 141 162 / 25%)`,
              }}
              disableGutters
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  textColor="secondary"
                  indicatorColor="secondary"
                  value={documentType}
                  onChange={onDocumentTypeClick}
                  centered
                >
                  <Tab value={CitationDocumentType.JOURNAL} label="Journal" />
                  <Tab value={CitationDocumentType.BOOK} label="Book" />
                  <Tab value={CitationDocumentType.REPORT} label="Report" />
                  <Tab value={CitationDocumentType.WEBSITE} label="Website" />
                </Tabs>
              </Box>
            </Container>

            <StoreProvider>
              {(
                Object.keys(CitationDocumentType) as Array<
                  keyof typeof CitationDocumentType
                >
              ).map((document) => (
                <TabPanel
                  key={document}
                  value={CitationDocumentType[document]}
                  index={documentType}
                >
                  <CitationForm type={CitationDocumentType[document]} />
                </TabPanel>
              ))}
            </StoreProvider>
          </Grid>
        </Grid>
      </Layout>
    </DBProvider>
  )
}

export default Generator
