import React, { Dispatch, Reducer, useReducer, useState } from "react"
import { CitationCollection, CitationStyle, CollectionLabel } from "../types"
import {
  deleteDBCollection,
  deleteDBLabel,
  getDBCollections,
  storeDBCollection,
  storeDBLabel,
} from "../components/utilities/DB"

type DBState = {
  collections: CitationCollection[]
  labels: CollectionLabel[]
  format: CitationStyle
}

type IDBAction = {
  type: "save" | "delete" | "initialize"
  dataType: "collection" | "label" | "both"
  collection?: CitationCollection
  label?: CollectionLabel
  collectionId?: string
  labelsId?: string
  collections?: CitationCollection[]
  labels?: CollectionLabel[]
}

export const CollectionContext = React.createContext<{
  state: DBState
  dispatch: Dispatch<IDBAction>
  selectedCollection: string
  setSelectedCollection: React.Dispatch<React.SetStateAction<string>>
  selectedLabels: string[]
  setSelectedLabels: React.Dispatch<React.SetStateAction<string[]>>
}>({
  selectedCollection: "all",
  selectedLabels: [],
  state: { collections: [], labels: [], format: "apa" },
  dispatch: () => {
    console.error("Unmounted")
  },
  setSelectedCollection: () => {
    console.error("Unmounted")
  },
  setSelectedLabels: () => {
    console.error("Unmounted")
  },
})

const reducer = (state: DBState, action: IDBAction): DBState => {
  const {
    type,
    dataType,
    collection,
    label,
    collections,
    labels,
    collectionId,
    labelsId,
  } = action

  switch (type) {
    case "save": {
      if (dataType === "collection" && collection) {
        return { ...state, collections: storeDBCollection(collection, state.format) }
      } else if (dataType === "label" && label) {
        return { ...state, labels: storeDBLabel(label) }
      }
      return state
    }
    case "delete": {
      if (dataType === "collection" && collectionId) {
        return {
          ...state,
          collections: deleteDBCollection(collectionId, state.format),
        }
      } else if (dataType === "label" && labelsId) {
        const labels = deleteDBLabel(labelsId, state.format)
        return {
          ...state,
          labels,
          collections: getDBCollections(state.format),
        }
      }
      return state
    }
    case "initialize": {
      if (!(collections && labels)) return state
      return { ...state, collections, labels }
    }
    default:
      throw new Error()
  }
}
// TODO:: remove this
export const CollectionProvider: React.FC = ({ children }) => {
  const [selectedCollection, setSelectedCollection] = useState("all")
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const [state, dispatch] = useReducer<Reducer<DBState, IDBAction>>(reducer, {
    collections: [],
    labels: [],
    format: "apa",
  })

  return (
    <CollectionContext.Provider
      value={{
        selectedCollection,
        setSelectedCollection,
        selectedLabels,
        setSelectedLabels,
        state,
        dispatch,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}
