import React, { useCallback, useContext, useRef, useState } from "react"

require("@citation-js/plugin-isbn")
require("@citation-js/plugin-doi")
require("@citation-js/plugin-bibjson")
require("@citation-js/plugin-bibtex")

import { Spinner } from "../editor/Spinner"

import { ImportCitation } from "../Citation"

import SaveIcon from "@mui/icons-material/Save"
import EditIcon from "@mui/icons-material/Edit"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"

import { useLocation } from "@reach/router"
import { Cite } from "@citation-js/core"
import { navigate } from "gatsby"
import { EditorContext } from "../../provider/EditorProvider"

import { v4 as uuid } from "uuid"
import { TCitation } from "../../db/types"
import { DBContext } from "../../provider/DBProvider"
import { MicrosoftWordIcon } from "../../icons"

import { exportToWord } from "../../utile/jsonCSL-openXml"
import { Citation, CitationStyle, DocumentLabel, DocumentType } from "../../types"
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  styled as MUIStyled,
  Typography,
} from "@mui/material"
import { generateCitation } from "../utilities/citation_generator"

const importStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const Input = MUIStyled("input")({
  display: "none",
})

export const UploadFileModel: React.FC<{
  documentType: DocumentType
  updateCitation: (citation: Citation) => void
  style: CitationStyle
  xml: string
}> = ({ documentType, updateCitation, style, xml }) => {
  const { pathname } = useLocation()
  const { citations, setCitations } = useContext(EditorContext)
  const { citationDao } = useContext(DBContext)

  const isEditor = pathname === "/citationsList/"

  const [open, setOpen] = useState(false)
  const [uploadError, setUploadError] = useState<string | undefined>(undefined)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [outputJson, setOutputJson] = useState<ImportCitation[]>()

  const uploadRef = useRef<HTMLInputElement>()

  const handleClose = useCallback(async () => {
    setOpen(false)
    if (uploadRef.current) uploadRef.current.value = ""
  }, [setOpen])

  const onFileUpload = useCallback((event) => {
    try {
      setOpen(true)

      const file = event.target.files[0]

      if (file.size > 25431761) {
        setUploadError("File size is more than allowed space")
        return
      }

      const fileReader = new FileReader()

      fileReader.onloadend = async () => {
        const cite = Cite(fileReader.result, { format: "string" })
        const outputJson = cite.get({ format: "real", type: "json" })
        const citations = outputJson.map((citation: { _graph: unknown }) => {
          // eslint-disable-next-line no-underscore-dangle
          delete citation._graph
          return citation
        })

        setOutputJson(citations)
      }

      fileReader.onprogress = (e) =>
        setUploadProgress(Math.round((e.loaded * 100) / e.total))

      fileReader.onerror = () => setUploadError("Upload file error, try again")

      fileReader.readAsText(file)
    } catch (e) {
      setUploadError("Upload file error, try again")
    }
  }, [])

  const onEditClick = useCallback(
    (e) => {
      if (!e.currentTarget.value || !outputJson) return

      updateCitation(outputJson[e.currentTarget.value])
      setOpen(false)
      if (uploadRef.current) uploadRef.current.value = ""
    },
    [setOpen, outputJson, documentType],
  )

  const onSaveAllClick = useCallback(() => {
    if (isEditor && outputJson) {
      setCitations([...citations, ...outputJson])
    } else {
      if (outputJson) {
        citationDao.bulkAdd(
          outputJson.map(
            (citation) =>
              ({
                ...citation,
                id: uuid(),
                updatedTimestamp: Date.now(),
              } as TCitation),
          ),
        )
      }
    }
    setOpen(false)
    if (uploadRef.current) uploadRef.current.value = ""
  }, [outputJson, documentType, citations, isEditor])

  const onBibliographyListClick = useCallback(() => {
    if (!outputJson) return

    return navigate("/citationsList", {
      state: {
        citations: outputJson,
        style,
        citationDocument: documentType,
      },
    })
  }, [outputJson, style])

  const onExportToWord = useCallback(() => {
    if (outputJson) exportToWord(outputJson)
  }, [outputJson])

  return (
    <Grid alignSelf="center">
      <label htmlFor="contained-button-file">
        <Input
          // @ts-ignore
          ref={uploadRef}
          onChange={onFileUpload}
          accept="*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <Button
          color="secondary"
          sx={{ ":hover": { borderRadius: "8px" } }}
          aria-label="upload"
          startIcon={<UploadFileIcon />}
          component="span"
        >
          <Typography variant="caption" minWidth="102px" color="secondary.main">
            Import form .bib/.tex
          </Typography>
        </Button>
      </label>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...importStyle, width: "50%", height: "50%" }}>
          {uploadProgress > 0 && uploadProgress > 100 && <Spinner />}
          {uploadError && <Alert severity="error">{uploadError}</Alert>}
          {outputJson && outputJson.length > 0 && (
            <Box sx={{ width: "100%", height: "90%" }}>
              <Box display="flex" justifyContent="end">
                <Button startIcon={<SaveIcon />} onClick={onSaveAllClick}>
                  {(isEditor && "Import") || "Save"} All
                </Button>
                {!isEditor && (
                  <Button
                    startIcon={<FormatQuoteIcon />}
                    onClick={onBibliographyListClick}
                  >
                    Bibliography List
                  </Button>
                )}
                {!isEditor && (
                  <Button startIcon={<MicrosoftWordIcon />} onClick={onExportToWord}>
                    export to word .xml
                  </Button>
                )}
              </Box>
              <List sx={{ margin: "8px", height: "100%", overflowY: "scroll" }}>
                {outputJson.map((citation, index) => (
                  <CitationListItem
                    citation={citation}
                    documentType={documentType}
                    onEditClick={onEditClick}
                    style={style}
                    xml={xml}
                    index={index}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  />
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Modal>
    </Grid>
  )
}

const CitationListItem: React.FC<{
  citation: ImportCitation
  documentType: DocumentType
  index: number
  style: CitationStyle
  xml: string
  onEditClick: (e: React.MouseEvent) => void
}> = ({ citation, documentType, index, style, xml, onEditClick }) => {
  const { convertedCitation, inText } = generateCitation(
    citation,
    documentType,
    "html",
    style,
    xml,
  )
  const { pathname } = useLocation()
  const isEditor = pathname === "/citationsList/"

  return (
    <ListItem
      secondaryAction={
        !isEditor && (
          <IconButton
            value={index}
            edge="end"
            aria-label="edit-citation"
            onClick={onEditClick}
          >
            <EditIcon />
          </IconButton>
        )
      }
    >
      <ListItemText>
        <div dangerouslySetInnerHTML={{ __html: convertedCitation }} />
        <Typography variant="caption" display="block" gutterBottom margin={0}>
          In-text Citation:
          <div dangerouslySetInnerHTML={{ __html: inText }} />
        </Typography>
        {citation && (
          <ListItemIcon>
            <Typography variant="caption">
              {DocumentLabel[citation.type as DocumentType]}
            </Typography>
          </ListItemIcon>
        )}
      </ListItemText>
    </ListItem>
  )
}
