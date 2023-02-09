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
            body
            frontmatter {
              path
              title
            }
            id
          }
        }
      }
    }
  `)

  // eslint-disable-next-line array-callback-return
  return data.allMdx.edges.map((edge) => {
    const { path, title } = edge.node.frontmatter
    const { id, body } = edge.node

    actions.createPage({
      path,
      component: require.resolve("./src/components/pages/Generator.tsx"),
      context: { id, title, style: path, xml: body },
    })
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
      },
    },
    node: {
      fs: "empty",
    },
  })
}
