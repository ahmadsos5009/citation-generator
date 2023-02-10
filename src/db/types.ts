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
  updatedTimestamp: number
}

export type DBSchema = {
  csl: Table<TCSL>
  citation: Table<TCitation>
} & Dexie

export const schema = {
  csl: "id, name, xml",
  citation: "id, updatedTimestamp",
}
