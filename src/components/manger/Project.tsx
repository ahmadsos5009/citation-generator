import React, { useCallback, useContext, useMemo, useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import DoneIcon from "@mui/icons-material/Done"
import CloseIcon from "@mui/icons-material/Close"
import { v4 as uuid } from "uuid"
import { DBContext } from "../../provider/DBProvider"
import { ManagerContext } from "../../provider/ManagerProvider"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { EmptyProject } from "../../placeholders"
import { CollectionButton } from "./Collection"
import { useGridApiContext } from "@mui/x-data-grid"
import { TProject } from "../../db/types"

const importStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  width: "30%",
  height: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
}

export const AddCitationsToProject: React.FC = () => {
  const { projectDao } = useContext(DBContext)
  const { group } = useContext(ManagerContext)

  const projects = projectDao.getProjects(group.id)

  const projectMap = useMemo(
    () => new Map(projects.map(({ id, citations }) => [id, citations])),
    [projects],
  )

  const [projectsSet, setProjectsSet] = useState(new Set<string>())

  const setProject = useCallback(
    (e) => {
      const id = e.currentTarget.id

      if (projectsSet.has(id)) {
        projectsSet.delete(id)
      } else {
        projectsSet.add(id)
      }

      setProjectsSet(new Set(projectsSet))
    },
    [projectsSet],
  )

  const {
    current: {
      state: { selection },
    },
  } = useGridApiContext()

  const onAddClick = useCallback(() => {
    projectsSet.forEach((projectId) => {
      /** Project citations list without duplication */
      const citations = Array.from(
        new Set([...(projectMap.get(projectId) || []), ...(selection as string[])]),
      )
      projectDao.edit(projectId, { citations } as TProject)
    })
    handleClose()
  }, [projectsSet, selection, projectMap])

  const [open, setOpen] = useState(false)

  const handleShow = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <Button size="small" onClick={handleShow}>
        Projects
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            ...importStyle,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack p={1} spacing={1} justifyContent="space-between">
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">Select Projects</Typography>
              <Button onClick={onAddClick}>Add</Button>
            </Stack>
            <Divider />
          </Stack>

          <Grid container justifyContent="space-between" flex={1}>
            <List sx={{ bgcolor: "background.paper" }}>
              {projects.map(({ id, name }) => (
                <ListItem key={id}>
                  <ListItemButton id={id} onClick={setProject} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        color="secondary"
                        checked={projectsSet.has(id)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Stack
              alignSelf="end"
              p={1}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="caption">
                {projectsSet.size} Projects Selected
              </Typography>
            </Stack>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

const ProjectTextFiled: React.FC<{
  id?: string
  value?: string
  edit: (e: React.MouseEvent<HTMLElement>) => void
  close: () => void
}> = ({ id, value, edit, close }) => (
  <TextField
    sx={{ p: 2 }}
    size="small"
    placeholder="Your Project Name"
    defaultValue={value}
    InputProps={{
      endAdornment: (
        <>
          <IconButton size="small" id={id} value={id && "edit"} onClick={edit}>
            <DoneIcon />
          </IconButton>
          <IconButton size="small" onClick={close}>
            <CloseIcon />
          </IconButton>
        </>
      ),
    }}
  />
)

/**
 * Show Project created by user
 */
const UserProjects: React.FC<{
  newProject: boolean
  setShowNew: (show: boolean) => void
}> = ({ newProject, setShowNew }) => {
  const { group, setGroup, updateSelectionModel } = useContext(ManagerContext)
  const { projectDao } = useContext(DBContext)

  const projects = projectDao.getList()

  const [projectId, setProjectId] = useState()

  const onSelectListItem = useCallback((e) => {
    setGroup({ id: e.currentTarget.value, label: e.currentTarget.innerText })
    updateSelectionModel([])
  }, [])

  const closeEdit = useCallback(() => {
    setShowNew(false)
    setProjectId(undefined)
  }, [])

  const onSaveClick = useCallback(async (e) => {
    const projectName = e.currentTarget.parentNode.querySelector("input").value
    if (projectName) {
      if (e.currentTarget.value === "edit") {
        const id = e.currentTarget.id
        await projectDao.edit(id, {
          id: id,
          name: projectName,
        } as TProject)
      } else {
        await projectDao.add({ id: uuid(), name: projectName, citations: [] })
      }
      closeEdit()
    }
  }, [])

  const onDeleteProjectClick = useCallback((e) => {
    projectDao.delete(e.currentTarget.value)
    setGroup({ id: "all", label: "All References" })
  }, [])

  const onEditClick = useCallback((e) => {
    setProjectId(e.currentTarget.value)
  }, [])

  return (
    <Stack py={3} spacing={1} alignItems={(!projects.length && "center") || "unset"}>
      {(projects.length && (
        <Stack>
          {projects.map(({ id, name }) => (
            <Stack py={0.5} direction="row" justifyContent="space-between" key={id}>
              {(id === projectId && (
                <ProjectTextFiled
                  id={id}
                  value={name}
                  edit={onSaveClick}
                  close={closeEdit}
                />
              )) || (
                <>
                  <CollectionButton
                    sx={{ flex: 1 }}
                    key={id}
                    value={id}
                    onClick={onSelectListItem}
                    disabled={group.id === id}
                    startIcon={<LibraryBooksIcon fontSize="small" />}
                  >
                    {name}
                  </CollectionButton>
                  <Stack direction="row">
                    <IconButton size="small" value={id} onClick={onEditClick}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      value={id}
                      onClick={onDeleteProjectClick}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </>
              )}
            </Stack>
          ))}
        </Stack>
      )) ||
        (!newProject && (
          <>
            <EmptyProject />
            <Typography variant="caption" textAlign="center" px={2}>
              Click on Create Project button to group your references in a project
            </Typography>
          </>
        ))}
      {newProject && <ProjectTextFiled edit={onSaveClick} close={closeEdit} />}
    </Stack>
  )
}

export default UserProjects
