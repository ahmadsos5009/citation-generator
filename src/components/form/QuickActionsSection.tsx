import React, { useCallback, useContext, useState } from "react"
import { Button, Grid, Snackbar, Stack } from "@mui/material"
import { GeneratorContext } from "../../provider/GeneratorProvider"
import { navigate } from "gatsby"
import { isEmptyCitation } from "../utilities/object"
import { CitationJSDocumentType } from "../../types"
import AdsSidebar from "../AdsSidebar"

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
