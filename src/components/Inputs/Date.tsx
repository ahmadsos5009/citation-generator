import React, { useCallback, useContext } from "react"

import { Container, FormControl, FormLabel, Input, InputLabel } from "@mui/material"

import { HtmlTooltip } from "../Tooltips"
import { descriptions, labels } from "../../cslTypes/fieldsMapping"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { GeneratorContext } from "../../provider/GeneratorProvider"

const DateField: React.FC<{ id: string }> = ({ id }) => {
  const { documentType, setValue, citation } = useContext(GeneratorContext)

  const value = (citation &&
    citation[id as "issued" | "accessed"]?.["date-parts"]) || ["0", "0", "0"]

  const [year, month, day] = value

  const handleChange = useCallback(
    async (e) => {
      switch (e.target.id) {
        case `${id}-day`:
          value[2] = e.target.value
          break
        case `${id}-month`:
          value[1] = e.target.value
          break
        case `${id}-year`:
          value[0] = e.target.value
      }
      setValue(id, { "date-parts": value })
    },
    [id, setValue, value],
  )

  return (
    <Container
      disableGutters
      sx={{ pt: "4px", display: "flex", flexDirection: "column" }}
    >
      <FormLabel>
        {labels[id]}
        <HtmlTooltip title={descriptions["issued"]}>
          {/* @ts-ignore */}
          <HelpOutlineIcon fontSize="16" />
        </HtmlTooltip>
      </FormLabel>
      {documentType === "website" && (
        <>
          <FormControl variant="standard">
            <InputLabel focused={false} shrink>
              Day
            </InputLabel>
            <Input
              value={day === "0" ? "" : day}
              onChange={handleChange}
              type="number"
              id={`${id}-day`}
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel focused={false} shrink>
              Month
            </InputLabel>
            <Input
              value={month === "0" ? "" : month}
              onChange={handleChange}
              type="number"
              id={`${id}-month`}
            />
          </FormControl>
        </>
      )}

      <FormControl variant="standard">
        <InputLabel focused={false} shrink>
          Year
        </InputLabel>
        <Input
          value={year === "0" ? "" : year}
          onChange={handleChange}
          type="number"
          id={`${id}-year`}
        />
      </FormControl>
    </Container>
  )
}

export default DateField
