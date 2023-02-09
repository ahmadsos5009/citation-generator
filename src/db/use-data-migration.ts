import { useEffect } from "react"
import { CSL_METADATA } from "../csl_metadata"
import { CitationJSDocumentType } from "../types"
import { v4 as uuid } from "uuid"
import { CitationDao } from "./Citation"
import { TCitation } from "./types"

/**
 * migrate citations from localstorage to Indexed-db
 * @param citationDao
 */
export default (citationDao: CitationDao) => {
  useEffect(() => {
    const citations = [] as TCitation[]
    Object.values(CSL_METADATA).map(({ id }) => {
      const data = localStorage.getItem(id.toLowerCase())
      if (data) {
        const documentCitations = JSON.parse(data)
        Object.entries(documentCitations).map(([filed, value]) =>
          // @ts-ignore
          Object.values(value).map((citation) => {
            // @ts-ignore
            // eslint-disable-next-line no-underscore-dangle
            if (citation._graph) delete citation._graph
            citations.push({
              // @ts-ignore
              type: CitationJSDocumentType[filed],
              // @ts-ignore
              ...citation,
              id: uuid(),
              updatedTimestamp: Date.now(),
            })
          }),
        )
        localStorage.removeItem(id.toLowerCase())
      }
    })
    citationDao.bulkAdd(citations)
  }, [citationDao])
}
