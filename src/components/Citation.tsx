import React, { useCallback, useContext, useMemo, useState } from "react"
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  SxProps,
  TextField,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material"

import { Citation, CitationStyle, DocumentLabel, DocumentType } from "../types"

import SearchIcon from "@mui/icons-material/Search"
import EditIcon from "@mui/icons-material/Edit"

import BackspaceIcon from "@mui/icons-material/Backspace"

import { ImportProgress } from "./editor/Spinner"

import { CitationImportStrategy } from "./utilities/citation-importer"
import { generateCitation } from "./utilities/citation_generator"

import { PrimaryList } from "./Lists"

import { GeneratorContext } from "../provider/GeneratorProvider"

import { UploadFileModel } from "./Model"
import DocumentSource from "./form/DocumentSource"
import { isEmptyCitation } from "./utilities/object"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

interface OnFlyCitationBoxProps {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
}

const boxStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: "12px",
  width: "100%",
  overflowWrap: "anywhere",
  bgcolor: "#F4F3F5",
  borderRadius: "4px",
}

export const OnFlyCitationBox: React.FC<OnFlyCitationBoxProps> = ({
  handleClick,
}) => {
  const { citation, style, xml, documentType } = useContext(GeneratorContext)

  const { convertedCitation, inText } = useMemo(
    () => generateCitation(citation, documentType, "html", style, xml),
    [citation, documentType, style],
  )

  const isEmpty = useMemo(() => isEmptyCitation(citation, documentType), [citation])

  return (
    <Grid item xs={11} lg={12} sx={{ ...boxStyle }}>
      <Grid xs={11} md={12} item container justifyContent="space-between">
        <Stack>
          <DocumentSource />
          <Typography variant="caption" align="center" p={1}>
            Document Type
          </Typography>
        </Stack>

        <Stack>
          <ToggleButtonGroup
            sx={{ flexWrap: "wrap" }}
            value="citation"
            size="small"
            exclusive
          >
            <ToggleButton value="citation">Citation Preview</ToggleButton>
            <ToggleButton value="footnote">Footnote Preview</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="caption" align="center" p={1}>
            View Mode
          </Typography>
        </Stack>

        <Stack>
          <ToggleButtonGroup
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
            value="text"
            size="small"
            exclusive
          >
            <ToggleButton value="text">Plain-text</ToggleButton>
            <ToggleButton value="word">Word</ToggleButton>
            <ToggleButton value="bibtex">
              {/*<BibtexIcon />*/}
              Bibtex
            </ToggleButton>
            <ToggleButton value="bibitem">
              {/*<TexIcon />*/}
              Bibitem
            </ToggleButton>
            <ToggleButton value="ris">
              {/*<RisIcon />*/}
              Ris
            </ToggleButton>
            <ToggleButton value="endnote">
              {/*<XmlIcon />*/}
              Endnote
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="caption" align="center" p={1}>
            Copy Option
          </Typography>
        </Stack>
      </Grid>

      {/*{!citation ||*/}
      {/*  (isEmptyCitation(citation, CitationJSDocumentType[documentType]) && (*/}
      {/*    <Typography align="center" p={1} fontWeight="bold">*/}
      {/*      Fill entry to generate citation manually on the fly <br />*/}
      {/*      or Import citation from an external source*/}
      {/*    </Typography>*/}
      {/*  ))}*/}
      {!isEmpty && (
        <Paper sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", padding: "8px", alignItems: "center" }}>
            <IconButton
              onClick={handleClick}
              value="citation"
              sx={{ flexDirection: "column" }}
            >
              <ContentCopyIcon />
              <Typography variant="caption">Copy</Typography>
            </IconButton>
            <div
              className="output-viewer"
              dangerouslySetInnerHTML={{ __html: convertedCitation }}
            />
          </Box>

          <Box sx={{ display: "flex", padding: "8px", alignItems: "center" }}>
            <IconButton
              onClick={handleClick}
              value="in-text"
              sx={{ flexDirection: "column" }}
            >
              <ContentCopyIcon />
              <Typography variant="caption">Copy</Typography>
            </IconButton>
            <Box>
              <Typography variant="caption" color="text.secondary" padding={0}>
                In text citation:
              </Typography>
              <div
                className="output-viewer"
                dangerouslySetInnerHTML={{
                  __html: inText,
                }}
              />
            </Box>
          </Box>
        </Paper>
      )}
    </Grid>
  )
}

// TODO:: remove this and add to type to the manually citation
export type ImportCitation = Citation & { type: DocumentType }

export const ImportCitationBox: React.FC<{
  documentType: DocumentType
  style: string
  xml: string
  updateCitation: (citation: Citation) => void
}> = ({ documentType, style, xml, updateCitation }) => {
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
          style as CitationStyle,
          xml,
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
  }, [input, documentType, style])

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        return onImportSearch()
      }
    },
    [input, documentType],
  )

  const onEditClick = useCallback(
    (e) => {
      const index = e.currentTarget.value
      const { citation } = importedCitations[index]
      updateCitation(citation)
      setInput("")
      setImportedCitations([])
    },
    [importedCitations],
  )

  const message = useMemo(() => {
    switch (documentType) {
      case "article-journal":
        return "Search by Article Title or DOI or URL or PubMed ID"
      case "book":
        return "Search by Book Title or URL or ISBN"
      case "webpage":
        return "Search by URL"
      default:
        return `Search not supported for book ${DocumentLabel[documentType]}`
    }
  }, [documentType])

  const isSearchSupported =
    documentType === "article-journal" ||
    documentType === "book" ||
    documentType === "webpage"

  if (importLoading) {
    return <ImportProgress />
  }

  return (
    <Grid py={2} item container justifyContent={{ xs: "center", md: "start" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "95%", md: "100%" },
        }}
      >
        <Container disableGutters sx={{ display: "flex" }}>
          <TextField
            disabled={!isSearchSupported}
            size="small"
            sx={{ p: 1, ml: 1, flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={onImportSearch}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
            placeholder={message}
            value={input}
            onChange={onImportChange}
            onKeyPress={onKeyPress}
          />

          <ButtonGroup>
            <Divider orientation="vertical" />
            <Tooltip title="clear imported citation">
              <IconButton
                sx={{ p: "10px" }}
                aria-label="clear"
                onClick={onClearClick}
              >
                <BackspaceIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Container>

        <Divider
          sx={{ display: { xs: "none", md: "flex" } }}
          orientation="vertical"
        />

        <UploadFileModel
          documentType={documentType}
          updateCitation={updateCitation}
          style={style as CitationStyle}
          xml={xml}
        />
      </Paper>

      {/* TODO:: move this to import list results */}
      {importedCitations.length > 0 && (
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
              key={index.toString()}
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
                <ListItemIcon>
                  {DocumentLabel[citation.type as DocumentType]}
                </ListItemIcon>
              )}
              <ListItemText>
                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlCitation,
                  }}
                />
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  margin={0}
                >
                  In-text Citation:
                  <div dangerouslySetInnerHTML={{ __html: inText }} />
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </PrimaryList>
      )}

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
    </Grid>
  )
}
