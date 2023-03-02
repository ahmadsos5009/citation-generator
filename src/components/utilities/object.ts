import { Citation, DocumentType } from "../../types"

import { documentUser } from "../../cslTypes/fieldsMapping"
import { User } from "../../cslTypes/type"

export const isEmptyCitation = (
  citation: Citation,
  document: DocumentType,
): boolean => {
  return Object.entries(citation).every(([filed, value]) => {
    if (Array.isArray(value)) {
      if (documentUser[document].includes(filed) && !emptyContributors(value)) {
        return false
      }
    } else {
      if (value !== undefined && value.length > 0) return false
    }

    return true
  })
}

const emptyContributors = (contributors: User[]) => {
  return contributors.every(
    (contributor) => !contributor.family && !contributor.given,
  )
}

export const getEmptyCitation = (citation: Citation, document: DocumentType) => {
  const emptyCitation = {} as Citation
  Object.entries(citation).map(([filed]) => {
    if (documentUser[document].includes(filed)) {
      // @ts-ignore
      emptyCitation[filed] = []
    } else if (filed === "issued" || filed === "accessed") {
      // @ts-ignore
      emptyCitation[filed] = {}
    } else {
      // @ts-ignore
      emptyCitation[filed] = ""
    }
  })
  return emptyCitation
}
