import * as Types from "./cslTypes/type"

export type DocumentType =
  | "article"
  | "article-magazine"
  | "article-newspaper"
  | "article-journal"
  | "bill"
  | "book"
  | "chapter"
  | "entry-dictionary"
  | "entry-encyclopedia"
  | "graphic"
  | "legislation"
  | "legal_case"
  | "manuscript"
  | "map"
  | "paper-conference"
  | "patent"
  | "post"
  | "post-weblog"
  | "personal_communication"
  | "report"
  | "speech"
  | "thesis"
  | "webpage"

export const DocumentLabel: { [k in DocumentType]: string } = {
  article: "Note",
  "article-magazine": "Magazine Article",
  "article-newspaper": "Newspaper Article",
  "article-journal": "Journal Article",
  bill: "Bill",
  book: "Book",
  chapter: "BookSection",
  "entry-dictionary": "Dictionary Entry",
  "entry-encyclopedia": "Encyclopedia Article",
  graphic: "Artwork",
  legislation: "Statute",
  legal_case: "Case",
  manuscript: "Manuscript",
  map: "Map",
  "paper-conference": "Conference Paper",
  patent: "Patent",
  post: "ForumPost",
  "post-weblog": "BlogPost",
  personal_communication: "Letter",
  report: "Report",
  speech: "Presentation",
  thesis: "Thesis",
  webpage: "Webpage",
}

export type CitationStyle =
  | "apa"
  | "cse"
  | "ieee"
  | "mla"
  | "mla_7th"
  | "mla_8th"
  | "mhra"
  | "chicago"
  | "harvard"
  | "ama"
  | "asa"
  | "acm"
  | "nature"
  | "turabian_9th"
  | "turabian"
  | "vancouver"
  | "oscola"
  | "nlm"
  | "ecology"
  | "acs"
  | "apa_5th"
  | "apa_7th"
  | "rsc"
  | "agu"
  | "aip"
  | "apsa"
  | "asce"
  | "asme"
  | "bmj"

export type CitationNoteStyle = "apa_7th" | "mla_8th" | "chicago"

export type Citation =
  | Types.NoteCitation
  | Types.MagazineArticleCitation
  | Types.NewspaperArticleCitation
  | Types.JournalArticleCitation
  | Types.BillCitation
  | Types.BookCitation
  | Types.BookSectionCitation
  | Types.DictionaryEntryCitation
  | Types.EncyclopediaArticleCitation
  | Types.ArtworkCitation
  | Types.StatuteCitation
  | Types.CaseCitation
  | Types.ManuscriptCitation
  | Types.MapCitation
  | Types.ConferencePaperCitation
  | Types.PatentCitation
  | Types.ForumPostCitation
  | Types.BlogPostCitation
  | Types.LetterCitation
  | Types.ReportCitation
  | Types.PresentationCitation
  | Types.ThesisCitation
  | Types.WebpageCitation

export type CitationWithID = Citation & { id: string }

export interface Author {
  id: string
  given?: string
  family?: string
}

export interface CitationOutput {
  html: string
  inText: string
}

export type CitationCollection = {
  id: string
  title: string
  labelsId: string[]
  format: CitationStyle
  citationsId: string[]
}

export type LabelHex =
  | "secondary"
  | "default"
  | "success"
  | "warning"
  | "error"
  | "primary"
  | "info"

export type CollectionLabel = {
  id: string
  label: string
  labelHex: LabelHex
}
