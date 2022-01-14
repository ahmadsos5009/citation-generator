import React, { useCallback } from "react"
import { Citation } from "../../types"
import { generateCitation } from "../utilities/citation_generator"

type ClipboardProps = {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  handleClose: (
    event?: Event | React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined,
  ) => void
  showAlert: boolean
}

export default (citation: Citation, documentType: string): ClipboardProps => {
  const [showAlert, setShowAlert] = React.useState(false)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!citation) {
        return
      }

      const target = (event.currentTarget as HTMLButtonElement).value

      let clipboardText = ""
      const { convertedCitation, inText } = generateCitation(
        citation,
        documentType,
        "text",
      )

      if (target === "citation") {
        clipboardText = convertedCitation
      }
      if (target === "in-text") {
        clipboardText = inText
      }

      (async () => {
        await navigator.clipboard.writeText(clipboardText)
      })()

      setShowAlert(true)
    },
    [citation],
  )

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return
      }
      setShowAlert(false)
    },
    [],
  )

  return { handleClick, handleClose, showAlert }
}
