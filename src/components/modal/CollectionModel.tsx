import AddIcon from "@mui/icons-material/Add"

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { CitationCollection, CollectionLabel, LabelHex } from "../../types"
import {
  Badge,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  ListItem,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import CancelIcon from "@mui/icons-material/Cancel"

import { CollectionContext } from "../../provider/CollectionProvider"
import { style } from "./model"
import { LabelBadge } from "../Buttons"
import LabelIcon from "@mui/icons-material/Label"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import styled from "@emotion/styled"
import config from "../../config"

const colors: LabelHex[] = [
  "secondary",
  "default",
  "success",
  "warning",
  "error",
  "primary",
  "info",
]

export const CollectionModel: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [showAddLabel, setShowAddLabel] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<CitationCollection>()

  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const onCollectionClick = useCallback(() => setOpen(true), [setOpen])

  const { state, dispatch } = useContext(CollectionContext)

  const labelsMap = useMemo(
    () => new Map(state.labels.map((label) => [label.id, label])),
    [state.labels],
  )

  const onCollectionEdit = useCallback(
    (e) => {
      const collection = state.collections.find((c) => c.id === e.currentTarget.id)
      setSelectedCollection(collection)
    },
    [state.collections],
  )

  const onCollectionDelete = useCallback(
    (e) => {
      dispatch({
        type: "delete",
        dataType: "collection",
        collectionId: e.currentTarget.id,
      })
    },
    [dispatch],
  )

  return (
    <>
      {config.ENABLE_COLLECTION && (
        <Tooltip title="Create your collection with citations">
          <IconButton onClick={onCollectionClick}>
            <LibraryAddIcon />
          </IconButton>
        </Tooltip>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: "50%", height: "50%" }}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ p: 1 }}
          >
            Manage Your Collections:
          </Typography>
          <AddCollection
            showAddLabel={showAddLabel}
            setShowAddLabel={setShowAddLabel}
            setSelectedCollection={setSelectedCollection}
            selectedCollection={selectedCollection}
            labelsMap={labelsMap}
          />
          {!showAddLabel && (
            <TableContainer sx={{ maxHeight: "150px" }} component={Paper}>
              <Table size="small" aria-label="labels">
                <TableBody>
                  {state.collections.map((collection, index) => (
                    <TableRow key={index.toString()}>
                      <TableCell>{collection.title}</TableCell>
                      <TableCell
                        sx={{
                          display: "grid",
                          marginTop: "8px",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          rowGap: "8px",
                        }}
                      >
                        {collection.labelsId.map((labelId) => (
                          <Badge
                            key={labelId}
                            color={labelsMap.get(labelId)?.labelHex}
                            badgeContent={labelsMap.get(labelId)?.label}
                            sx={{
                              marginLeft: "12px",
                              padding: "4px",
                              margin: "4px",
                            }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        <CRUDButtons
                          id={collection.id}
                          onEdit={onCollectionEdit}
                          onDelete={onCollectionDelete}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Modal>
    </>
  )
}

const AddCollection: React.FC<{
  showAddLabel: boolean
  setShowAddLabel: Dispatch<SetStateAction<boolean>>
  setSelectedCollection: Dispatch<SetStateAction<CitationCollection | undefined>>
  selectedCollection?: CitationCollection
  labelsMap: Map<string, CollectionLabel>
}> = ({
  showAddLabel,
  setShowAddLabel,
  selectedCollection,
  setSelectedCollection,
  labelsMap,
}) => {
  const selectRef = useRef<HTMLInputElement>()

  const [selectedLabels, setSelectedLabels] = useState<CollectionLabel[]>([])
  const [collectionTitle, setCollectionTitle] = useState<string>("")

  useEffect(() => {
    if (selectedCollection) {
      setCollectionTitle(selectedCollection.title)
      // @ts-ignore
      setSelectedLabels(selectedCollection.labelsId.map((l) => labelsMap.get(l)))
    }
  }, [selectedCollection, labelsMap])

  const { state, dispatch } = useContext(CollectionContext)

  const labels = useMemo(() => {
    return state.labels.filter(
      (label) => !selectedLabels.some((s) => s.id === label.id),
    )
  }, [state.labels, selectedLabels])

  const onSetCollectionTitle = useCallback(
    (e) => setCollectionTitle(e.target.value),
    [],
  )

  const onLabelSelect = useCallback(
    (e) => {
      if (labels.length > e.target.value) {
        setSelectedLabels([...selectedLabels, labels[e.target.value]])
      }
    },
    [labels, selectedLabels],
  )

  const onCreateLabelClick = useCallback(() => setShowAddLabel(true), [])

  const onRemoveSelectedLabelClick = useCallback(
    (e: React.MouseEvent) => {
      setSelectedLabels(
        selectedLabels.filter((label) => label.id !== e.currentTarget.id),
      )
    },
    [selectedLabels],
  )

  const onAddCollectionClick = useCallback(() => {
    if (collectionTitle) {
      let collection: CitationCollection = {
        id: "",
        title: collectionTitle,
        labelsId: selectedLabels.map((l) => l.id),
        format: state.format,
        citationsId: [],
      }
      if (selectedCollection) {
        collection = {
          ...selectedCollection,
          title: collectionTitle,
          labelsId: selectedLabels.map((l) => l.id),
        }
      }

      dispatch({
        type: "save",
        dataType: "collection",
        collection,
      })
      setSelectedLabels([])
      setCollectionTitle("")
      setSelectedCollection(undefined)
    }
  }, [state.format, selectedLabels, collectionTitle, selectedCollection])

  return (
    <Box
      component="form"
      sx={{ background: "#f3f3f3" }}
      border="1px solid rgba(0, 0, 0, 0.12)"
      borderRadius="10px"
      noValidate
      autoComplete="off"
      padding="12px"
      marginBottom="12px"
    >
      <Box display="flex" alignItems="center">
        <Input
          placeholder="Collection Title"
          required
          value={collectionTitle}
          onChange={onSetCollectionTitle}
        />
        <FormControl sx={{ minWidth: 140, marginLeft: "8px" }} size="small">
          {(labels.length > 0 && (
            <>
              <InputLabel htmlFor="grouped-select">Labels</InputLabel>
              <Select
                ref={selectRef}
                value="0"
                defaultValue=""
                label="Labels"
                onChange={onLabelSelect}
              >
                {labels.map((label, index) => (
                  <LabelMenuItem key={label.id} value={index}>
                    <Badge
                      key={label.id}
                      color={label.labelHex}
                      sx={{
                        marginLeft: "12px",
                        padding: "4px",
                        margin: "4px",
                      }}
                      badgeContent={label.label}
                    />
                  </LabelMenuItem>
                ))}
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ width: "100%" }}
                  onClick={onCreateLabelClick}
                >
                  Create Label
                </Button>
              </Select>
            </>
          )) || (
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onCreateLabelClick}
            >
              Create Label
            </Button>
          )}
        </FormControl>
        <Button
          color="success"
          sx={{ margin: "0 8px" }}
          disabled={showAddLabel}
          startIcon={<AddIcon />}
          onClick={onAddCollectionClick}
        >
          {(!selectedCollection && "Add Collection") || "Save Collection"}
        </Button>
      </Box>
      {(showAddLabel && <AddLabel setShowAddLabel={setShowAddLabel} />) ||
        (selectedLabels.length > 0 && (
          <Grid container>
            <Grid item>
              <Typography variant="caption" gutterBottom>
                Selected Labels:
              </Typography>
            </Grid>
            <Grid>
              <Stack spacing={3} direction="row" padding="4px">
                {selectedLabels.map((label) => (
                  <ListItem
                    disablePadding
                    key={label.id}
                    sx={{ marginRight: "4px" }}
                  >
                    <LabelBadge
                      label={label}
                      onRemoveSelectedLabelClick={onRemoveSelectedLabelClick}
                    />
                  </ListItem>
                ))}
              </Stack>
            </Grid>
          </Grid>
        ))}
    </Box>
  )
}

const AddLabel: React.FC<{
  setShowAddLabel: Dispatch<SetStateAction<boolean>>
}> = ({ setShowAddLabel }) => {
  const { state, dispatch } = useContext(CollectionContext)

  const [selectedLabelTag, setSelectedLabelTag] = useState(colors[0])
  const [labelTitle, setLabelTitle] = useState<string>("")
  const [labelID, setLabelId] = useState<string>("")

  const onLabelTagSelection = useCallback(
    (e) => setSelectedLabelTag(e.target.value),
    [setSelectedLabelTag],
  )

  const onSetLabelTitle = useCallback(
    (e) => setLabelTitle(e.target.value),
    [setLabelTitle],
  )

  const onCancelLabelEditing = useCallback(() => setShowAddLabel(false), [])

  const onAddLabelClick = useCallback(() => {
    if (labelTitle) {
      dispatch({
        type: "save",
        dataType: "label",
        label: { id: labelID, label: labelTitle, labelHex: selectedLabelTag },
      })
      setShowAddLabel(false)
    }
  }, [labelTitle, labelID, selectedLabelTag, setShowAddLabel])

  const onEditLabelClick = useCallback(
    (e) => {
      const label = state.labels.find((c) => c.id === e.currentTarget.id)
      if (label) {
        setLabelId(label.id)
        setLabelTitle(label.label)
        setSelectedLabelTag(label.labelHex)
      }
    },
    [state.labels],
  )

  const onDeleteLabelClick = useCallback(
    (e) => {
      dispatch({
        type: "delete",
        dataType: "label",
        labelsId: e.currentTarget.id,
      })
    },
    [dispatch],
  )

  return (
    <Box border="1px solid rgba(0, 0, 0, 0.12)" borderRadius="10px" padding="12px">
      <Box
        padding="12px"
        marginBottom="12px"
        sx={{ background: "#f3f3f3" }}
        borderRadius="10px"
      >
        <Input
          placeholder="Label Title"
          sx={{ marginRight: "8px" }}
          value={labelTitle}
          onChange={onSetLabelTitle}
          required
        />
        <FormControl sx={{ minWidth: 100, flexDirection: "row" }} size="small">
          <Select value={selectedLabelTag} onChange={onLabelTagSelection}>
            {colors.map((color) => (
              <MenuItem key={color} value={color}>
                {/* @ts-ignore */}
                <LabelIcon color={color} fontSize="small" />
              </MenuItem>
            ))}
          </Select>
          <Button
            sx={{ margin: "0 4px" }}
            color="success"
            startIcon={<AddIcon fontSize="small" />}
            onClick={onAddLabelClick}
          >
            {(!labelID && "Add Label") || "Save Label"}
          </Button>
          <Button
            sx={{ margin: "0 4px" }}
            startIcon={<CancelIcon fontSize="small" />}
            onClick={onCancelLabelEditing}
          >
            Cancel
          </Button>
        </FormControl>
      </Box>
      <TableContainer sx={{ height: "150px" }} component={Paper}>
        <Table size="small" aria-label="labels">
          <TableBody>
            {state.labels.map((label, index) => (
              <TableRow key={index.toString()}>
                <TableCell>{label.label}</TableCell>
                <TableCell>
                  {/* @ts-ignore */}
                  <LabelIcon color={label.labelHex} fontSize="small" />
                </TableCell>
                <TableCell>
                  <CRUDButtons
                    id={label.id}
                    onEdit={onEditLabelClick}
                    onDelete={onDeleteLabelClick}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

const CRUDButtons: React.FC<{
  id: string
  onEdit: (e: React.MouseEvent) => void
  onDelete: (e: React.MouseEvent) => void
}> = ({ id, onEdit, onDelete }) => {
  return (
    <Stack direction="row" spacing={2}>
      <IconButton size="small" sx={{ padding: "0" }} id={id} onClick={onEdit}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" sx={{ padding: 0 }} id={id} onClick={onDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  )
}

const LabelMenuItem = styled(MenuItem)`
  :hover {
    background-color: white;
  }
`
