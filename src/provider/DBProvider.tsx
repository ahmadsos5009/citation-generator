import React, { Dispatch, Reducer, useEffect, useReducer, useState } from "react"
import {
  CitationStyle,
  DBCitations,
  CitationDocumentType,
  CitationWithID,
} from "../types"
import {
  deleteCitation,
  getDBCitationDocument,
  getDBCitations,
  storeCitation,
} from "../components/utilities/DB"
import {
  clearCitationFields,
  fillCitationFields,
} from "../components/utilities/html_fields"

type DBState = { value: DBCitations; format: CitationStyle; event?: CustomEvent }

export const DBContext = React.createContext<{
  state: DBState
  dispatch: Dispatch<IDBAction>
  format: CitationStyle
  citationDocument: CitationDocumentType
  showCitationsList: boolean | undefined
  setShowCitationsList: Dispatch<React.SetStateAction<boolean | undefined>>
}>({
  // @ts-ignore
  state: { value: {}, format: undefined },
  dispatch: () => {
    console.error("Unmounted")
  },
})

interface IDBAction {
  type: "save" | "delete" | "edit" | "initialize"
  citationDocument?: CitationDocumentType
  citation?: CitationWithID
  citationID?: string
  dbCitations?: DBCitations
  setDocumentType?: React.Dispatch<React.SetStateAction<CitationDocumentType>>
}

const reducer = (state: DBState, action: IDBAction): DBState => {
  const {
    type,
    citation,
    citationID,
    dbCitations,
    citationDocument,
    setDocumentType,
  } = action
  switch (type) {
    case "save":
      if (!citationDocument || !citation) return state
      return {
        ...state,
        value: storeCitation(citation, citationDocument, state.format),
      }
    case "delete": {
      if (!citationID) return state
      const citationDocument = getDBCitationDocument(
        getDBCitations(state.format),
        citationID,
      )

      if (!setDocumentType || !citationDocument) return state
      return {
        ...state,
        value: deleteCitation(citationID, citationDocument, state.format),
      }
    }
    case "edit": {
      if (!citationID) return state
      const dbCitation = getDBCitations(state.format)
      const citationDocument = getDBCitationDocument(dbCitation, citationID)

      if (
        setDocumentType &&
        citationDocument &&
        dbCitation[citationDocument][citationID]
      ) {
        setDocumentType(citationDocument)
        setTimeout(() => {
          clearCitationFields(citationDocument)
          fillCitationFields(
            citationDocument,
            dbCitation[citationDocument][citationID],
          )
        }, 150)
      }
      return state
    }
    case "initialize":
      if (!dbCitations) return state
      return { ...state, value: dbCitations }
    default:
      throw new Error()
  }
}

export const DBProvider: React.FC<{
  format: CitationStyle
  citationDocument: CitationDocumentType
}> = ({ format, children, citationDocument }) => {
  const [showCitationsList, setShowCitationsList] = useState<boolean | undefined>(
    true,
  )

  const [state, dispatch] = useReducer<Reducer<DBState, IDBAction>>(reducer, {
    value: {
      book: {},
      journal: {},
      report: {},
      website: {},
    },
    format,
  })

  useEffect(() => {
    const dbCitations = getDBCitations(format)
    dispatch({ type: "initialize", citationDocument, dbCitations })
  }, [])

  return (
    <DBContext.Provider
      value={{
        citationDocument,
        showCitationsList,
        setShowCitationsList,
        state,
        dispatch,
        format,
      }}
    >
      {children}
    </DBContext.Provider>
  )
}
