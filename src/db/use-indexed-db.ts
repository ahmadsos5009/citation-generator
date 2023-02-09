import { useRef } from "react"
import DexieDB from "dexie"
import config from "../config"
import { DBSchema, schema } from "./types"
import { CSLDao } from "./CSL"
import { CitationDao } from "./Citation"

export default function useIndexedDb() {
  const dbRef = useRef<DBSchema>(
    // @ts-ignore
    new DexieDB(config.DB_NAME).version(config.DB_VERSION).stores(schema).db,
  ).current

  const cslDao = new CSLDao(dbRef)
  const citationDao = new CitationDao(dbRef)

  return {
    cslDao,
    citationDao,
  }
}
