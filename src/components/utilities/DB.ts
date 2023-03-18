import { v4 as uuid } from "uuid"
import {
  CitationCollection,
  CitationDocumentType,
  CitationStyle,
  CitationWithID,
  CollectionLabel,
  DBCitations,
} from "../../types"

const INITIAL_DOCUMENT: DBCitations = {
  journal: {},
  book: {},
  report: {},
  website: {},
}

export const getDBCitations = (format: CitationStyle): DBCitations => {
  const citations = localStorage.getItem(format)
  if (citations) {
    return JSON.parse(citations) as DBCitations
  }
  localStorage.setItem(format, JSON.stringify(INITIAL_DOCUMENT))
  return INITIAL_DOCUMENT
}

export const getDBCitationDocument = (
  dbCitation: DBCitations,
  citationID: string,
): CitationDocumentType | undefined => {
  let citationDocument = undefined

  Object.entries(dbCitation).find((obj) => {
    if (obj[1][citationID]) {
      citationDocument = obj[0]
      return obj
    } else return undefined
  })

  return citationDocument
}

export const storeCitation = (
  citation: CitationWithID,
  document: CitationDocumentType,
  format: CitationStyle,
): DBCitations => {
  const dbCitation = getDBCitations(format)

  if (!dbCitation[document][citation.id]) {
    const id = `Citation:${uuid()}`
    dbCitation[document][id] = { ...citation, id }
  } else {
    dbCitation[document][citation.id] = { ...citation }
  }

  localStorage.setItem(format, JSON.stringify(dbCitation))
  return dbCitation
}

export const deleteCitation = (
  citationID: string,
  document: CitationDocumentType,
  format: CitationStyle,
): DBCitations => {
  const dbCitation = getDBCitations(format)

  if (dbCitation[document][citationID]) {
    delete dbCitation[document][citationID]
  }

  localStorage.setItem(format, JSON.stringify(dbCitation))
  return dbCitation
}

export const getDBCollections = (style: CitationStyle): CitationCollection[] => {
  const citations = localStorage.getItem(`collections-${style}`)
  if (citations) {
    return Object.entries(JSON.parse(citations)).map((obj) => ({
      id: obj[0],
      // @ts-ignore
      ...obj[1],
    }))
  }
  localStorage.setItem(`collections-${style}`, JSON.stringify({}))
  return []
}

export const getDBLabels = (): CollectionLabel[] => {
  const labels = localStorage.getItem(`collections-label`)
  if (labels) {
    return JSON.parse(labels).labels
  }
  localStorage.setItem(`collections-label`, JSON.stringify({ labels: [] }))
  return []
}

export const storeDBCollection = (
  collection: CitationCollection,
  style: CitationStyle,
): CitationCollection[] => {
  const dbCollection = JSON.parse(
    localStorage.getItem(`collections-${style}`) || "{}",
  )

  if (dbCollection[collection.id]) {
    dbCollection[collection.id] = collection
    localStorage.setItem(`collections-${style}`, JSON.stringify(dbCollection))
  } else {
    const id = `Collection:${uuid()}`
    dbCollection[id] = { ...collection, id }
    localStorage.setItem(`collections-${style}`, JSON.stringify(dbCollection))
  }
  return getDBCollections(style)
}

export const storeDBLabel = (label: CollectionLabel): CollectionLabel[] => {
  const dbLabels = getDBLabels()

  const elementIndex = dbLabels.findIndex((l) => l.id === label.id)

  if (elementIndex !== -1) {
    dbLabels[elementIndex] = label
    localStorage.setItem(`collections-label`, JSON.stringify({ labels: dbLabels }))
  } else {
    const id = `Label:${uuid()}`
    dbLabels.push({ ...label, id })
    localStorage.setItem(`collections-label`, JSON.stringify({ labels: dbLabels }))
  }
  return dbLabels
}

export const deleteDBCollection = (
  collectionId: string,
  style: CitationStyle,
): CitationCollection[] => {
  const dbCollection = JSON.parse(
    localStorage.getItem(`collections-${style}`) || "{}",
  )

  if (dbCollection[collectionId]) {
    delete dbCollection[collectionId]
    localStorage.setItem(`collections-${style}`, JSON.stringify(dbCollection))
  }
  return getDBCollections(style)
}

export const deleteDBLabel = (
  labelId: string,
  style: CitationStyle,
): CollectionLabel[] => {
  const dbLabels = getDBLabels()

  const updatedLabel = dbLabels.filter((l) => l.id !== labelId)
  if (updatedLabel.length !== dbLabels.length) {
    localStorage.setItem(
      `collections-label`,
      JSON.stringify({ labels: updatedLabel }),
    )
    deleteDBCollectionsLabel(labelId, style)
    return updatedLabel
  }
  return dbLabels
}

type DBCollections = { [key in string]: CitationCollection }

const deleteDBCollectionsLabel = (labelId: string, style: CitationStyle) => {
  const collectionDB = localStorage.getItem(`collections-${style}`)
  if (collectionDB) {
    const updatedCollectionDB = JSON.parse(collectionDB) as DBCollections

    Object.entries(updatedCollectionDB).map((obj) => {
      const [id, collection] = obj
      updatedCollectionDB[id] = {
        ...collection,
        labelsId: collection.labelsId.filter((l) => l !== labelId),
      }
    })
    localStorage.setItem(`collections-${style}`, JSON.stringify(updatedCollectionDB))
  }
}
