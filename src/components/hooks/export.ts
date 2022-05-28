import { useContext, useMemo } from "react"
import { DBContext } from "../../provider/DBProvider"
import { EditorContext } from "../../provider/EditorProvider"
import { ReferencesListContext } from "../../provider/ReferencesListProvider"
import {
  Citation,
  CitationJSDocumentType,
  CitationWithID,
  DocumentType,
} from "../../types"
import { generateCitations } from "../utilities/citation_generator"

export default (
  view: "Editor" | "Generator",
): { citationHtml: string; citationsJson: Citation & { type: DocumentType }[] } => {
  const { state, format } = useContext(DBContext)
  const editorContext = useContext(EditorContext)
  const { selectedCitations, filters } = useContext(ReferencesListContext)

  return useMemo(() => {
    let citationHtml = "",
      citationsJson: Citation & { type: DocumentType }[] = []

    switch (view) {
      case "Generator":
        filters.map((doc) => {
          const citation = Object.values(state.value[doc])
            .filter((c) => selectedCitations.includes((c as CitationWithID).id) && c)
            .map((c) => ({ ...c }))
          if (citation.length > 0) {
            citationHtml = citationHtml.concat(
              generateCitations(citation, format) + "\n",
            )
          }
        })

        filters.map((doc) =>
          Object.values(state.value[doc])
            .filter((c) => selectedCitations.includes((c as CitationWithID).id) && c)
            .map((c) =>
              citationsJson.push({ ...c, type: CitationJSDocumentType[doc] }),
            ),
        )
        break
      case "Editor": {
        const { citations, format, html } = editorContext
        citationHtml = html || generateCitations(citations, format)
        citationsJson = citations
        break
      }
    }

    return {
      citationHtml,
      citationsJson,
    }
  }, [
    filters,
    state.value,
    editorContext.citations,
    editorContext.format,
    editorContext.html,
    selectedCitations,
    view,
  ])
}
