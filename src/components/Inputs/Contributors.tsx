import { User } from "../../cslTypes/type"
import React, { useCallback, useContext, useMemo } from "react"
import { CitationJSDocumentType } from "../../types"

import { documentUser, users } from "../../cslTypes/fieldsMapping"
import { v4 as uuid } from "uuid"
import {
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import styled from "@emotion/styled"
import { GeneratorContext } from "../../provider/GeneratorProvider"

export interface Users extends User {
  role: string
}

const ContributorsInput: React.FC = () => {
  const { documentType, citation, setValue } = useContext(GeneratorContext)

  /**
   * Collect all users roles in the citation and add to them id
   * so we could us it when updating it or delete them
   */
  const contributors = useMemo(() => {
    const initRole = documentUser[CitationJSDocumentType[documentType]][0]
    const users: (User & { role: string })[] = []
    documentUser[CitationJSDocumentType[documentType]].map((role) => {
      // @ts-ignore
      if (citation && citation[role]) {
        // @ts-ignore
        users.push(...citation[role].map((u) => ({ ...u, role, id: uuid() })))
      }
    })

    if (users.length) {
      return users
    } else {
      setValue(initRole, [{}])
      return [{ role: initRole, id: uuid() }]
    }
  }, [documentType, citation])

  const handleOnAddClick = useCallback(() => {
    const role = documentUser[CitationJSDocumentType[documentType]][0]
    // @ts-ignore
    const users = (citation && [...citation[role], {}]) || [{}]
    setValue(role, [...users])
  }, [documentType, citation])

  const handleChange = useCallback(
    (e) => {
      const [id, role] = e.target.name.split("_")
      const filed = e.target.id
      const value = e.target.value
      const users = contributors
        .filter((user) => user.role === role)
        .map((user) => {
          if (user.id === id) {
            return { ...getCitationUser(user), [filed]: value }
          }
          return getCitationUser(user)
        })

      setValue(role, users)
    },
    [citation, contributors],
  )

  const handleOnDeleteClick = useCallback(
    (e) => {
      const [id, role] = e.currentTarget.name.split("_")
      const users = contributors.filter((user) => {
        if (user.role === role && user.id !== id) {
          return getCitationUser(user)
        }
      })

      setValue(role, users)
    },
    [contributors],
  )

  /**
   * switch user for one array to another array
   */
  const handleRoleChange = useCallback(
    (e) => {
      const [id, role] = e.target.name.split("_")
      const newRole = e.target.value
      let updatedUser
      const from = contributors.filter((user) => {
        if (user.id === id) {
          updatedUser = user
        }
        if (user.role === role && user.id !== id) {
          return getCitationUser(user)
        }
      })
      const to = contributors.filter(
        (user) => user.role === newRole && getCitationUser(user),
      )

      setValue(role, from)
      setValue(newRole, [...to, updatedUser])
    },
    [contributors],
  )

  return (
    <Container disableGutters>
      <Stack direction="row" id="author-container">
        <AuthorsLabel id="authors">Contributor(s)</AuthorsLabel>
        <IconButton aria-label="add" onClick={handleOnAddClick}>
          <AddIcon />
        </IconButton>
      </Stack>

      {contributors.map((contributor, index) => (
        <Stack
          id={contributor.id}
          key={index.toString()}
          spacing={{ xs: 0, md: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <FormControl>
            <Select
              name={`${contributor.id}_${contributor.role}`}
              value={contributor.role}
              onChange={handleRoleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {documentUser[CitationJSDocumentType[documentType]].map((user) => (
                <MenuItem key={user} value={user}>
                  {/* @ts-ignore */}
                  {users[user]}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Contributor Role</FormHelperText>
          </FormControl>

          <TextField
            name={`${contributor.id}_${contributor.role}`}
            id="given"
            label="Given"
            focused={false}
            value={contributor.given || ""}
            inputProps={{ className: "given" }}
            onChange={handleChange}
          />
          <TextField
            name={`${contributor.id}_${contributor.role}`}
            id="family"
            label="Family"
            focused={false}
            value={contributor.family || ""}
            inputProps={{ className: "family" }}
            onChange={handleChange}
          />
          <TextField
            name={`${contributor.id}_${contributor.role}`}
            id="suffix"
            label="Suffix"
            focused={false}
            value={contributor.suffix || ""}
            inputProps={{ className: "suffix" }}
            onChange={handleChange}
          />

          <Stack justifyContent="center">
            <IconButton
              name={`${contributor.id}_${contributor.role}`}
              onClick={handleOnDeleteClick}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      ))}
    </Container>
  )
}

const getCitationUser = (user: User) => ({
  family: user.family,
  given: user.given,
  suffix: user.suffix,
})

const AuthorsLabel = styled(FormLabel)`
  font-family: Noto Sans, sans-serif;
  color: #161719;
  font-size: 1em;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  display: flex;
  align-items: center;
  padding: 0;
`

export default ContributorsInput
