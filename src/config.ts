import { CitationDocumentType } from "./types"

interface Config {
  DB_VERSION: number
  DB_NAME: string
  DOMAIN: string
  IS_DEVELOPMENT: boolean
  SERVICES_PAGES: { name: string; href: string; disabled?: boolean }[]
  SOCIAL: {
    twitter: {
      url: string
      text: string
      hashtags: string
    }
    reddit: {
      url: string
      title: string
      text: string
    }
  }
  DOCUMENT_TYPES: CitationDocumentType[]
}

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"

export default <Config>{
  DB_VERSION: 2,
  DB_NAME: "CitationGenerator",
  DOMAIN: IS_DEVELOPMENT ? "http://localhost:8000" : "https://citation-creator.com",
  IS_DEVELOPMENT,
  SERVICES_PAGES: [
    { name: "List Generator", href: "/citationsList/" },
    { name: "Manage References", href: "/referencesManager/" },
    {
      name: "Annotated Bibliography",
      href: "/annotated_bibliography/",
      disabled: true,
    },
    { name: "Style Guide", href: "guide" },
    {
      name: "Citation Examples",
      href: "/examples/",
    },
  ],
  SOCIAL: {
    twitter: {
      url: "https://twitter.com/intent/tweet",
      text: "free citation generator",
      hashtags: "citation,Harvard,APA,AMA,Chicago,ACS,IEEE,bibliography,References",
    },
    reddit: {
      url: "https://www.reddit.com/submit",
      title: "Citation Generator",
      text: "free citation generator and you could create a bibliography and export it as PDF Word or BibTex.",
    },
  },
  DOCUMENT_TYPES: ["journal", "book", "website", "report"],
}
