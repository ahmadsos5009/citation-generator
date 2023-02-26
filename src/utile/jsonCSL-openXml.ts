import { DocumentType, TCitation } from "../db/types"
import { users } from "../cslTypes/fieldsMapping"
import { User } from "../cslTypes/type"
import { Citation } from "../types"
import { v4 as uuid } from "uuid"

const schema = `
<b:Sources xmlns:b="http://schemas.openxmlformats.org/officeDocument/2006/bibliography" 
           xmlns="http://schemas.openxmlformats.org/officeDocument/2006/bibliography">
</b:Sources>           
`

/** CSL Citation type mapping to the open xml from bibtex */
const types = {
  "article-journal": "Journal Article",
  book: "Book",
  webpage: "Miscellaneous",
  report: "Report",
}

/** CSL Citation users to open xml author */
const OPEN_XML_AUTHOR = {
  author: "b:Author",
  editor: "b:Editor",
  "container-author": "b:BookAuthor",
  composer: "b:Composer",
  director: "b:Director",
  interviewer: "b:Interviewer",
  translator: "b:Translator",
}

/** Map CSL field to the open xml type */
const CSL_OPEN_XML = {
  "chapter-number": "b:ChapterNumber",
  edition: "b:Edition",
  journalAbbreviation: "b:JournalName",
  issue: "b:Issue",
  medium: "b:Medium",
  accessed: ["b:YearAccessed", "b:MonthAccessed", "b:DayAccessed"],
  issued: ["b:Year", "b:Month", "b:Day"],
  "number-of-volumes": "NumberVolumes",
  page: "b:Pages",
  "number-of-pages": "b:Pages",
  "publisher-place": "b:PlacePublished",
  "container-title": "b:PublicationTitle",
  "volume-title": "b:PeriodicalTitle",
  publisher: "b:Publisher",
  source: "b:SourceType",
  shortTitle: "b:ShortTitle",
  ISSN: "b:StandardNumber",
  ISBN: "b:StandardNumber",
  type: "b:Type",
  title: "b:Title",
  URL: "b:URL",
  Version: "b:Version",
  volume: "b:Volume",
  version: "b:Version",
}

/**
 * convert csl json citations to a open xml Bibliography
 */
export const cslToOpenXml = (citations: TCitation[]) => {
  const parser = new DOMParser()
  const sources = parser.parseFromString(schema, "text/xml")

  citations.map((citation) => {
    const source = sources.createElement("b:Source")
    const authors = sources.createElement("b:Author")

    Object.entries(citation).map(([key, value]) => {
      if (key in CSL_OPEN_XML) {
        AddField(key, value, sources, source)
      }

      if (key in users) {
        addUser(sources, authors, key, value)
      }

      if (authors.childElementCount > 0) {
        source.appendChild(authors)
      }
    })

    if (source.childElementCount > 0) {
      const tag = sources.createElement("b:Tag")
      tag.appendChild(sources.createTextNode(citation.title || uuid()))
      source.appendChild(tag)

      sources.documentElement.appendChild(source)
    }
  })

  return new XMLSerializer().serializeToString(sources.documentElement)
}

function AddField(
  key: string,
  value: { "date-parts": string[] } | string,
  sources: Document,
  source: HTMLElement,
) {
  switch (key) {
    case "issued":
    case "accessed": {
      // @ts-ignore
      if ("date-parts" in value) {
        // @ts-ignore
        value["date-parts"][0].map((date: string, index: number) => {
          const child = sources.createElement(CSL_OPEN_XML[key][index])
          child.appendChild(sources.createTextNode(date))
          source.appendChild(child)
        })
      }
      break
    }
    case "type": {
      const child = sources.createElement(CSL_OPEN_XML[key])
      child.appendChild(
        sources.createTextNode(types[value as DocumentType] || "Journal Article"),
      )
      source.appendChild(child)
      break
    }
    default: {
      // @ts-ignore
      const child = sources.createElement(CSL_OPEN_XML[key])
      child.appendChild(sources.createTextNode(value as string))
      source.appendChild(child)
    }
  }
}

function addUser(
  sources: Document,
  authors: HTMLElement,
  key: string,
  value: User[],
) {
  // @ts-ignore
  const author = sources.createElement(OPEN_XML_AUTHOR[key])
  const namelist = sources.createElement("b:NameList")

  value.map((user: User) => {
    const person = sources.createElement("b:Person")

    if (user.given) {
      const name = sources.createElement("b:First")
      name.appendChild(sources.createTextNode(user.given))
      person.appendChild(name)
    }
    if (user.family) {
      const name = sources.createElement("b:Last")
      name.appendChild(
        sources.createTextNode(user.family + (user.suffix ? ` ${user.suffix}` : "")),
      )
      person.appendChild(name)
    }

    if (person.childElementCount > 0) {
      namelist.appendChild(person)
    }
  })

  if (namelist.childElementCount > 0) {
    author.appendChild(namelist)
    authors.appendChild(author)
  }
}

export const exportToWord = (citations: Citation[]) => {
  const link = document.createElement("a")

  link.href =
    `data:text/x-tex;charset=UTF-8,` +
    encodeURIComponent(cslToOpenXml(citations as TCitation[]))
  link.download = "WordSourceCitations.xml"
  link.click()
}
