import * as React from "react"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material"

import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"
import { StaticImage } from "gatsby-plugin-image"
import { POPULAR_CSL_METADATA } from "../csl_metadata"
import { useCallback } from "react"
import { navigate } from "gatsby"

const IndexPage: React.FC = () => {
  const onCSLMetaDataClick = useCallback((e) => {
    console.log("ON Click...")
    if (e.currentTarget.id) {
      console.log("ON Click...", e.currentTarget)
      return navigate("/cslMetaData", {
        state: { format: e.currentTarget.id },
      })
    }
  }, [])

  return (
    <Layout>
      <Seo
        title="Citation Creator / Generator"
        description="Create citation online rapidly free for a wide range of CSL styles"
      />
      <Container
        sx={{
          py: 8,
          border: "1px solid #d4d7dc",
          borderRadius: 1,
          background: "white",
        }}
        maxWidth="lg"
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
            display: "flex",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Create citation online rapidly free for a wide range of CSL styles
            </Typography>

            <ul>
              <li>Generate citation for journal, book, website, report</li>
              <li>Create your own collections for citations with labels</li>
              <li>Store citation in your browser</li>
              <li>Create Bibliographies list</li>
              <li>Text editor for Bibliographies list</li>
              <li>Read citation from URL, DOI, ISBN</li>
              <li>Import citations from BibTeX</li>
              <li>Export your citations to a PDF, Word, BibTax Document</li>
            </ul>

            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              paragraph
            >
              Check out the list of supported
              <Button
                href="/cslList"
                variant="contained"
                sx={{ maxWidth: "max-content", margin: "0 4px" }}
              >
                Citation Styles
              </Button>
              apa, ieee...
            </Typography>
          </Container>
          <Container maxWidth="sm">
            <StaticImage src="../images/screenshot.png" alt="Citation" />
          </Container>
        </Box>

        <Typography component="div" variant="h5" margin="12px">
          Popular Styles
        </Typography>
        <Grid container spacing={4}>
          {Object.values(POPULAR_CSL_METADATA).map((csl, index) => (
            <Grid item key={index.toString()} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt={csl.style_title} image={csl.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {csl.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {csl.style_title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    field: {csl.field}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={`/${csl.id.toLocaleLowerCase()}`}>
                    Create {csl.id} citation
                  </Button>
                  <Button size="small" id={csl.id} onClick={onCSLMetaDataClick}>
                    Examples
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default IndexPage
