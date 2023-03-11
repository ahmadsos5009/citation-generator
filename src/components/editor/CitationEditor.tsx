import "./style.css"
import React, { useCallback, useContext, useEffect } from "react"

import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from "ckeditor5-custom-build/build/ckeditor"

import { EditorContext } from "../../provider/EditorProvider"
import { Box, Grid, Stack } from "@mui/material"
import { ImportCitation, ImportCitationBox } from "../Citation"

import { Citation } from "../../types"

import Toolbar from "./Toolbar"
import BibliographyGuide from "./BibliographyGuide"
import { AdsInContent } from "../Ads"
import { DBContext } from "../../provider/DBProvider"

export const defaultEditorMessage = `<html lang='en'><body>
<h2 id="references_header" style="text-align:center;">References</h2>
<p style="text-align:center;" id="default_message">
<span style="color:hsl(0, 0%, 60%);">Add your citations from .bib/.tex or search from external source by Article Title or DOI or URL</span>
</p>
<div class="csl-bib-body"></div>
</body></html>
`

const CitationEditor: React.FC = () => {
  const { cslDao } = useContext(DBContext)
  const {
    setCitations,
    style,
    setStyle,
    xml,
    citations,
    html,
    setHtml,
    setXml,
    documentType,
    setDocumentType,
  } = useContext(EditorContext)

  // TODO:: move this to the Editor Provider
  const updateCitation = useCallback(
    (citation: Citation) => {
      setCitations([...citations, citation as ImportCitation])
    },
    [citations],
  )

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
    setDocumentType(citationDocument)
    ;(async () => {
      const { xml } = await cslDao.get(style)
      setXml(xml)
      setStyle(style)
    })()

    window.history.pushState(null, "")
  }, [setHtml])

  return (
    <Box>
      <Toolbar />

      <ImportCitationBox
        documentType={documentType}
        style={style}
        xml={xml}
        updateCitation={updateCitation}
      />

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

      <Stack spacing={2} py={4}>
        <Grid>
          <AdsInContent dataAdSlot="4238879281" />
        </Grid>
        <BibliographyGuide />
      </Stack>
    </Box>
  )
}

export default CitationEditor
