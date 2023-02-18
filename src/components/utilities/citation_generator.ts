import { Cite, plugins } from "@citation-js/core"
import { Citation, CitationStyle, DocumentType } from "../../types"

require("@citation-js/plugin-csl")

export function generateNativeCitation(
  citation: Citation,
  documentType: DocumentType,
  format: "ris" | "bibtex",
  template: CitationStyle,
  xml: string,
): string {
  const cslPlugin = plugins.config.get("@csl")
  cslPlugin.templates.add(template, xml)

  const cite = Cite({ ...citation, type: documentType }, { format: "string" })
  return cite.format(format, {
    format: "text",
    lang: "en-US",
    template,
  })
}

export function generateCitation(
  citation: Citation,
  documentType: string,
  format: "html" | "text",
  template: CitationStyle,
  xml: string,
): { convertedCitation: string; inText: string } {
  const cslPlugin = plugins.config.get("@csl")
  cslPlugin.templates.add(template, xml)

  const cite = Cite({ ...citation, type: documentType }, { format: "string" })
  const htmlCitation = cite.format("bibliography", {
    format: format,
    lang: "en-US",
    template,
  })
  const inTextCitation = cite.format("citation", {
    format: format,
    lang: "en-US",
    template,
  })

  return {
    convertedCitation: htmlCitation,
    inText: inTextCitation,
  }
}

export const generateCitations = (
  citations: Citation[],
  template: CitationStyle,
  xml: string,
  inText?: boolean,
): string => {
  const cite = Cite(citations, { format: "string" })

  const cslPlugin = plugins.config.get("@csl")
  cslPlugin.templates.add(template, xml)

  return cite.format((inText && "citation") || "bibliography", {
    format: "html",
    lang: "en-US",
    template,
  })
}
