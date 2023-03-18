export interface JournalArticleCitation {
  title?: string
  abstract?: string
  "container-title"?: string
  volume?: string | number
  issue?: string | number
  page?: string | number
  issued?: { "date-parts": string[] }
  "collection-title"?: string
  journalAbbreviation?: string
  language?: string
  DOI?: string
  ISSN?: string
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  archive?: string
  archive_location?: string
  source?: string
  "call-number"?: string
  note?: string
  author?: User[]
  contributor?: User[]
  editor?: User[]
  "reviewed-author"?: User[]
  translator?: User[]
}

export interface ReportCitation {
  title?: string
  abstract?: string
  "collection-title"?: string
  "publisher-place"?: string
  issued?: { "date-parts": string[] }
  page?: string | number
  language?: string
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  archive?: string
  archive_location?: string
  source?: string
  "call-number"?: string
  note?: string
  author?: User[]
  contributor?: User[]
  "collection-editor"?: User[]
  translator?: User[]
}

export interface BookCitation {
  title?: string
  abstract?: string
  "collection-title"?: string
  "collection-number"?: string | number
  volume?: string | number
  "number-of-volumes"?: string | number
  edition?: string | number
  "publisher-place"?: string
  issued?: { "date-parts": string[] }
  "number-of-pages"?: string | number
  language?: string
  ISBN?: string
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  archive?: string
  archive_location?: string
  source?: string
  "call-number"?: string
  note?: string
  author?: User[]
  contributor?: User[]
  editor?: User[]
  "collection-editor"?: User[]
  translator?: User[]
}

export interface WebsiteCitation {
  title?: string
  abstract?: string
  issued?: { "date-parts": string[] }
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  language?: string
  note?: string
  author?: User[]
  contributor?: User[]
  translator?: User[]
}

export interface User {
  id: string
  family?: string
  given?: string
  suffix?: string
}
