import React, { useEffect, useState } from "react"

import { CitationDocumentType, CitationStyle } from "../types"
import { ImportCitation } from "../components/Citation"
import { generateCitations } from "../components/utilities/citation_generator"

export const EditorContext = React.createContext<{
  citations: ImportCitation[]
  documentType: CitationDocumentType
  format: CitationStyle
  html?: string
  setCitations: React.Dispatch<React.SetStateAction<ImportCitation[]>>
  setDocumentType: React.Dispatch<React.SetStateAction<CitationDocumentType>>
  setFormat: React.Dispatch<React.SetStateAction<CitationStyle>>
  setHtml: React.Dispatch<React.SetStateAction<string>>
}>({
  citations: [],
  documentType: CitationDocumentType.JOURNAL,
  format: "apa",
  setCitations: () => {
    console.error("Unmounted")
  },
  setDocumentType: () => {
    console.error("Unmounted")
  },
  setFormat: () => {
    console.error("Unmounted")
  },
  setHtml: () => {
    console.error("Unmounted")
  },
})

export const EditorProvider: React.FC = ({ children }) => {
  const [citations, setCitations] = useState<ImportCitation[]>([])
  const [documentType, setDocumentType] = useState<CitationDocumentType>(
    CitationDocumentType.JOURNAL,
  )
  const [format, setFormat] = useState<CitationStyle>("apa")
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    if (citations.length < 1) return

    const parser = new DOMParser()
    const citationsNode = parser.parseFromString(html, "text/html")
    const currentCSLBibNode = citationsNode.getElementsByClassName("csl-bib-body")[0]
    const newNode = document
      .createRange()
      .createContextualFragment(generateCitations(citations, format))

    if (currentCSLBibNode) {
      currentCSLBibNode.replaceWith(newNode)
    } else {
      citationsNode.body.appendChild(newNode)
    }

    //TODO:: Add option to write custom text or remove it
    if (!citationsNode.querySelector("#references_header")) {
      const header = document.createElement("h1")
      header.innerText = "References"
      header.id = "references_header"
      header.style.textAlign = "center"
      citationsNode.body.insertBefore(header, citationsNode.body.firstChild)
    }

    if (citationsNode.querySelector("#default_message")) {
      citationsNode.getElementById("default_message")?.remove()
    }

    setHtml(citationsNode.documentElement.outerHTML)
  }, [citations])

  return (
    <EditorContext.Provider
      value={{
        citations,
        format,
        documentType,
        html,
        setCitations,
        setFormat,
        setDocumentType,
        setHtml,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}
