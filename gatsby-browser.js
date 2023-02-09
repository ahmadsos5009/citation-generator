/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"
import { DBProvider } from "./src/provider/DBProvider"

// eslint-disable-next-line react/react-in-jsx-scope
export const wrapRootElement = ({ element }) => <DBProvider>{element}</DBProvider>
