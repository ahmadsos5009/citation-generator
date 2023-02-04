import {
  AuthorsEventPayload,
  Citation,
  CitationDocumentType,
  CitationJSDocumentType,
  Events,
} from "../../types"
import { documentFields, documentUser } from "../../cslTypes/fieldsMapping"
import { eliminatedFields } from "../CitationForm"
import { v4 as uuid } from "uuid"
import { User } from "../../cslTypes/type"
import { Users } from "../Inputs/Contributors"

export const clearCitationFields = (documentType: CitationDocumentType): void => {
  documentFields[CitationJSDocumentType[documentType]]
    .filter((field) => !eliminatedFields[documentType].includes(field))
    .map((field) => clearNode(document.getElementById(field)))

  const initialUser = { id: uuid() }
  const editEvent = new CustomEvent<{ payload: AuthorsEventPayload }>(
    Events.AUTHORS,
    {
      detail: {
        payload: {
          state: [{ ...initialUser, role: "author" }],
          store: { author: [initialUser] },
        },
      },
    },
  )
  document.getElementById("author-container")?.dispatchEvent(editEvent)

  clearNode(document.getElementById("issued-day"))
  clearNode(document.getElementById("issued-month"))
  clearNode(document.getElementById("issued-year"))

  clearNode(document.getElementById("link"))
}

const clearNode = (node: HTMLElement | null) => {
  if (node && (node as HTMLInputElement)) {
    ;(node as HTMLInputElement).value = ""
  }
}

export const fillCitationFields = (
  documentType: CitationDocumentType,
  citation: Citation,
): void => {
  documentFields[CitationJSDocumentType[documentType]].map((field) => {
    switch (field) {
      case "DOI":
      case "URL": {
        const linkInput = document.getElementById("link") as HTMLInputElement
        if (linkInput && linkInput.value) return
        // @ts-ignore
        updateNodeValue(linkInput, citation[field])
        break
      }
      case "issued": {
        if (documentType != CitationDocumentType.WEBSITE) {
          // @ts-ignore
          updateNodeValue(
            document.getElementById("issued-year"),
            citation[field]?.["date-parts"][0][0],
          )
        } else {
          updateNodeValue(
            document.getElementById("issued-year"),
            citation[field]?.["date-parts"][0][0],
          )
          updateNodeValue(
            document.getElementById("issued-month"),
            citation[field]?.["date-parts"][0][1],
          )
          updateNodeValue(
            document.getElementById("issued-day"),
            citation[field]?.["date-parts"][0][2],
          )
        }
        break
      }
      default: {
        // @ts-ignore
        updateNodeValue(document.getElementById(field), citation[field])
      }
    }
    if (field === "DOI" || field === "URL") {
      const linkInput = document.getElementById("link") as HTMLInputElement
      if (linkInput && linkInput.value) return
      // @ts-ignore
      updateNodeValue(document.getElementById("link"), citation[field])
    } else {
      // @ts-ignore
      updateNodeValue(document.getElementById(field), citation[field])
    }
  })

  const fromContainerEvent = new CustomEvent<{ payload: Citation }>(
    Events.CITATION,
    {
      detail: { payload: citation },
    },
  )
  document.getElementById("form-container")?.dispatchEvent(fromContainerEvent)

  let state: Users[] = []
  const store: { [key in string]: User[] } = {}
  documentUser[CitationJSDocumentType[documentType]].map((user) => {
    // @ts-ignore
    if (citation[user]) {
      // @ts-ignore
      state = [...state, ...citation[user].map((u: User) => ({ ...u, role: user }))]
      // @ts-ignore
      store[user] = citation[user]
    }
  })

  const editEvent = new CustomEvent<{
    payload: AuthorsEventPayload
  }>(Events.AUTHORS, {
    detail: { payload: { state, store } },
  })
  document.getElementById("author-container")?.dispatchEvent(editEvent)
}

const updateNodeValue = (node: HTMLElement | null, value?: string): void => {
  if (node && (node as HTMLInputElement) && value) {
    ;(node as HTMLInputElement).value = value
  }
}
