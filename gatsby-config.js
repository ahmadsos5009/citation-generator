module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: "Citation Generator",
    description: "Create Citation based on Csl_code styles",
    author: "Ahmad Souqi",
    siteUrl: process.env.APP_URL,
  },
  plugins: [
    "gatsby-plugin-cname",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: [
          "/referencesManager",
          "/citationPreview",
          "/cslMetaData/",
          "/cslList",
          "/help",
          "/about",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://citation-creator.com",
        sitemap: "https://citation-creator.com/sitemap/sitemap-0.xml",
        policy: [
          { userAgent: "*", disallow: ["/referencesManager"] },
          { userAgent: "*", disallow: ["/citationPreview"] },
          { userAgent: "*", disallow: ["/cslMetaData"] },
          { userAgent: "*", disallow: ["/cslList"] },
          { userAgent: "*", disallow: ["/help"] },
          { userAgent: "*", disallow: ["/about"] },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "citation-generator",
        short_name: "cg",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-QCGFXVP49H"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/mdx`,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["300", "400", "500"],
            },
            {
              family: "Open Sans Condensed",
              variants: ["300", "700"],
            },
          ],
        },
      },
    },
    "gatsby-theme-material-ui",
    "gatsby-plugin-mdx",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-typescript",
    "eslint-config-airbnb",
    "gatsby-plugin-styled-components",
  ],
}
