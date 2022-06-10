import React, { useEffect, useState } from "react"

import { CitationDocumentType, CitationStyle } from "../types"
import { ImportCitation } from "../components/Citation"
import { generateCitations } from "../components/utilities/citation_generator"

export const EditorContext = React.createContext<{
  citations: ImportCitation[]
  documentType: CitationDocumentType
  style: CitationStyle
  html?: string
  setCitations: React.Dispatch<React.SetStateAction<ImportCitation[]>>
  setDocumentType: React.Dispatch<React.SetStateAction<CitationDocumentType>>
  setStyle: React.Dispatch<React.SetStateAction<CitationStyle>>
  setHtml: React.Dispatch<React.SetStateAction<string>>
}>({
  citations: [],
  documentType: CitationDocumentType.JOURNAL,
  style: "apa",
  setCitations: () => {
    console.error("Unmounted")
  },
  setDocumentType: () => {
    console.error("Unmounted")
  },
  setStyle: () => {
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
  const [style, setStyle] = useState<CitationStyle>("apa")
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    if (citations.length < 1) return

    const parser = new DOMParser()
    const citationsNode = parser.parseFromString(html, "text/html")
    const currentCSLBibNode = citationsNode.getElementsByClassName("csl-bib-body")[0]
    const newNode = document
      .createRange()
      .createContextualFragment(generateCitations(citations, style))

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
  }, [citations, style])

  return (
    <EditorContext.Provider
      value={{
        citations,
        style,
        documentType,
        html,
        setCitations,
        setStyle,
        setDocumentType,
        setHtml,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}
