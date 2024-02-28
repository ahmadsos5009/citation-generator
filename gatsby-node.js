/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// eslint-disable-next-line func-names
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMdx {
        edges {
          node {
            internal {
              contentFilePath
            }
            body
            frontmatter {
              path
              title
              metaTitle
              description
              slug
              note
              documents
              documentsLink
            }
            id
          }
        }
      }
    }
  `)

  actions.createRedirect({
    fromPath: `/`,
    toPath: `https://citation-generator.pages.dev/`,
    statusCode: 301,
    force: true,
    redirectInBrowser: true,
  })
  actions.createRedirect({
    fromPath: `/about/`,
    toPath: `https://citation-generator.pages.dev/about/`,
    statusCode: 301,
    force: true,
    redirectInBrowser: true,
  })
  actions.createRedirect({
    fromPath: `/citationList/`,
    toPath: `https://citation-generator.pages.dev/citationList/`,
    statusCode: 301,
    force: true,
    redirectInBrowser: true,
  })
  actions.createRedirect({
    fromPath: `/examples/`,
    toPath: `https://citation-generator.pages.dev/examples/`,
    statusCode: 301,
    force: true,
    redirectInBrowser: true,
  })
  actions.createRedirect({
    fromPath: `/referencesManager/`,
    toPath: `https://citation-generator.pages.dev/referencesManager/`,
    statusCode: 301,
    force: true,
    redirectInBrowser: true,
  })
  actions.createRedirect({
    fromPath: `/privacy/`,
    toPath: `https://citation-generator.pages.dev/privacy/`,
    statusCode: 301,
    force: true,
    redirectInBrowser: true,
  })
  actions.createRedirect({
    fromPath: `/terms/`,
    toPath: `https://citation-generator.pages.dev/privacy/`,
    statusCode: 301,
    force: true,
    redirectInBrowser: true,
  })
  actions.createRedirect({
    fromPath: `/contact/`,
    toPath: `https://citation-generator.pages.dev/contact/`,
    statusCode: 301,
    force: true,
    redirectInBrowser: true,
  })

  // eslint-disable-next-line array-callback-return
  return data.allMdx.edges.map((edge) => {
    const {
      path,
      title,
      metaTitle,
      description,
      slug,
      note,
      documents,
      documentsLink,
    } = edge.node.frontmatter
    const { id, body } = edge.node

    /** Citation Generator Pages */
    if (path) {
      const pagePath = note ? path.replace("/annotation/", "") : path

      // actions.createPage({
      //   path,
      //   component: require.resolve("./src/components/pages/Generator.tsx"),
      //   context: { id, title, metaTitle, style: pagePath, xml: body, note },
      // })
      actions.createRedirect({
        fromPath: `/${path}/`,
        toPath: `https://citation-generator.pages.dev/${path}/`,
        statusCode: 301,
        force: true,
        redirectInBrowser: true,
      })
    }

    /** Citation Style Guide Pages */
    if (slug) {
      const guideTemplate = require.resolve("./src/components/pages/Guide.tsx")
      // actions.createPage({
      //   path: slug,
      //   component: `${guideTemplate}?__contentFilePath=${edge.node.internal.contentFilePath}`,
      //   context: {
      //     id,
      //     title,
      //     description,
      //     body,
      //     documents,
      //     documentsLink,
      //   },
      // })
      actions.createRedirect({
        fromPath: `/${slug}/`,
        toPath: `https://citation-generator.pages.dev/${slug}/`,
        statusCode: 301,
        force: true,
        redirectInBrowser: true,
      })
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        process: "process",
      }),
    ],
    resolve: {
      fallback: {
        util: false,
        crypto: false,
        path: false,
        fs: false,
        assert: false,
        url: require.resolve("url/"),
        stream: require.resolve("stream-browserify"),
        http: false,
        https: false,
        zlib: false,
      },
    },
    node: {
      fs: "empty",
    },
  })
}
