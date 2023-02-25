import { Dexie, Table } from "dexie"
import {
  BookCitation,
  JournalArticleCitation,
  ReportCitation,
  WebsiteCitation,
} from "../cslTypes/type"

export type DocumentType = "article-journal" | "report" | "book" | "webpage"

export interface TCSL {
  id: string
  name: string
  xml: string
}

export interface TCitation
  extends JournalArticleCitation,
    ReportCitation,
    BookCitation,
    WebsiteCitation {
  id: string
  type: DocumentType
  favorite?: 1 | 0
  updatedTimestamp: number
}

export type TProject = {
  id: string
  name: string
  citations: string[]
}

export type DBSchema = {
  csl: Table<TCSL>
  citation: Table<TCitation>
  project: Table<TProject>
} & Dexie

export const schema = {
  csl: "id, name, xml",
  citation: "id, updatedTimestamp, favorite",
  project: "id, name, *citations",
}
