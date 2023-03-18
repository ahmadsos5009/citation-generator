import React, { useContext, useMemo } from "react"
import { Alert, Box, IconButton, Paper, Snackbar, Typography } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { isEmptyCitation } from "../utilities/object"
import { useClipboard } from "../hooks"
import { GeneratorContext } from "../../provider/GeneratorProvider"
import { generateCitation } from "../utilities/citation_generator"

/**
 * Show user citation on the flay
 */
const QuickCitationPreview: React.FC = () => {
  const { showAlert, handleClick, handleClose } = useClipboard()
  const { citation, style, xml, documentType, copyOption } =
    useContext(GeneratorContext)

  const { convertedCitation, inText } = useMemo(
    () => generateCitation(citation, documentType, "html", style, xml),
    [citation, documentType, style],
  )

  const isEmpty = useMemo(() => isEmptyCitation(citation, documentType), [citation])

  if (isEmpty) {
    return <></>
  }

  return (
    <>
      <Paper elevation={4} sx={{ my: 1 }}>
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

        {copyOption === "text" && (
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
        )}
      </Paper>

      <Snackbar open={showAlert} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Citation Copied to clipboard
        </Alert>
      </Snackbar>
    </>
  )
}

export default QuickCitationPreview
