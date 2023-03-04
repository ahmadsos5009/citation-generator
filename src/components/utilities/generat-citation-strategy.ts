import { CopyOption } from "../form/CitationToolbar"
import { generateCitation, generateNativeCitation } from "./citation_generator"
import convertToBibitem from "../../utile/jsonCSL-bibitem"

import {
  Citation,
  CitationDocumentType,
  CitationJSDocumentType,
  CitationStyle,
} from "../../types"
import { plugins } from "@citation-js/core"
import { TCitation } from "../../db/types"

const generateStrategy = (
  citation: Citation,
  documentType: CitationDocumentType,
  style: CitationStyle,
  xml: string,
  option: CopyOption,
): { convertedCitation: string; inText?: string } => {
  switch (option) {
    case "text":
      return generateCitation(citation, documentType, "text", style, xml)
    case "bibtex": {
      require("@citation-js/plugin-bibtex")
      plugins.output.format("bibtex", [], { format: "text" })

      return {
        convertedCitation: generateNativeCitation(
          citation,
          CitationJSDocumentType[documentType],
          "bibtex",
          style,
          xml,
        ),
      }
    }
    case "ris": {
      require("@citation-js/plugin-ris")
      return {
        convertedCitation: generateNativeCitation(
          citation,
          CitationJSDocumentType[documentType],
          "ris",
          style,
          xml,
        ),
      }
    }
    case "bibitem": {
      return {
        convertedCitation: convertToBibitem([citation as TCitation]),
      }
    }
    default:
      return { convertedCitation: "" }
  }
}

export default generateStrategy
