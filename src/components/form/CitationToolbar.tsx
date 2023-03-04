import React, { useCallback, useContext } from "react"
import { GeneratorContext } from "../../provider/GeneratorProvider"

import {
  Button,
  ButtonGroup,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import DocumentSource from "./DocumentSource"
import { exportToWord } from "../../utile/jsonCSL-openXml"
import { MicrosoftWordIcon } from "../../icons"

import { isEmptyCitation } from "../utilities/object"
import { Citation, CitationJSDocumentType } from "../../types"

export type PreviewMode = "citation" | "footnote"

export type CopyOption = "text" | "word" | "bibtex" | "bibitem" | "ris"

const CitationToolbar: React.FC = () => {
  const { copyOption, setCopyOption, citation, documentType } =
    useContext(GeneratorContext)

  const onExportToWord = useCallback(() => {
    if (!isEmptyCitation(citation, CitationJSDocumentType[documentType])) {
      exportToWord([
        {
          ...citation,
          type: CitationJSDocumentType[documentType],
        } as unknown as Citation,
      ])
    }
  }, [citation, documentType])

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
      justifyContent={{ xs: "center", md: "space-between" }}
      bgcolor="#F4F3F5"
    >
      <Stack>
        <DocumentSource />
        <Typography variant="caption" align="center" p={1}>
          Document Type
        </Typography>
      </Stack>

      <Stack alignItems="center">
        <ButtonGroup sx={{ flexWrap: "wrap" }} size="small">
          <Button
            startIcon={<MicrosoftWordIcon />}
            size="small"
            variant="text"
            color="secondary"
            onClick={onExportToWord}
          >
            export to word .xml
          </Button>
        </ButtonGroup>
        <Typography variant="caption" align="center" p={1}>
          Import your citation to Microsoft Word
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
          <ToggleButton value="bibitem">LaTex-bibitem</ToggleButton>
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
