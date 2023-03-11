import * as React from "react"

import Layout from "../components/pages/Layout"
import Seo from "../components/Seo"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material"
import { PrimaryStart, PrimaryText, Secondary } from "../components/Typography"
import {
  ReferencesList,
  ReferenceManagement,
  AnnotatedBibliography,
} from "../placeholders"
import styled from "@emotion/styled"
import { CSL_NOTE_METADATA } from "../csl_metadata"

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <Seo
        title="Citation Creator / Generator"
        description="Create citation online rapidly free for a wide range of CSL styles"
      />

      <Grid container height="100%">
        <Grid bgcolor="primary.main" container p={2} item>
          <Grid p={6} md={4} xs={12} item>
            <PrimaryStart>
              Create citation online rapidly free for a wide range of CSL styles
            </PrimaryStart>
            {/* TODO:: replace this with a new message  */}
            <PrimaryText>
              <List disablePadding>
                <Item>
                  <ListItemText
                    primary="Create Citation Manually"
                    secondary="Create your citation manually rapidly for journals, books, websites, report"
                  />
                </Item>
                <Item>
                  <ListItemText
                    primary="Import Citations"
                    secondary="Import citations from Title, URL, DOI, PubMed, ISBN, BibTeX"
                  />
                </Item>
                <Item>
                  <ListItemText
                    primary="Export Citations"
                    secondary="Export your citations or references list to a PDF, Word, LaTex, BibTex Document"
                  />
                </Item>
                <Item>
                  <ListItemText
                    primary="Store Citations"
                    secondary="Store citation in your browser to create your own references list"
                  />
                </Item>
              </List>
            </PrimaryText>
          </Grid>

          <Grid
            container
            md={8}
            xs={12}
            item
            justifyContent="center"
            p={4}
            height={{ md: "80%" }}
          >
            <Grid item display={{ md: "flex" }} md={6} p={2}>
              <Card
                sx={{
                  maxWidth: { md: 350, xs: 150 },
                  bgcolor: "primary.50",
                  borderRadius: "50px 50px 0 0",
                }}
              >
                <CardMedia>
                  <ReferencesList />
                </CardMedia>
                <CardContent>
                  <Secondary>Bibliographies / References List</Secondary>
                  <Typography pt={2} pb={8} variant="body2" color="text.secondary">
                    Create Bibliographies list from your citations or imported
                    citations, also there an editor to help with editing list before
                    exporting them
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" size="small" href="/citationsList/">
                    List Generator
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item display={{ md: "flex" }} md={6} p={2}>
              <Card
                sx={{
                  maxWidth: { md: 350, xs: 150 },
                  bgcolor: "primary.50",
                  borderRadius: "50px 50px 0 0",
                }}
              >
                <CardMedia>
                  <ReferenceManagement />
                </CardMedia>
                <CardContent>
                  <Secondary>Reference Management</Secondary>
                  <Typography pt={2} variant="body2" color="text.secondary">
                    Manage your references by organizing them in collections and
                    tags. The goal of reference management is to make it easier for
                    researchers to manage the information they use in their work and
                    to generate accurate and consistent citations and bibliographies.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" size="small" href="/referencesManager/">
                    Manage References
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid bgcolor="primary.light" container xs={12} item>
          <Grid md={7} p={6} item>
            <Stack alignItems="start" py={2}>
              <PrimaryText>Generate Annotated Bibliography for:</PrimaryText>
              <Stack direction="row">
                {Object.values(CSL_NOTE_METADATA).map(({ id, label }) => (
                  <Link key={id} size="small" href={`/${id.toLowerCase()}/`}>
                    {label}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid md={5} item container alignItems="center" justifyContent="center">
            <CardMedia sx={{ maxWidth: { md: 400, xs: 200 } }}>
              <AnnotatedBibliography />
            </CardMedia>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

const Item = styled(ListItem)`
  padding-right: 0;
  padding-left: 0;
`

const Link = styled(Button)`
  display: block;
  font-family: sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: #37293c;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
`

export default IndexPage
