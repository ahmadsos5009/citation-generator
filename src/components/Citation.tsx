import React, {
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import {
  Alert,
  Box,
  Divider,
  IconButton,
  InputBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import {
  Citation,
  CitationDocumentType,
  CitationOutput,
  DocumentType,
} from "../types"
import BookIcon from "@mui/icons-material/Book"
import WebsiteIcon from "@mui/icons-material/Web"
import ReportIcon from "@mui/icons-material/Summarize"
import SearchIcon from "@mui/icons-material/Search"
import EditIcon from "@mui/icons-material/Edit"
import ArticleIcon from "@mui/icons-material/Article"
import BackspaceIcon from "@mui/icons-material/Backspace"

import { StoreContext } from "../provider/Store"

import { ImportProgress } from "./editor/Spinner"
import { UploadFileModel } from "./Model"
import { CitationImportStrategy } from "./utilities/citation-importer"
import { generateCitation } from "./utilities/citation_generator"
import { DBContext } from "../provider/DBProvider"
import { clearCitationFields, fillCitationFields } from "./utilities/html_fields"
import { PrimaryList } from "./Lists"
import { EditorContext } from "../provider/EditorProvider"

export const DocumentIcon: {
  [key in DocumentType]: ReactElement
} = {
  "article-journal": <ArticleIcon />,
  book: <BookIcon />,
  webpage: <WebsiteIcon />,
  report: <ReportIcon />,
}

export const DocumentLabel: {
  [key in DocumentType]: string
} = {
  "article-journal": "Journal",
  book: "Book",
  webpage: "Website",
  report: "Report",
}

interface OnFlyCitationBoxProps {
  // eslint-disable-next-line react/require-default-props
  citation?: CitationOutput
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
}

const boxStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: "12px",
  margin: "8px",
  borderRadius: "16px",
  borderColor: "#bdbdbd",
  border: 1,
}

export const OnFlyCitationBox: React.FC<OnFlyCitationBoxProps> = ({
  citation,
  handleClick,
}) => {
  if (!citation) {
    return (
      <Typography padding={2} fontWeight="fontWeightMedium">
        Fill entry to generate citation manually on the fly
      </Typography>
    )
  }

  return (
    <Box sx={{ ...boxStyle }}>
      <Box sx={{ display: "flex", padding: "8px", alignItems: "center" }}>
        <IconButton onClick={handleClick} value="citation">
          <ContentCopyIcon />
        </IconButton>
        <div
          className="output-viewer"
          dangerouslySetInnerHTML={{ __html: citation?.html || "" }}
        />
      </Box>

      <Box sx={{ display: "flex", padding: "8px", alignItems: "center" }}>
        <IconButton onClick={handleClick} value="in-text">
          <ContentCopyIcon />
        </IconButton>
        <Box>
          <Typography align="center" color="text.secondary" padding={0}>
            In text citation:
          </Typography>
          <div
            className="output-viewer"
            dangerouslySetInnerHTML={{
              __html: citation?.inText || "",
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export type ImportCitation = Citation & { type: DocumentType }

export const ImportCitationBox: React.FC<{
  documentType: CitationDocumentType
  editor?: boolean
}> = ({ documentType, editor }) => {
  const { format } = useContext(DBContext)
  const [importLoading, setImportLoading] = useState(false)
  const [input, setInput] = useState("")
  const [importedCitations, setImportedCitations] = useState<
    {
      citation: ImportCitation
      htmlCitation: string
      inText: string
    }[]
  >([])

  const [showAlert, setShowAlert] = useState(false)
  const closeSnackbar = useCallback(() => setShowAlert(false), [setShowAlert])

  const onImportChange = useCallback((e) => setInput(e.target.value), [])
  const onClearClick = useCallback(() => {
    setInput("")
    setImportedCitations([])
  }, [])

  const onImportSearch = useCallback(async () => {
    if (input.length < 1) {
      setImportedCitations([])
      return
    }

    setImportLoading(true)

    const importedCitations = await CitationImportStrategy(documentType, input)

    if (importedCitations.length > 0) {
      const previewCitations = importedCitations.map((citation) => {
        const { convertedCitation, inText } = generateCitation(
          citation,
          documentType,
          "html",
          format,
        )
        return {
          citation,
          htmlCitation: convertedCitation,
          inText,
        }
      })
      setImportedCitations(previewCitations)
    } else {
      setShowAlert(true)
      setImportedCitations([])
    }

    setImportLoading(false)
  }, [input, documentType])

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        return onImportSearch()
      }
    },
    [input, documentType],
  )

  const { dispatch } = useContext(StoreContext)
  const { setCitations, citations } = useContext(EditorContext)

  const onEditClick = useCallback(
    (e) => {
      const index = e.currentTarget.value
      if (index) {
        if (editor) {
          citations.push(importedCitations[index].citation)
          setCitations([...citations])
        } else {
          clearCitationFields(documentType)
          fillCitationFields(documentType, importedCitations[index].citation)

          dispatch({
            type: "fill",
            documentType,
            value: importedCitations[index].citation,
          })
        }
        setInput("")
        setImportedCitations([])
      }
    },
    [importedCitations, documentType, editor, citations],
  )

  const message = useMemo(() => {
    switch (documentType) {
      case CitationDocumentType.JOURNAL:
        return "Search by Article Title or DOI or URL"
      case CitationDocumentType.BOOK:
        return "Search by Book Title or URL or ISBN"
      case CitationDocumentType.WEBSITE:
        return "Search by URL"
    }
  }, [documentType])

  if (importLoading) {
    return <ImportProgress />
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Paper
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "62%" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={message}
          inputProps={{ "aria-label": "Import Citation" }}
          value={input}
          onChange={onImportChange}
          onKeyPress={onKeyPress}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search" onClick={onImportSearch}>
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip title="clear imported citation">
          <IconButton sx={{ p: "10px" }} aria-label="clear" onClick={onClearClick}>
            <BackspaceIcon />
          </IconButton>
        </Tooltip>
        <Divider sx={{ height: 28, margin: "0 12px 0 0" }} orientation="vertical" />
        <UploadFileModel documentType={documentType} editor={editor} />
      </Paper>

      <PrimaryList
        sx={{
          bgcolor: "background.paper",
          margin: "8px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {importedCitations.map(({ citation, htmlCitation, inText }, index) => (
          <ListItem
            key="citation-import"
            secondaryAction={
              <IconButton
                edge="end"
                value={index}
                aria-label="edit-citation"
                onClick={onEditClick}
              >
                <EditIcon />
              </IconButton>
            }
          >
            {citation?.type && (
              <ListItemIcon>{DocumentIcon[citation.type]}</ListItemIcon>
            )}
            <ListItemText>
              <div
                dangerouslySetInnerHTML={{
                  __html: htmlCitation,
                }}
              />
              <Typography variant="caption" display="block" gutterBottom margin={0}>
                In-text Citation:
                <div dangerouslySetInnerHTML={{ __html: inText }} />
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </PrimaryList>

      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
          we couldn&apos;t find any results
        </Alert>
      </Snackbar>
    </Box>
  )
}
