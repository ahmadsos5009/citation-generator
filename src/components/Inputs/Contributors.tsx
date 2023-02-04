import { User } from "../../cslTypes/type"
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  AuthorsEventPayload,
  CitationDocumentType,
  CitationJSDocumentType,
  Events,
} from "../../types"
import { StoreContext } from "../../provider/Store"
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

export interface Users extends User {
  role: string
}

/**
 *  Will maintain Contributors list in both StoreContext to show it the OnFlyCitationBox component,
 *  and State will be in sync with StoreContext
 * @param documentType
 * @constructor
 */
const ContributorsInput: React.FC<{ documentType: CitationDocumentType }> = ({
  documentType,
}) => {
  const { state, dispatch } = useContext(StoreContext)

  const initial = useMemo(() => {
    const contributors: Users[] = []

    documentUser[CitationJSDocumentType[documentType]].map((user) => {
      // @ts-ignore
      if (state[documentType][user] && state[documentType][user].length > 0) {
        // @ts-ignore
        state[documentType][user].map((u) => contributors.push({ ...u, role: user }))
      }
    })

    if (contributors.length > 0) {
      return contributors
    } else {
      const initialUser = { id: uuid() }
      setTimeout(() => {
        dispatch({
          type: "set",
          id: "author",
          documentType,
          value: [initialUser],
        })
      }, 100)
      return [{ ...initialUser, role: "author" }]
    }
  }, [state[documentType], dispatch])

  const [contributors, setContributors] = useState<Users[]>(initial)

  const handleOnAddClick = useCallback(() => {
    const role = documentUser[CitationJSDocumentType[documentType]][0]
    const newUser = { id: uuid() }

    // @ts-ignore
    const updatedContributors = state[documentType][role]
      ? // @ts-ignore
        [...state[documentType][role], newUser]
      : [newUser]

    dispatch({
      type: "set",
      id: role,
      documentType,
      value: updatedContributors,
    })

    setContributors([...contributors, { ...newUser, role }])
  }, [state[documentType], contributors, setContributors, dispatch])

  const handleOnDeleteClick = useCallback(
    (e) => {
      const [id, role] = e.currentTarget.name.split("_")
      // @ts-ignore
      const contributor = state[documentType][role] || [{ id }]
      // @ts-ignore
      const index = contributor.findIndex((user) => user.id === id)

      const newValue = [
        // @ts-ignore
        ...(state[documentType][role] || []),
        contributor[index],
      ].filter((user) => user.id !== id)

      dispatch({
        type: "set",
        id: role,
        documentType,
        value: newValue,
      })

      const newState = contributors.filter((user) => user.id !== id)
      setContributors(newState)
    },
    [state[documentType], contributors, setContributors],
  )

  const handleChange = useCallback(
    (e) => {
      const [id, role] = e.target.name.split("_")
      // @ts-ignore
      const contributor = state[documentType][role] || [{ id }]
      // @ts-ignore
      const index = contributor.findIndex((user) => user.id === id)

      switch (e.target.id) {
        case "given":
          contributor[index]["given"] = e.target.value
          break
        case "family":
          contributor[index]["family"] = e.target.value
          break
        case "suffix":
          contributor[index]["suffix"] = e.target.value
          break
      }

      dispatch({
        type: "set",
        id: role,
        documentType,
        value: contributor,
      })

      const newState = contributors.map((user) => {
        if (user.id === id) {
          user = { ...contributor[index], role: user.role }
        }
        return user
      })
      setContributors(newState)
    },
    [state[documentType], contributors, setContributors],
  )

  const handleRoleChange = useCallback(
    (e) => {
      const [id, role] = e.target.name.split("_")
      // @ts-ignore
      const contributor = state[documentType][role] || [{ id }]
      // @ts-ignore
      const index = contributor.findIndex((user) => user.id === id)

      const newValue = [
        // @ts-ignore
        ...(state[documentType][e.target.value] || []),
        contributor[index],
      ]

      // @ts-ignore
      const oldValue = (state[documentType][role] || []).filter(
        // @ts-ignore
        (user) => user.id !== id,
      )

      dispatch({
        type: "set",
        id: role,
        documentType,
        value: oldValue,
      })

      dispatch({
        type: "set",
        id: e.target.value,
        documentType,
        value: newValue,
      })

      const newState = contributors.map((user) => {
        if (user.id === id) {
          user.role = e.target.value
        }
        return user
      })
      setContributors(newState)
    },
    [state[documentType], contributors, setContributors],
  )

  const nodeRef = useRef<HTMLDivElement>()

  const EventCallBack = useCallback(
    (e: CustomEvent<{ payload: AuthorsEventPayload }>) => {
      const { state, store } = e.detail.payload
      if (store) {
        Object.entries(store).map((obj) => {
          const [role, value] = obj
          dispatch({
            type: "set",
            id: role,
            documentType,
            value,
          })
        })
        setContributors(state)
      }
    },
    [dispatch, setContributors],
  )

  useEffect(() => {
    if (!nodeRef.current) return
    nodeRef.current.addEventListener(Events.AUTHORS, EventCallBack as EventListener)
    return () =>
      document.removeEventListener(Events.AUTHORS, EventCallBack as EventListener)
  }, [nodeRef, dispatch, setContributors])

  return (
    <Container disableGutters>
      <Stack direction="row" ref={nodeRef} id="author-container">
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

const AuthorsLabel = styled(FormLabel)`
  display: flex;
  align-items: center;
  padding: 0;
`

export default ContributorsInput
