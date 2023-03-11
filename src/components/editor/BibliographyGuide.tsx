import React from "react"
import {
  Alert,
  Grid,
  Link,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material"
import { AdsInContent } from "../Ads"

const BibliographyGuide: React.FC = () => {
  return (
    <>
      <Grid px={{ xs: 2, md: 0 }} py={8} id="annotated_bibliography_guide">
        <Typography variant="h5">Guide to writing annotated bibliography</Typography>
        <Typography variant="body2" p={1}>
          An annotated bibliography is a list of sources (books, articles, websites,
          etc.) that includes a brief summary and evaluation of each source. The
          purpose of an annotated bibliography is to provide an overview of the
          literature on a particular topic and to demonstrate the quality and
          relevance of each source to your research.
        </Typography>

        <Stack p={1} spacing={1}>
          <Typography variant="h6">Step 1: Choose Your Sources</Typography>
          <Typography>
            Begin by selecting sources that are relevant to your research topic. You
            should aim for a mix of primary and secondary sources, and try to include
            a range of perspectives and viewpoints. You can find sources by searching
            databases, browsing library catalogs, or using search engines like Google
            Scholar.
          </Typography>
        </Stack>

        <Stack p={1} spacing={1}>
          <Typography variant="h6">Step 2: Create Your Citation</Typography>
          <Typography>
            For each source, you&apos;ll need to create a citation that follows the
            appropriate citation style (e.g.{" "}
            <Link color="secondary" href="/annotation/apa_7th/">
              APA
            </Link>
            ,{" "}
            <Link color="secondary" href="/annotation/mla_8th/">
              MLA
            </Link>
            ,{" "}
            <Link color="secondary" href="/annotation/chicago/">
              Chicago
            </Link>
            ).
          </Typography>
        </Stack>

        <Stack my={1} p={2} spacing={1} border="2px solid #37293C" bgcolor="#E6DAEA">
          <Typography variant="h6">Step 3: Write Your Annotation</Typography>
          <Typography variant="body1">
            After filling in the fields related to your citation style, you must
            write a brief summary and evaluation of the source in the{" "}
            <b>Annotation</b> field. You&apos;re annotation should include the
            following:
            <List color="secondary">
              <ListItemText>
                <b>A summary of the main points of the source</b>
              </ListItemText>
              <ListItemText>
                <b>An evaluation of the source&apos;s strengths and weaknesses</b>
              </ListItemText>
              <ListItemText>
                <b>A statement of how the source relates to your research topic</b>
              </ListItemText>
            </List>
            {/*  @ts-ignore */}
            <Alert severity="info" color="secondary">
              Your annotation should be concise (usually 150-200 words) and
              well-written.
            </Alert>
          </Typography>
        </Stack>

        <Stack p={1} spacing={1}>
          <Typography variant="h6">
            Step 4: Format Your Annotated Bibliography
          </Typography>
          <Typography>
            Once you&apos;ve created your citations and annotations you could save it
            to your library or click on the top right corner e.g:{" "}
            <i>APA Reference Generator</i> and will show your Annotated Bibliography
            with notes marked with yellow color to recognize them. and will be
            formatted based on the citations style requirements include
            double-spacing, hanging indents, and alphabetical ordering.
          </Typography>
        </Stack>
      </Grid>

      <Grid>
        <AdsInContent dataAdSlot="4238879281" />
      </Grid>

      <Grid px={{ xs: 2, md: 0 }} py={8} id="bibliography_guide">
        <Typography variant="h5">
          Difference between a Reference List and a Bibliography:
        </Typography>

        <Stack py={1} spacing={2}>
          <Typography variant="h6">Reference List</Typography>
          <Typography variant="body1">
            A Reference List is a list of sources that have been cited within a
            document. It includes only the sources that have been cited in the
            document, and is typically located at the end of the document.
          </Typography>
        </Stack>

        <Stack py={1} spacing={2}>
          <Typography variant="h6">Bibliography</Typography>
          <Typography variant="body1">
            A Bibliography is a list of all sources consulted in the creation of a
            document, whether or not they have been cited within the document. It
            includes sources that were used as background reading or for research
            purposes, as well as those that were cited in the document.
          </Typography>
        </Stack>
      </Grid>
    </>
  )
}

export default BibliographyGuide
