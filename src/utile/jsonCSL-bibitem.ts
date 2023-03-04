import { User } from "../cslTypes/type"

import { TCitation } from "../db/types"

const capitalize = (input: string) => input.charAt(0).toUpperCase() + input.slice(1)

/**
 * Convert CSL citations to a latex bibitem
 */
export default (citations: TCitation[]) => {
  let bibitem = ""

  const getAuthors = (authors: User[]) =>
    authors.map((author) => {
      const { family, given } = author
      if (family && given) {
        return `${capitalize(family)}, ${given.charAt(0).toUpperCase()}.`
      }
      return given ? capitalize(given) : (family && capitalize(family)) || ""
    })

  citations.map((citation) => {
    const { id, title, author, issued } = citation

    bibitem += `\\bibitem{${id}}`

    const authors = getAuthors(author || [])
    if (authors.length === 1) {
      bibitem += `${authors[0]} ${title}. `
    } else {
      bibitem +=
        authors.slice(0, -1).join(", ") +
        " \\& " +
        authors.slice(-1)[0] +
        ` ${title}. `
    }

    const journal = citation["container-title"]
    if (journal) {
      const { volume, page, issue } = citation

      bibitem += `{\\em ${journal
        .split(" ")
        .map((_) => capitalize(_))
        .join(" ")}}.`

      if (volume) {
        bibitem += ` \\textbf{${volume}}`
      }
      if (page) {
        bibitem += issue ? `, ${page}` : ` pp. ${page}`
      }
      if (issued && issued["date-parts"] && issued["date-parts"].length > 0) {
        bibitem += ` (${issued["date-parts"].toString()})`
      }
    }

    // @ts-ignore
    const publisher = citation["publisher"]
    if (!journal && publisher) {
      bibitem +=
        (issued &&
          issued["date-parts"] &&
          `(${publisher},${issued["date-parts"].toString()})`) ||
        `(${publisher})`
    }

    if (
      issued &&
      issued["date-parts"] &&
      issued["date-parts"].length > 0 &&
      !publisher &&
      !journal
    ) {
      bibitem += ` (${issued["date-parts"].toString()})`
    }

    const url = citation["URL"]
    if (url && url !== publisher) {
      bibitem += `, ${url}`
    }

    const note = citation["note"]
    if (note) {
      bibitem += `, ${note}`
    }
    bibitem += "\n"
  })
  return bibitem
}
