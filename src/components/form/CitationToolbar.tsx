import React, { useCallback, useContext } from "react"
import { GeneratorContext } from "../../provider/GeneratorProvider"

import {
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import DocumentSource from "./DocumentSource"

export type PreviewMode = "citation" | "footnote"

export type CopyOption = "text" | "word" | "bibtex" | "bibitem" | "ris"

const CitationToolbar: React.FC = () => {
  const { previewMode, copyOption, setPreviewMode, setCopyOption } =
    useContext(GeneratorContext)

  const onChangePreviewMode = useCallback((e, value) => {
    if (value) setPreviewMode(value)
  }, [])

  const onChangeCopyOption = useCallback((e, value) => {
    if (value) setCopyOption(value)
  }, [])

  return (
    <Grid
      item
      xs={11}
      lg={12}
      p={{ xs: 1, md: 2 }}
      container
      flexWrap="wrap"
      justifyContent="space-around"
      bgcolor="#F4F3F5"
    >
      <Stack>
        <DocumentSource />
        <Typography variant="caption" align="center" p={1}>
          Document Type
        </Typography>
      </Stack>

      <Stack visibility="hidden" width={0} height={0}>
        <ToggleButtonGroup
          sx={{ flexWrap: "wrap" }}
          value={previewMode}
          onChange={onChangePreviewMode}
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
          value={copyOption}
          onChange={onChangeCopyOption}
          size="small"
          exclusive
        >
          <ToggleButton value="text">Plain-text</ToggleButton>
          <ToggleButton value="bibtex">Bibtex</ToggleButton>
          <ToggleButton value="ris">Ris</ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="caption" align="center" p={1}>
          Copy Option
        </Typography>
      </Stack>
    </Grid>
  )
}

export default CitationToolbar
