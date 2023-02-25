import * as React from "react"

import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"

import {
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material"
import styled from "@emotion/styled"
import Collection from "../components/manger/Collection"
import Metadata from "../components/manger/Metadata"
import ReferencesTable from "../components/manger/ReferencesTable"
import { ManagerProvider } from "../provider/ManagerProvider"
import { useCallback } from "react"
import FileImport from "../components/FileImport"

import AddReferenceForm from "../components/manger/AddReferenceForm"

const ReferencesManagerPage: React.FC = () => {
  return (
    <Layout>
      <Seo
        title="Reference manager"
        // TODO:: add more about expected features
        description="Store and organize your citations with collections/papers and labels, for free"
      />
      <ManagerProvider>
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            bgcolor: "secondary.light",
          }}
        >
          <Grid container direction="column">
            <Stack px={4} py={1}>
              <Primary>Reference Manger</Primary>
            </Stack>
            <Stack pl={3} direction="row" bgcolor="#817589">
              <ImportButton />
              <AddReferenceForm />
            </Stack>
          </Grid>
          <Grid
            flex={1}
            container
            justifyContent="space-between"
            p={2}
            bgcolor="primary.main"
          >
            <Grid sx={{ display: { xs: "none", md: "unset" } }} md={2} item>
              <Collection />
            </Grid>
            <Grid xs={12} md={6.8} item>
              <ReferencesTable />
            </Grid>
            <Grid sx={{ display: { xs: "none", md: "unset" } }} md={3} item>
              <Metadata />
            </Grid>
          </Grid>
        </Container>
      </ManagerProvider>
    </Layout>
  )
}

export const Primary = styled("h1")`
  font-family: Noto Sans, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.5em;
  line-height: 40px;
  color: #ffffff;
  margin: 0;
`

const ImportButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = useCallback((event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget)
    }
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <Button color="primary" onClick={handleClick}>
        Import References
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        color="secondary"
      >
        <FileImport
          accept=".bib"
          button={
            <MenuItem>
              <Typography px={1} textAlign="center">
                BibTex *.bib
              </Typography>
            </MenuItem>
          }
        />
      </Menu>
    </>
  )
}

export default ReferencesManagerPage
