import React, { useCallback, useContext, useState } from "react"
import { Button, Container, Stack, styled } from "@mui/material"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import AllInboxIcon from "@mui/icons-material/AllInbox"
import StarBorderIcon from "@mui/icons-material/StarBorder"

import { ManagerContext } from "../../provider/ManagerProvider"

import UserProjects from "./Project"

const Collection: React.FC = () => {
  const { group, setGroup, updateSelectionModel } = useContext(ManagerContext)

  const onSelectListItem = useCallback((e) => {
    setGroup({ id: e.currentTarget.value, label: e.currentTarget.innerText })
    updateSelectionModel([])
  }, [])

  const [newProject, setShowNew] = useState(false)

  const onCreateProjectClick = useCallback(() => {
    setShowNew(true)
  }, [])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ bgcolor: "white", height: "100%", borderRadius: "10px" }}
    >
      <Stack bgcolor="#817589" borderRadius="10px 10px 0 0">
        <Button
          color="primary"
          startIcon={<NoteAddIcon />}
          onClick={onCreateProjectClick}
        >
          Create Project
        </Button>
      </Stack>

      <Stack py={3} spacing={1}>
        <CollectionButton
          value="all"
          onClick={onSelectListItem}
          disabled={group.id === "all"}
          startIcon={<AllInboxIcon />}
        >
          All References
        </CollectionButton>
        <CollectionButton
          value="favorites"
          disabled={group.id === "favorites"}
          onClick={onSelectListItem}
          startIcon={<StarBorderIcon />}
        >
          Favorites
        </CollectionButton>
      </Stack>

      <UserProjects newProject={newProject} setShowNew={setShowNew} />
    </Container>
  )
}

export const CollectionButton = styled(Button)(() => ({
  borderRadius: 0,
  justifyContent: "start",
  paddingLeft: "24px",
  "&:hover": {
    background: "#E6DAEA",
  },
  "&.Mui-disabled": {
    background: "#E6DAEA",
    color: "#37293C",
    borderLeft: "5px solid #37293C",
  },
}))

export default Collection
