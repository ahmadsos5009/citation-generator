import React, { useCallback, useContext } from "react"
import { Box, Container, Tab, Tabs } from "@mui/material"
import { CitationDocumentType } from "../types"
import { GeneratorContext } from "../provider/GeneratorProvider"
import CitationForm from "./CitationForm"
import config from "../config"

interface TabPanelProps {
  children: React.ReactNode
  index: CitationDocumentType
  value: CitationDocumentType
}

const Panel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  if (value !== index) {
    return <></>
  }

  return (
    <Container
      sx={{
        bgcolor: "white",
        borderRadius: "0 0 50px 50px",
        boxShadow: `0 0 0 0.5px #878da2, 0 0 2px 0.5px rgb(135 141 162 / 50%),
                    0 1px 8px 0.5px rgb(135 141 162 / 10%),
                    0 2px 12px 0.5px rgb(135 141 162 / 10%),
                    0 4px 20px 0.5px rgb(135 141 162 / 25%)`,
      }}
      disableGutters
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Container disableGutters>{children}</Container>}
    </Container>
  )
}

const TabPanel: React.FC = () => {
  const { documentType } = useContext(GeneratorContext)

  return (
    <>
      {config.DOCUMENT_TYPES.map((document) => (
        <Panel key={document} value={document} index={documentType}>
          <CitationForm />
        </Panel>
      ))}
    </>
  )
}

export const DocumentTabs: React.FC = () => {
  const { documentType, setDocumentType, reset, setCitation, citation } =
    useContext(GeneratorContext)

  const onDocumentTypeClick = useCallback(
    (event, type) => {
      const newCitation = setCitation(citation, type)
      reset({})
      setDocumentType(type)
      reset({ ...newCitation })
    },
    [citation],
  )

  return (
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
  )
}

export default TabPanel
