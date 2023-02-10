import * as React from "react"

import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"
import { useEffect, useState } from "react"

import { ReferencesList } from "../components/ReferencesList"
import { CitationDocumentType, CitationStyle } from "../types"

import { Grid } from "@mui/material"

const ReferencesManagerPage: React.FC = () => {
  const [format, setFormat] = useState<CitationStyle>("apa")
  const [documentType, setDocumentType] = useState<CitationDocumentType>(
    CitationDocumentType.JOURNAL,
  )

  useEffect(() => {
    const format = window.history.state?.format
    if (format) {
      setFormat(format)
    }
  }, [setFormat])

  return (
    <Layout>
      <Seo
        title="Reference manager"
        // TODO:: add more about expected features
        description="Store and organize your citations with collections/papers and labels, for free"
      />
      <Grid container bgcolor="primary.main" justifyContent="center" height="100%">
        <ReferencesList setDocumentType={setDocumentType} />
      </Grid>
    </Layout>
  )
}

export default ReferencesManagerPage
