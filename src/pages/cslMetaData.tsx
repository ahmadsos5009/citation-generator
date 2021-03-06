import * as React from "react"
import { Box, Container, Typography } from "@mui/material"
import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"
import { useEffect, useState } from "react"
import { CSL_METADATA } from "../csl_metadata"
import { generateCitations } from "../components/utilities/citation_generator"

const examples = [
  {
    "container-title": "J. Geophys. Res.",
    author: [
      {
        given: "J. G.",
        family: "Smith",
      },
      {
        given: "H. K.",
        family: "Weston",
      },
    ],
    type: "article-journal",
    id: "Citation:83465785-93c0-422d-aaf6-7c87307f946b",
    "citation-label": "smit54",
    issued: {
      "date-parts": [[1954]],
    },
    page: "14-15",
    title: "Nothing Particular in this Year's History",
    volume: "2",
    _graph: [
      {
        type: "@biblatex/text",
        data: "@ARTICLE{smit54,\n\tAUTHOR = {J. G. Smith and H. K. Weston},\n\tTITLE = {Nothing Particular in this Year's History},\n\tYEAR = {1954},\n\tJOURNAL = {J. Geophys. Res.},\n\tVOLUME = {2},\n\tPAGES = {14-15}\n}\n@BOOK{colu92,\n\tAUTHOR = {Christopher Columbus},\n\tTITLE = {How {I} Discovered {America}},\n\tYEAR = {1492},\n\tPUBLISHER = {Hispanic Press},\n\tADDRESS = {Barcelona}\n}\n@ARTICLE{gree00,\n\tAUTHOR = {R. J. Green and U. P. Fred and W. P. Norbert},\n\tTITLE = {Things that Go Bump in the Night},\n\tYEAR = {1900},\n\tJOURNAL = {Psych. Today},\n\tVOLUME = {46},\n\tPAGES = {345-678}\n}\n@ARTICLE{phil99,\n\tAUTHOR = {T. P. Phillips},\n\tTITLE = {Possible Influence of the Magnetosphere on {American} History},\n\tYEAR = {1999},\n\tJOURNAL = {J. Oddball Res.},\n\tVOLUME = {98},\n\tPAGES = {1000-1003}\n}\n@ARTICLE{jame76,\n\tAUTHOR = {Kelly James and Harris, Jr., George and Wilby Wollops},\n\tTITLE = {{American} Independence and Magnetism},\n\tYEAR = {1776},\n\tJOURNAL = {Revol. Tracts},\n\tVOLUME = {32},\n\tPAGES = {34-55}\n}\n\n",
      },
      {
        type: "@biblatex/entries+list",
      },
      {
        type: "@csl/list+object",
      },
    ],
  },
  {
    "publisher-place": "Barcelona",
    author: [
      {
        given: "Christopher",
        family: "Columbus",
      },
    ],
    type: "book",
    id: "Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc",
    "citation-label": "colu92",
    issued: {
      "date-parts": [[1492]],
    },
    publisher: "Hispanic Press",
    title: "How I Discovered America",
    _graph: [
      {
        type: "@biblatex/text",
        data: "@ARTICLE{smit54,\n\tAUTHOR = {J. G. Smith and H. K. Weston},\n\tTITLE = {Nothing Particular in this Year's History},\n\tYEAR = {1954},\n\tJOURNAL = {J. Geophys. Res.},\n\tVOLUME = {2},\n\tPAGES = {14-15}\n}\n@BOOK{colu92,\n\tAUTHOR = {Christopher Columbus},\n\tTITLE = {How {I} Discovered {America}},\n\tYEAR = {1492},\n\tPUBLISHER = {Hispanic Press},\n\tADDRESS = {Barcelona}\n}\n@ARTICLE{gree00,\n\tAUTHOR = {R. J. Green and U. P. Fred and W. P. Norbert},\n\tTITLE = {Things that Go Bump in the Night},\n\tYEAR = {1900},\n\tJOURNAL = {Psych. Today},\n\tVOLUME = {46},\n\tPAGES = {345-678}\n}\n@ARTICLE{phil99,\n\tAUTHOR = {T. P. Phillips},\n\tTITLE = {Possible Influence of the Magnetosphere on {American} History},\n\tYEAR = {1999},\n\tJOURNAL = {J. Oddball Res.},\n\tVOLUME = {98},\n\tPAGES = {1000-1003}\n}\n@ARTICLE{jame76,\n\tAUTHOR = {Kelly James and Harris, Jr., George and Wilby Wollops},\n\tTITLE = {{American} Independence and Magnetism},\n\tYEAR = {1776},\n\tJOURNAL = {Revol. Tracts},\n\tVOLUME = {32},\n\tPAGES = {34-55}\n}\n\n",
      },
      {
        type: "@biblatex/entries+list",
      },
      {
        type: "@csl/list+object",
      },
    ],
  },
  {
    "container-title": "Psych. Today",
    author: [
      {
        given: "R. J.",
        family: "Green",
      },
      {
        given: "U. P.",
        family: "Fred",
      },
      {
        given: "W. P.",
        family: "Norbert",
      },
    ],
    type: "article-journal",
    id: "Citation:39778dc4-366c-4e93-9e89-87e2e85bea49",
    "citation-label": "gree00",
    issued: {
      "date-parts": [[1900]],
    },
    page: "345-678",
    title: "Things that Go Bump in the Night",
    volume: "46",
    _graph: [
      {
        type: "@biblatex/text",
        data: "@ARTICLE{smit54,\n\tAUTHOR = {J. G. Smith and H. K. Weston},\n\tTITLE = {Nothing Particular in this Year's History},\n\tYEAR = {1954},\n\tJOURNAL = {J. Geophys. Res.},\n\tVOLUME = {2},\n\tPAGES = {14-15}\n}\n@BOOK{colu92,\n\tAUTHOR = {Christopher Columbus},\n\tTITLE = {How {I} Discovered {America}},\n\tYEAR = {1492},\n\tPUBLISHER = {Hispanic Press},\n\tADDRESS = {Barcelona}\n}\n@ARTICLE{gree00,\n\tAUTHOR = {R. J. Green and U. P. Fred and W. P. Norbert},\n\tTITLE = {Things that Go Bump in the Night},\n\tYEAR = {1900},\n\tJOURNAL = {Psych. Today},\n\tVOLUME = {46},\n\tPAGES = {345-678}\n}\n@ARTICLE{phil99,\n\tAUTHOR = {T. P. Phillips},\n\tTITLE = {Possible Influence of the Magnetosphere on {American} History},\n\tYEAR = {1999},\n\tJOURNAL = {J. Oddball Res.},\n\tVOLUME = {98},\n\tPAGES = {1000-1003}\n}\n@ARTICLE{jame76,\n\tAUTHOR = {Kelly James and Harris, Jr., George and Wilby Wollops},\n\tTITLE = {{American} Independence and Magnetism},\n\tYEAR = {1776},\n\tJOURNAL = {Revol. Tracts},\n\tVOLUME = {32},\n\tPAGES = {34-55}\n}\n\n",
      },
      {
        type: "@biblatex/entries+list",
      },
      {
        type: "@csl/list+object",
      },
    ],
  },
  {
    "container-title": "J. Oddball Res.",
    author: [
      {
        given: "T. P.",
        family: "Phillips",
      },
    ],
    type: "article-journal",
    id: "Citation:d76401d7-486c-486f-b4fe-b45dbca95214",
    "citation-label": "phil99",
    issued: {
      "date-parts": [[1999]],
    },
    page: "1000-1003",
    title: "Possible Influence of the Magnetosphere on American History",
    volume: "98",
    _graph: [
      {
        type: "@biblatex/text",
        data: "@ARTICLE{smit54,\n\tAUTHOR = {J. G. Smith and H. K. Weston},\n\tTITLE = {Nothing Particular in this Year's History},\n\tYEAR = {1954},\n\tJOURNAL = {J. Geophys. Res.},\n\tVOLUME = {2},\n\tPAGES = {14-15}\n}\n@BOOK{colu92,\n\tAUTHOR = {Christopher Columbus},\n\tTITLE = {How {I} Discovered {America}},\n\tYEAR = {1492},\n\tPUBLISHER = {Hispanic Press},\n\tADDRESS = {Barcelona}\n}\n@ARTICLE{gree00,\n\tAUTHOR = {R. J. Green and U. P. Fred and W. P. Norbert},\n\tTITLE = {Things that Go Bump in the Night},\n\tYEAR = {1900},\n\tJOURNAL = {Psych. Today},\n\tVOLUME = {46},\n\tPAGES = {345-678}\n}\n@ARTICLE{phil99,\n\tAUTHOR = {T. P. Phillips},\n\tTITLE = {Possible Influence of the Magnetosphere on {American} History},\n\tYEAR = {1999},\n\tJOURNAL = {J. Oddball Res.},\n\tVOLUME = {98},\n\tPAGES = {1000-1003}\n}\n@ARTICLE{jame76,\n\tAUTHOR = {Kelly James and Harris, Jr., George and Wilby Wollops},\n\tTITLE = {{American} Independence and Magnetism},\n\tYEAR = {1776},\n\tJOURNAL = {Revol. Tracts},\n\tVOLUME = {32},\n\tPAGES = {34-55}\n}\n\n",
      },
      {
        type: "@biblatex/entries+list",
      },
      {
        type: "@csl/list+object",
      },
    ],
  },
  {
    "container-title": "Revol. Tracts",
    author: [
      {
        given: "Kelly",
        family: "James",
      },
      {
        given: "George",
        family: "Harris",
        suffix: "Jr.",
      },
      {
        given: "Wilby",
        family: "Wollops",
      },
    ],
    type: "article-journal",
    id: "Citation:26a9a333-21b6-4f0b-b2cc-323711806529",
    "citation-label": "jame76",
    issued: {
      "date-parts": [[1776]],
    },
    page: "34-55",
    title: "American Independence and Magnetism",
    volume: "32",
    _graph: [
      {
        type: "@biblatex/text",
        data: "@ARTICLE{smit54,\n\tAUTHOR = {J. G. Smith and H. K. Weston},\n\tTITLE = {Nothing Particular in this Year's History},\n\tYEAR = {1954},\n\tJOURNAL = {J. Geophys. Res.},\n\tVOLUME = {2},\n\tPAGES = {14-15}\n}\n@BOOK{colu92,\n\tAUTHOR = {Christopher Columbus},\n\tTITLE = {How {I} Discovered {America}},\n\tYEAR = {1492},\n\tPUBLISHER = {Hispanic Press},\n\tADDRESS = {Barcelona}\n}\n@ARTICLE{gree00,\n\tAUTHOR = {R. J. Green and U. P. Fred and W. P. Norbert},\n\tTITLE = {Things that Go Bump in the Night},\n\tYEAR = {1900},\n\tJOURNAL = {Psych. Today},\n\tVOLUME = {46},\n\tPAGES = {345-678}\n}\n@ARTICLE{phil99,\n\tAUTHOR = {T. P. Phillips},\n\tTITLE = {Possible Influence of the Magnetosphere on {American} History},\n\tYEAR = {1999},\n\tJOURNAL = {J. Oddball Res.},\n\tVOLUME = {98},\n\tPAGES = {1000-1003}\n}\n@ARTICLE{jame76,\n\tAUTHOR = {Kelly James and Harris, Jr., George and Wilby Wollops},\n\tTITLE = {{American} Independence and Magnetism},\n\tYEAR = {1776},\n\tJOURNAL = {Revol. Tracts},\n\tVOLUME = {32},\n\tPAGES = {34-55}\n}\n\n",
      },
      {
        type: "@biblatex/entries+list",
      },
      {
        type: "@csl/list+object",
      },
    ],
  },
]

const CSLMetaDataPage: React.FC = () => {
  const [format, setFormat] = useState()

  useEffect(() => {
    const format = window.history.state?.format
    if (format) {
      setFormat(format.toLowerCase())
    }
  }, [setFormat])

  if (!format) {
    return <></>
  }

  const { style_title } = CSL_METADATA[format]

  return (
    <Layout>
      <Seo
        title={`${style_title} with Bibliography and in-text citation examples`}
      />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ p: 1 }}
          >
            {style_title}
          </Typography>
          Example of citations:
          <Box padding={2}>
            <Typography color="text.secondary" padding={0}>
              Bibliography:
            </Typography>
            <div
              className="output-viewer"
              style={{ padding: "4px" }}
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: generateCitations(examples, format),
              }}
            />
          </Box>
          <Box padding={2}>
            <Typography color="text.secondary" padding={0}>
              In text citation:
            </Typography>
            <div
              className="output-viewer"
              style={{ padding: "4px" }}
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: generateCitations(examples, format, true),
              }}
            />
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default CSLMetaDataPage
