import React, { useCallback, useContext, useState } from "react"
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material"
import { GeneratorContext } from "../../provider/GeneratorProvider"
import { navigate } from "gatsby"
import { isEmptyCitation } from "../utilities/object"
import { CitationJSDocumentType } from "../../types"
import { AdsSidebar } from "../Ads"
import { CSL_NOTE_METADATA } from "../../csl_metadata"

import NoteIcon from "@mui/icons-material/Note"

const QuickActionsSection: React.FC<{ pageTitle: string }> = ({ pageTitle }) => {
  const { citation, style, documentType } = useContext(GeneratorContext)

  const [isEmpty, setIsEmpty] = useState(false)

  const onGenerateReferencesClick = useCallback(() => {
    if (isEmptyCitation(citation, CitationJSDocumentType[documentType])) {
      setIsEmpty(true)
      return
    }

    return navigate("/citationsList", {
      state: {
        citations: [citation],
        style,
        citationDocument: documentType,
      },
    })
  }, [citation, style, documentType])

  return (
    <>
      <Grid item container md={4}>
        <Stack>
          <Button onClick={onGenerateReferencesClick} variant="text">
            {pageTitle} Reference Generator
          </Button>
          <List
            sx={{ py: 2, px: 1 }}
            subheader={
              <Stack direction="row" alignItems="center" spacing={1}>
                {/*  @ts-ignore */}
                <NoteIcon fontSize="1em" />
                <Typography>Annotated Bibliography</Typography>
              </Stack>
            }
          >
            <Divider />
            {Object.values(CSL_NOTE_METADATA).map(({ id, label }) => (
              <ListItem key={id}>
                <Button
                  sx={{ flex: 1, justifyContent: "start" }}
                  href={`/${id.toLowerCase()}/`}
                  component="a"
                  variant="text"
                >
                  {label}
                </Button>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Grid>

      <Grid item md={8}>
        <AdsSidebar dataAdSlot="1729214133" />
      </Grid>

      <Snackbar
        open={isEmpty}
        autoHideDuration={6000}
        onClose={() => setIsEmpty(false)}
        message="Empty Citation! please fill in fields or import citations from an external source"
      />
    </>
  )
}

export default QuickActionsSection
