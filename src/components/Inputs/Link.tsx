import React, { useCallback, useContext, useState } from "react"
import {
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { StoreContext } from "../../provider/Store"
import { CitationDocumentType } from "../../types"

const LinkInput: React.FC<{ documentType: CitationDocumentType }> = ({
  documentType,
}) => {
  const [link, setLink] = useState("DOI")

  const { dispatch, state } = useContext(StoreContext)

  const onLinkChange = useCallback(
    (e) => {
      const value = e.target.value
      if (value === link) {
        return
      }

      const oppositeLink = (value === "DOI" && "URL") || "DOI"

      dispatch({
        type: "set",
        id: value,
        documentType,
        // @ts-ignore
        value: state[documentType][oppositeLink],
      })

      dispatch({
        type: "set",
        id: oppositeLink,
        documentType,
        value: undefined,
      })

      setLink(e.target.value)
    },
    [setLink, dispatch, link, state[documentType]],
  )

  const handleChange = useCallback(
    (e) => {
      dispatch({
        type: "set",
        id: link,
        documentType,
        value: e.target.value,
      })

      dispatch({
        type: "set",
        id: (link === "DOI" && "URL") || "DOI",
        documentType,
        value: undefined,
      })
    },
    [dispatch],
  )

  return (
    <Stack margin="8px">
      <FormLabel>Link</FormLabel>
      <ToggleButtonGroup
        color="primary"
        value={link}
        exclusive
        onChange={onLinkChange}
      >
        <ToggleButton value="DOI">DOI</ToggleButton>
        <ToggleButton value="URL">URL</ToggleButton>
      </ToggleButtonGroup>
      <FormControl variant="standard" sx={{ margin: "0 12px" }}>
        <InputLabel focused={false} shrink>
          DOI / URL
        </InputLabel>
        <Input id="link" onChange={handleChange} />
      </FormControl>
    </Stack>
  )
}

export default LinkInput
