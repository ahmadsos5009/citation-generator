import React, { useCallback, useContext } from "react"

import generateStrategy from "../utilities/generat-citation-strategy"

import { GeneratorContext } from "../../provider/GeneratorProvider"

type ClipboardProps = {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  handleClose: (
    event?: Event | React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined,
  ) => void
  showAlert: boolean
}

export default (): ClipboardProps => {
  const [showAlert, setShowAlert] = React.useState(false)
  const { documentType, citation, style, xml, copyOption } =
    useContext(GeneratorContext)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!citation) {
        return
      }

      const target = (event.currentTarget as HTMLButtonElement).value

      let clipboardText = ""
      const { convertedCitation, inText } = generateStrategy(
        citation,
        documentType,
        style,
        xml,
        copyOption,
      )

      if (target === "citation") {
        clipboardText = convertedCitation
      }
      if (target === "in-text") {
        clipboardText = inText || ""
      }

      (async () => {
        await navigator.clipboard.writeText(clipboardText)
      })()

      setShowAlert(true)
    },
    [citation, style, documentType],
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
