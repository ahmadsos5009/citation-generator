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
        context: {
          id,
          title,
          metaTitle,
          style: pagePath,
          xml: body,
          note,
          slug: path,
        },
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
          slug,
        },
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
