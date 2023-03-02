import React, { useCallback, useContext, useState } from "react"
import { Button, Grid, Snackbar, Stack } from "@mui/material"
import { GeneratorContext } from "../../provider/GeneratorProvider"
import { navigate } from "gatsby"
import { isEmptyCitation } from "../utilities/object"
import { CitationJSDocumentType } from "../../types"

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8835129466793937"
          crossOrigin="anonymous"
        />
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8835129466793937"
          data-ad-slot="1729214133"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
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
