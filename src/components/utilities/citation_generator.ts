import { Cite, plugins } from "@citation-js/core"
import { Citation, CitationStyle, DocumentType } from "../../types"
import { v4 as uuid } from "uuid"
import { TCitation } from "../../db/types"

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

/**
 * Convert BibTex to CSL citation list
 */
export function convertBibTexToCSL(bibTex: string): TCitation[] {
  require("@citation-js/plugin-bibtex")
  const cite = Cite(bibTex, { format: "string" })
  const outputJson = cite.get({ format: "real", type: "json" })

  return outputJson.map((citation: { _graph?: string }) => {
    delete citation["_graph"]
    return { ...citation, id: uuid(), updatedTimestamp: Date.now() }
  }) as TCitation[]
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
) => {
  const cite = Cite(citations, { format: "string" })

  const cslPlugin = plugins.config.get("@csl")
  cslPlugin.templates.add(template, xml)

  const citeproc = cslPlugin.engine([], template, "en-US", "html")

  const [{ entryspacing, hangingindent, linespacing }] = citeproc.makeBibliography()

  // TODO:: inject this style
  const css = `
      .csl-bib-body {
        line-height: ${linespacing || 1.35};
      }
      .csl-entry {
         ${(hangingindent && "padding-left: 2em; text-indent:-2em;") || ""}
      }
      .csl-entry:not:first-child {
        margin-bottom: ${entryspacing ? entryspacing + "em" : 0};
      }
  `

  const referencesList = cite.format((inText && "citation") || "bibliography", {
    format: "html",
    lang: "en-US",
    template,
  })

  return referencesList
}
