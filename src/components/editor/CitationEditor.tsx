import "./style.css"
import React, { useCallback, useContext, useEffect } from "react"

import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from "ckeditor5-custom-build/build/ckeditor"

import { Spinner } from "./Spinner"
import { EditorContext } from "../../provider/EditorProvider"

import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import { DocumentIcon, ImportCitationBox } from "../Citation"

import { ReferenceExportButton } from "../Buttons"
import { CSL_METADATA } from "../../csl_metadata"
import { CitationJSDocumentType } from "../../types"

const defaultEditorMessage = `<html lang='en'><body>
<h2 id="references_header" style="text-align:center;">References</h2>
<p style="text-align:center;" id="default_message">
<span style="color:hsl(0, 0%, 60%);">Add your citations from .bib/.tex or search from external source by Article Title or DOI or URL</span>
</p>
<div class="csl-bib-body"></div>
</body></html>
`

const CitationEditor: React.FC = () => {
  const { setCitations, setStyle, html, setHtml, setDocumentType } =
    useContext(EditorContext)

  const onTextChange = useCallback(
    (event, editor) => {
      // @ts-ignore
      const data = editor.getData()
      if (data.trim().length > 0) {
        setHtml(data)
      } else {
        setHtml(defaultEditorMessage)
      }
    },
    [setHtml],
  )

  useEffect(() => {
    const response = window.history.state
    if (
      response === null ||
      !(response["citations"] && response["style"] && response["citationDocument"])
    ) {
      setHtml(defaultEditorMessage)
      return
    }
    const { citations, style, citationDocument } = response
    setCitations(citations)
    setStyle(style)
    setDocumentType(citationDocument)
  }, [setHtml])

  if (!html) {
    return <Spinner />
  }

  return (
    <Box>
      <DocumentLabel />
      <Header />
      <div className="document-editor">
        <div className="document-editor__toolbar" />
        <div className="document-editor__editable-container">
          <CKEditor
            onChange={onTextChange}
            editor={Editor}
            data={html}
            config={{
              htmlSupport: {
                allow: [
                  {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                    styles: true,
                  },
                ],
              },
            }}
          />
        </div>
      </div>
      <Footer />
    </Box>
  )
}

const Header: React.FC = () => {
  const { documentType, style, setStyle } = useContext(EditorContext)

  const onChangeStyle = useCallback((e) => setStyle(e.target.value), [])

  return (
    <Box
      sx={{
        flexDirection: { xs: "column", md: "row" },
        display: "flex",
        background: "#f4f4f4",
        padding: "8px 0",
        marginBottom: "8px",
        border: "1px hsl(0, 0%, 82.7%) solid",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="0 8px"
      >
        <Stack direction="row" alignItems="center" width="max-content">
          <FormHelperText>Citation Style:</FormHelperText>
          <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
            <Select
              MenuProps={{ style: { height: "220px" } }}
              value={style}
              onChange={onChangeStyle}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {Object.values(CSL_METADATA).map(({ id }) => (
                <MenuItem key={id.toLowerCase()} value={id.toLowerCase()}>
                  {id.toLowerCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Box display={{ xs: "flex", md: "none" }} alignItems="start" marginTop="4px">
          <ReferenceExportButton view="Editor" />
        </Box>
      </Box>

      <ImportCitationBox documentType={documentType} editor />

      <Box display={{ xs: "none", md: "flex" }} marginTop="4px">
        <ReferenceExportButton view="Editor" />
      </Box>
    </Box>
  )
}

const DocumentLabel: React.FC = () => {
  const { documentType } = useContext(EditorContext)

  return (
    <Grid padding={1} container direction="row" alignItems="center">
      {DocumentIcon[CitationJSDocumentType[documentType]]}
      {documentType.toUpperCase()}
    </Grid>
  )
}

const Footer: React.FC = () => (
  <Box margin={4}>
    <Typography textAlign="center" gutterBottom variant="h5" component="div">
      Difference Between Reference and Bibliography
    </Typography>
    <Stack
      margin={4}
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-around"
    >
      <Card sx={{ my: 2, maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Reference List
          </Typography>
          <Typography variant="body2" color="text.secondary">
            List of sources that have been referred to in your work directly.
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ my: 2, maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bibliography
          </Typography>
          <Typography variant="body2" color="text.secondary">
            List of sources referred to in your work, whether directly cited or not.
            You should include all of the materials you consulted in preparing your
            paper in a bibliography.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  </Box>
)

export default CitationEditor
