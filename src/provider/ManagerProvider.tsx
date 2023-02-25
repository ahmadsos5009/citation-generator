import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react"

import { TCitation } from "../db/types"
import { GridSelectionModel } from "@mui/x-data-grid"

type Group = { id: string; label: string }

export const ManagerContext = createContext<{
  group: Group
  reference?: TCitation
  selectionModel: GridSelectionModel
  setGroup: Dispatch<SetStateAction<Group>>
  setReference: Dispatch<SetStateAction<TCitation | undefined>>
  updateSelectionModel: (selectionModel: GridSelectionModel) => void
}>({
  group: {} as Group,
  reference: {} as TCitation,
  selectionModel: [],
  setGroup: () => "",
  setReference: () => "",
  updateSelectionModel: () => "",
})

export const ManagerProvider: React.FC = ({ children }) => {
  const [group, setGroup] = useState<Group>({ id: "all", label: "All References" })
  const [reference, setReference] = useState<TCitation | undefined>()
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])

  const updateSelectionModel = useCallback(
    (newSelectionModel) => setSelectionModel(newSelectionModel),
    [],
  )

  return (
    <ManagerContext.Provider
      value={{
        group,
        reference,
        selectionModel,
        setGroup,
        setReference,
        updateSelectionModel,
      }}
    >
      {children}
    </ManagerContext.Provider>
  )
}
