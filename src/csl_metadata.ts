import { CitationStyle } from "./types"

export const POPULAR_CSL_METADATA = {
  apa: {
    id: "APA",
    style_title: "American Psychological Association",
    field: "psychology",
  },
  ieee: {
    id: "IEEE",
    style_title: "Institute of Electrical and Electronics Engineers",
    field: "engineering",
  },
  nlm: {
    id: "NLM",
    style_title: "National Library of Medicine",
    field: "medicine",
  },
  rsc: {
    id: "RSC",
    style_title: "Royal Society of Chemistry",
    field: "chemistry",
  },
  acs: {
    id: "ACS",
    style_title: "American Chemical Society",
    field: "chemistry",
  },
  acm: {
    id: "ACM",
    style_title: "Association for Computing Machinery",
    field: "engineering",
  },
}

export const CSL_METADATA: {
  [key in CitationStyle]: {
    id: string
    style_title: string
    field: string
  }
} = {
  ...POPULAR_CSL_METADATA,
  cse: {
    id: "CSE",
    style_title: "Council of Science Editors",
    field: "science",
  },
  mla_7th: {
    id: "MLA_7th",
    style_title: "Modern Language Association 7th edition",
    field: "language and literature",
  },
  mla_8th: {
    id: "MLA_8th",
    style_title: "Modern Language Association 8th edition",
    field: "language and literature",
  },
  mla: {
    id: "MLA",
    style_title: "Modern Language Association",
    field: "language and literature",
  },
  mhra: {
    id: "MHRA",
    style_title: "Modern Humanities Research Association",
    field: "generic",
  },
  turabian: {
    id: "TURABIAN",
    style_title: "Turabian",
    field: "history",
  },
  turabian_9th: {
    id: "TURABIAN_9th",
    style_title: "Turabian 9th edition (author-date)",
    field: "history",
  },
  harvard: {
    id: "HARVARD",
    style_title: "Harvard",
    field: "generic",
  },
  nature: {
    id: "NATURE",
    style_title: "Nature",
    field: "science",
  },
  vancouver: {
    id: "VANCOUVER",
    style_title: "Vancouver",
    field: "medicine",
  },
  oscola: {
    id: "OSCOLA",
    style_title: "Oxford University Standard for Citation of Legal Authorities",
    field: "law",
  },
  ecology: {
    id: "ECOLOGY",
    style_title: "Ecology",
    field: "biology",
  },
  chicago: {
    id: "CHICAGO",
    style_title: "Chicago",
    field: "generic",
  },
  asa: {
    id: "ASA",
    style_title: "American Sociological Association",
    field: "sociology",
  },
  ama: {
    id: "AMA",
    style_title: "American Medical Association",
    field: "medicine",
  },
  apa_5th: {
    id: "APA_5th",
    style_title: "American Psychological Association",
    field: "psychology",
  },
  apa_7th: {
    id: "APA_7th",
    style_title: "American Psychological Association",
    field: "psychology",
  },
}
