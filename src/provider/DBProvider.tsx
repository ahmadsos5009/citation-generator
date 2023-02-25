import React from "react"

import { CSLDao } from "../db/CSL"
import { CitationDao } from "../db/Citation"
import { DBSchema } from "../db/types"
import useIndexedDb from "../db/use-indexed-db"
import { ProjectDao } from "../db/Project"

export interface DBManger {
  cslDao: CSLDao
  citationDao: CitationDao
  projectDao: ProjectDao
}

const initSchema = {} as DBSchema

export const DBContext = React.createContext<DBManger>({
  cslDao: new CSLDao(initSchema),
  citationDao: new CitationDao(initSchema),
  projectDao: new ProjectDao(initSchema),
})

export const DBProvider: React.FC = ({ children }) => {
  const dbManger = useIndexedDb()

  return <DBContext.Provider value={{ ...dbManger }}>{children}</DBContext.Provider>
}
