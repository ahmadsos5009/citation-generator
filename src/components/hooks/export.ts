import { useContext, useMemo } from "react"

import { Citation, DocumentType } from "../../types"
import { generateCitations } from "../utilities/citation_generator"

import { EditorContext } from "../../provider/EditorProvider"

export default (): {
  citationHtml: string
  citationsJson: Citation & { type: DocumentType }[]
} => {
  const { citations, style, xml } = useContext(EditorContext)

  return useMemo(() => {
    let citationHtml = "",
      citationsJson: Citation & { type: DocumentType }[] = []

    citationHtml = generateCitations(citations, style, xml)
    citationsJson = citations

    return {
      citationHtml,
      citationsJson,
    }
  }, [citations, style])
}
