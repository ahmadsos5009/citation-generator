export interface NoteCitation {
  title?: string
  accessed?: { "date-parts": string[] }
  URL?: string
  abstract?: string
  publisher?: string
  issued?: { "date-parts": string[] }
  language?: string
  shortTitle?: string
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

export interface MagazineArticleCitation {
  title?: string
  abstract?: string
  "container-title"?: string
  volume?: string | number
  issue?: string | number
  issued?: { "date-parts": string[] }
  page?: string | number
  language?: string
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
  "reviewed-author"?: User[]
  translator?: User[]
}

export interface NewspaperArticleCitation {
  title?: string
  abstract?: string
  "container-title"?: string
  "publisher-place"?: string
  edition?: string | number
  issued?: { "date-parts": string[] }
  section?: string
  page?: string | number
  language?: string
  shortTitle?: string
  ISSN?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  archive?: string
  archive_location?: string
  source?: string
  "call-number"?: string
  note?: string
  author?: User[]
  contributor?: User[]
  "reviewed-author"?: User[]
  translator?: User[]
}

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

export interface BillCitation {
  title?: string
  abstract?: string
  "container-title"?: string
  section?: string
  authority?: string
  "chapter-number"?: string | number
  references?: string
  issued?: { "date-parts": string[] }
  language?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  shortTitle?: string
  note?: string
  contributor?: User[]
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

export interface BookSectionCitation {
  title?: string
  abstract?: string
  "collection-title"?: string
  "collection-number"?: string | number
  volume?: string | number
  "number-of-volumes"?: string | number
  edition?: string | number
  "publisher-place"?: string
  issued?: { "date-parts": string[] }
  page?: string | number
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
  "container-author"?: User[]
  contributor?: User[]
  editor?: User[]
  "collection-editor"?: User[]
  translator?: User[]
}

export interface DictionaryEntryCitation {
  title?: string
  abstract?: string
  "collection-title"?: string
  "collection-number"?: string | number
  volume?: string | number
  "number-of-volumes"?: string | number
  edition?: string | number
  "publisher-place"?: string
  issued?: { "date-parts": string[] }
  page?: string | number
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

export interface EncyclopediaArticleCitation {
  title?: string
  abstract?: string
  "collection-title"?: string
  "collection-number"?: string | number
  volume?: string | number
  "number-of-volumes"?: string | number
  edition?: string | number
  "publisher-place"?: string
  issued?: { "date-parts": string[] }
  page?: string | number
  ISBN?: string
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  language?: string
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

export interface ArtworkCitation {
  title?: string
  abstract?: string
  dimensions?: string
  issued?: { "date-parts": string[] }
  language?: string
  shortTitle?: string
  archive?: string
  archive_location?: string
  source?: string
  "call-number"?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  note?: string
  contributor?: User[]
}

export interface StatuteCitation {
  abstract?: string
  "container-title"?: string
  volume?: string | number
  page?: string | number
  section?: string
  "chapter-number"?: string | number
  references?: string
  language?: string
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  note?: string
  author?: User[]
  contributor?: User[]
}

export interface CaseCitation {
  abstract?: string
  "container-title"?: string
  authority?: string
  references?: string
  language?: string
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  note?: string
  author?: User[]
  contributor?: User[]
}

export interface ManuscriptCitation {
  title?: string
  abstract?: string
  "publisher-place"?: string
  issued?: { "date-parts": string[] }
  "number-of-pages"?: string | number
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
  translator?: User[]
}

export interface MapCitation {
  title?: string
  abstract?: string
  scale?: string
  "collection-title"?: string
  edition?: string | number
  "publisher-place"?: string
  issued?: { "date-parts": string[] }
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
  contributor?: User[]
  "collection-editor"?: User[]
}

export interface ConferencePaperCitation {
  title?: string
  abstract?: string
  issued?: { "date-parts": string[] }
  event?: string
  "publisher-place"?: string
  volume?: string | number
  page?: string | number
  "collection-title"?: string
  language?: string
  DOI?: string
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

export interface PatentCitation {
  title?: string
  abstract?: string
  "publisher-place"?: string
  authority?: string
  submitted?: { "date-parts": string[] }
  page?: string | number
  "call-number"?: string
  issue?: string | number
  references?: string
  status?: string
  language?: string
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  note?: string
  contributor?: User[]
}

export interface ForumPostCitation {
  title?: string
  abstract?: string
  issued?: { "date-parts": string[] }
  language?: string
  shortTitle?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  note?: string
  author?: User[]
  contributor?: User[]
}

export interface BlogPostCitation {
  title?: string
  abstract?: string
  issued?: { "date-parts": string[] }
  URL?: string
  accessed?: { "date-parts": string[] }
  language?: string
  shortTitle?: string
  note?: string
  author?: User[]
  contributor?: User[]
}

export interface LetterCitation {
  title?: string
  abstract?: string
  issued?: { "date-parts": string[] }
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
  recipient?: User[]
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

export interface PresentationCitation {
  title?: string
  abstract?: string
  issued?: { "date-parts": string[] }
  "publisher-place"?: string
  event?: string
  URL?: string
  accessed?: { "date-parts": string[] }
  language?: string
  shortTitle?: string
  note?: string
  contributor?: User[]
}

export interface ThesisCitation {
  title?: string
  abstract?: string
  "publisher-place"?: string
  issued?: { "date-parts": string[] }
  "number-of-pages"?: string | number
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
}

export interface WebpageCitation {
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
