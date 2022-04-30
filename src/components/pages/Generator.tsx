import * as React from "react"
import { useCallback, useMemo, useState } from "react"
import {
  Box,
  CardContent,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"

import Layout from "./Layout"
import Seo from "../Seo"
import TabPanel from "../TabPanel"
import CitationForm from "../CitationForm"
import { StoreProvider } from "../../provider/Store"
import { CitationDocumentType, CitationStyle } from "../../types"
import { DBProvider } from "../../provider/DBProvider"
import { ToggleCitationsListButton } from "../Buttons"
import { ReferencesList } from "../ReferencesList"
import { ReferencesListProvider } from "../../provider/ReferencesListProvider"

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            p: 1,
            m: 1,
          }}
        >
          <Container
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.12);",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              p: 4,
              m: 0,
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack>
                <Typography
                  component="h1"
                  variant="h5"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  sx={{ p: 1 }}
                >
                  {`${pageTitle} Citation Generator`}
                </Typography>
                <Typography component="caption" color="text.secondary" gutterBottom>
                  {pageContext.title}
                </Typography>
              </Stack>

              <ToggleCitationsListButton />

              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={documentType} onChange={onDocumentTypeClick} centered>
                  <Tab value={CitationDocumentType.JOURNAL} label="Journal" />
                  <Tab value={CitationDocumentType.BOOK} label="Book" />
                  <Tab value={CitationDocumentType.REPORT} label="Report" />
                  <Tab value={CitationDocumentType.WEBSITE} label="Website" />
                </Tabs>
              </Box>
            </CardContent>

            <StoreProvider>
              <Container className="Test" sx={{ flexGrow: 1 }}>
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
              </Container>
            </StoreProvider>
          </Container>

          <ReferencesListProvider>
            <ReferencesList setDocumentType={setDocumentType} />
          </ReferencesListProvider>
        </Box>
      </Layout>
    </DBProvider>
  )
}

export default Generator
