import "./style.css"
import React, { useCallback, useContext, useEffect } from "react"

import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from "ckeditor5-custom-build/build/ckeditor"

import { Spinner } from "./Spinner"
import { EditorContext } from "../../provider/EditorProvider"

import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import { ImportCitationBox } from "../Citation"
import { CitationDocumentType } from "../../types"
import { ReferenceExportButton } from "../Buttons"
import styled from "styled-components"

const defaultEditorMessage = `<html lang='en'><body>
<h2 id="references_header" style="text-align:center;">References</h2>
<p style="text-align:center;" id="default_message">
<span style="color:hsl(0, 0%, 60%);">Add your citations from .bib/.tex or search from external source by Article Title or DOI or URL</span>
</p>
<div class="csl-bib-body"></div>
</body></html>
`

const CitationEditor: React.FC = () => {
  const { setCitations, setFormat, html, setHtml, documentType } =
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

    if (response === null || !(response["citations"] && response["format"])) {
      setHtml(defaultEditorMessage)
      return
    }
    const { citations, format } = response
    setCitations(citations)
    setFormat(format)
  }, [setHtml])

  if (!html) {
    return <Spinner />
  }

  return (
    <Box>
      <Header document={documentType} />
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

const Header: React.FC<{ document: CitationDocumentType }> = ({ document }) => {
  return (
    <HeaderContainer>
      <ImportCitationBox documentType={document} editor />
      <Box display="flex" alignItems="start" marginTop="4px">
        <ReferenceExportButton view="Editor" />
      </Box>
    </HeaderContainer>
  )
}

const Footer: React.FC = () => (
  <Box margin={4}>
    <Typography textAlign="center" gutterBottom variant="h5" component="div">
      Difference Between Reference and Bibliography
    </Typography>
    <Stack margin={4} flexDirection="row" justifyContent="space-around">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Reference List
          </Typography>
          <Typography variant="body2" color="text.secondary">
            List of sources that have been referred to in your work directly.
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
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

const HeaderContainer = styled(Box)`
  display: flex;
  background: #f4f4f4;
  padding: 8px 0;
  margin-bottom: 8px;
  border: 1px hsl(0, 0%, 82.7%) solid;
  border-radius: var(--ck-border-radius);
`

export default CitationEditor
