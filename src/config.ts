interface Config {
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
}

export default <Config>{
  SERVICES_PAGES: [
    { name: "List Generator", href: "/citationsList/" },
    { name: "Manage References", href: "/referencesManager/" },
    {
      name: "Annotated Bibliography",
      href: "/annotated_bibliography/",
      disabled: true,
    },
    { name: "Style Guide", disabled: true },
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
}
