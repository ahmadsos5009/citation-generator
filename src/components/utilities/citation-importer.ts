import { ImportCitation } from "../Citation"
import { Cite } from "@citation-js/core"
import * as name from "@citation-js/name"
import * as date from "@citation-js/date"
import { util } from "@citation-js/core"
import { CitationDocumentType } from "../../types"

const CROSS_REF_API = "https://api.crossref.org"
const GOOGLE_BOOK_API = "https://www.googleapis.com/books/v1/volumes"
const AUTO_CITE_API = "https://autocite.citation-api.com"

const GOOGLE_PROPS = [
  {
    source: "printType",
    target: "type",
    convert: {
      toTarget(type: string) {
        return {
          BOOK: "book",
          MAGAZINE: "article-magazine",
        }[type]
      },
      toSource(type: string) {
        if (type.slice(0, 7) === "article") {
          return "MAGAZINE"
        } else {
          return "BOOK"
        }
      },
    },
  },
  {
    source: "authors",
    target: "author",
    convert: {
      toTarget(authors: []) {
        return authors.map(name.parse)
      },
      toSource(authors: []) {
        return authors.map(name.format)
      },
    },
  },
  { source: "canonicalVolumeLink", target: "URL" },
  {
    source: "categories",
    target: "keyword",
    convert: {
      toTarget(array: []) {
        return array.join(",")
      },
      toSource(list: string) {
        return list.split(",")
      },
    },
  },
  { source: "description", target: "abstract" },
  {
    source: "industryIdentifiers",
    target: ["ISBN", "ISSN", "DOI", "PMID", "PMCID"],
    convert: {
      toTarget(ids: { identifier: string; type: string }[]) {
        return ["ISBN_13", "ISSN"].map(
          (id) => (ids.find(({ type }) => type === id) || {}).identifier,
        )
      },
      toSource(isbn: string, issn: string, ...other: []) {
        return [
          isbn && {
            type: isbn.length === 13 ? "ISBN_13" : "ISBN_10",
            identifier: isbn,
          },

          issn && { type: "ISSN", identifier: issn },

          ...other.map((identifier) => ({ type: "OTHER", identifier })),
        ].filter(Boolean)
      },
    },
  },
  "language",
  { source: "pageCount", target: "number-of-pages" },
  "publisher",
  "title",
  {
    source: "publishedDate",
    target: "issued",
    convert: {
      toTarget: date.parse,
      toSource: date.format,
    },
  },
  {
    source: "imageLinks",
    target: "thumbnail",
    convert: {
      toTarget(imageLinks: { thumbnail: string }) {
        return imageLinks.thumbnail
      },
    },
  },
]

/**
 * Search for a Journal article in cross ref, by article title
 * and return list of formatted citations:
 * ** title
 * ** publisher
 * ** author
 * ** url
 */
export const JournalTitleSearch = async (
  title: string,
): Promise<ImportCitation[]> => {
  const API_PARAM = [
    "filter=type:journal-article",
    `query.bibliographic=${title}`,
  ].join("&")

  const response = await (await fetch(`${CROSS_REF_API}/works?${API_PARAM}`)).json()
  if (response && response["status"] === "ok") {
    const {
      message: { items },
    } = response
    // @ts-ignore
    return items.map((citation) => Cite(citation, { format: "real" }).data[0])
  }

  return []
}

/**
 * Search for a Book using google api, by book title
 * and return list of CSL citations
 */

export const BookTitleSearch = async (title: string): Promise<ImportCitation[]> => {
  const API_PARAM = `?q=intitle:${title}`
  const response = await fetch(`${GOOGLE_BOOK_API}${API_PARAM}`)

  if (response.ok) {
    const json = await response.json()
    // @ts-ignore
    return json.items.map((citation) => {
      const translator = new util.Translator(GOOGLE_PROPS)
      if (citation["volumeInfo"]?.language === "un") {
        delete citation["volumeInfo"].language
      }
      return translator.convertToTarget(citation["volumeInfo"])
    })
  }
  return []
}

/**
 * Return List of Website citations by it's url
 * */
export const WebsiteUrlSearch = async (url: string): Promise<ImportCitation[]> => {
  const API_PARAM = `/api/v3/query?url=${url}`
  const response = await fetch(`${AUTO_CITE_API}${API_PARAM}`)

  if (response.ok) {
    const json = await response.json()
    return json.results.map((citation: { csl: ImportCitation }) => citation["csl"])
  }
  return []
}

/**
 * Import Citation by it's URL or DOI or ISBN from CitationJs
 */
export const CitationJsImport = async (input: string): Promise<ImportCitation[]> => {
  require("@citation-js/plugin-isbn")
  require("@citation-js/plugin-doi")
  require("@citation-js/plugin-bibjson")
  try {
    const cite = await Cite.async(input)
    return cite.get({ format: "real", type: "json", style: "csl" })
  } catch (e) {
    return []
  }
}

const ISBN = /^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$/
const DOI = /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i
const URL = /^http([s]?):\/\/.*/

export const CitationImportStrategy = async (
  document: CitationDocumentType,
  input: string,
): Promise<ImportCitation[]> => {
  if (document === CitationDocumentType.WEBSITE) {
    return await WebsiteUrlSearch(input)
  }

  if (URL.test(input) || DOI.test(input) || ISBN.test(input)) {
    return await CitationJsImport(input)
  } else {
    switch (document) {
      case CitationDocumentType.JOURNAL:
        return await JournalTitleSearch(input)
      case CitationDocumentType.BOOK:
        return await BookTitleSearch(input)
    }
  }
  return []
}
