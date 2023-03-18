import React, { useCallback, useContext } from "react"

import { IconButton, Stack, TextField } from "@mui/material"
import DoneIcon from "@mui/icons-material/Done"
import CloseIcon from "@mui/icons-material/Close"
import { DBContext } from "../../provider/DBProvider"
import { ManagerContext } from "../../provider/ManagerProvider"
import { users } from "../../cslTypes/fieldsMapping"
import { User } from "../../cslTypes/type"

const ActionButtons: React.FC<{
  field: string
  save: (e: React.MouseEvent) => void
  close: () => void
}> = ({ field, save, close }) => (
  <Stack direction="row">
    <IconButton size="small" value={field} onClick={save}>
      <DoneIcon />
    </IconButton>
    <IconButton size="small" onClick={close}>
      <CloseIcon />
    </IconButton>
  </Stack>
)

const ReferenceEdit: React.FC<{
  field: string
  value: string
  closeEdit: () => void
}> = ({ field, value, closeEdit }) => {
  const { citationDao } = useContext(DBContext)
  const { reference, setReference } = useContext(ManagerContext)

  const onSaveClick = useCallback(
    (e) => {
      const updatedValue =
        e.currentTarget.parentNode.querySelector("input")?.value ||
        e.currentTarget.parentNode.querySelector("textarea").value
      const key = e.currentTarget.value
      if (!reference) return

      citationDao.edit(reference.id, { ...reference, [key]: updatedValue })
      setReference({ ...reference, [key]: updatedValue })
      closeEdit()
    },
    [reference],
  )

  const onSaveDateClick = useCallback(
    (e) => {
      const dateParts: number[] = []
      const dateFields =
        e.currentTarget.parentNode.parentNode.querySelectorAll("input")

      dateFields.forEach((field: HTMLInputElement) => {
        dateParts.push(parseInt(field.value))
      })

      if (!reference) return

      citationDao.edit(reference.id, {
        ...reference,
        [e.currentTarget.value]: { "date-parts": [dateParts] },
      })

      setReference({
        ...reference,
        [e.currentTarget.value]: { "date-parts": [dateParts] },
      })
      closeEdit()
    },
    [reference],
  )

  const onSaveContributor = useCallback((e) => {
    const users: User[] = []
    const contributors = e.currentTarget.parentNode.parentNode.querySelectorAll(
      `.${e.currentTarget.value}`,
    )

    contributors.forEach((contributor: HTMLElement) => {
      const user: any = {}
      contributor.querySelectorAll("input").forEach((field) => {
        user[field.id] = field.value
      })
      users.push(user)
    })

    if (!reference) return

    citationDao.edit(reference.id, {
      ...reference,
      [e.currentTarget.value]: users,
    })

    setReference({
      ...reference,
      [e.currentTarget.value]: users,
    })
    closeEdit()
  }, [])

  if (!reference) return <></>

  if (field in users) {
    // @ts-ignore
    const users = reference[field] as User[]
    return (
      <Stack spacing={1}>
        {users.map(({ family, given }, index) => (
          <Stack
            className={`${field}`}
            key={index.toString()}
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <TextField
              label="family"
              id="family"
              size="small"
              defaultValue={family}
            />
            <TextField label="given" id="given" size="small" defaultValue={given} />
          </Stack>
        ))}
        <ActionButtons field={field} save={onSaveContributor} close={closeEdit} />
      </Stack>
    )
  }

  switch (field) {
    case "issued":
    case "accessed": {
      // @ts-ignore
      const date = reference[field]["date-parts"][0] as string[]
      return (
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          {date[0] && <TextField label="year" defaultValue={date[0]} size="small" />}
          {date[1] && (
            <TextField label="month" defaultValue={date[1]} size="small" />
          )}
          {date[2] && (
            <TextField label="day" type="date" defaultValue={date[2]} size="small" />
          )}
          <ActionButtons field={field} save={onSaveDateClick} close={closeEdit} />
        </Stack>
      )
    }
    default:
      return (
        <TextField
          size="small"
          defaultValue={value}
          multiline={field === "note"}
          maxRows={4}
          InputProps={{
            endAdornment: (
              <>
                <IconButton size="small" value={field} onClick={onSaveClick}>
                  <DoneIcon />
                </IconButton>
                <IconButton size="small" onClick={closeEdit}>
                  <CloseIcon />
                </IconButton>
              </>
            ),
          }}
        />
      )
  }
}

export default ReferenceEdit
