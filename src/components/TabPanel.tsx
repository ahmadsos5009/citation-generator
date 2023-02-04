import React from "react"
import { Container } from "@mui/material"
import { CitationDocumentType } from "../types"

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
      {value === index && (
        <Container disableGutters component="form" noValidate autoComplete="off">
          {children}
        </Container>
      )}
    </Container>
  )
}

export default Panel
