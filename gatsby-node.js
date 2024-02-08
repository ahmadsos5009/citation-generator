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

      actions.createPage({
        path,
        component: require.resolve("./src/components/pages/Generator.tsx"),
        context: { id, title, metaTitle, style: pagePath, xml: body, note },
      })
    }

    /** Citation Style Guide Pages */
    if (slug) {
      const guideTemplate = require.resolve("./src/components/pages/Guide.tsx")
      actions.createPage({
        path: slug,
        component: `${guideTemplate}?__contentFilePath=${edge.node.internal.contentFilePath}`,
        context: {
          id,
          title,
          description,
          body,
          documents,
          documentsLink,
        },
      })
    }
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        util: false,
        crypto: false,
        path: false,
        fs: false,
        assert: false,
        url: require.resolve("url/"),
        encoding: require.resolve("encoding/"),
        stream: require.resolve("stream-browserify"),
        http: false,
        https: false,
        zlib: false,
        punycode: false,
        events: false,
        buffer: false,
        string_decoder: false,
      },
    },
  })
}
