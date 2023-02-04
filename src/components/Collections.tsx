import React, { useCallback, useContext } from "react"
import {
  Badge,
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material"

import AllInboxIcon from "@mui/icons-material/AllInbox"
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import { grey } from "@mui/material/colors"
import { CollectionContext } from "../provider/CollectionProvider"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList"
import LabelIcon from "@mui/icons-material/Label"
import styled from "@emotion/styled"

export const Collections: React.FC = () => {
  const {
    selectedCollection,
    setSelectedCollection,
    state: { collections, labels },
    selectedLabels,
    setSelectedLabels,
  } = useContext(CollectionContext)

  const onCollectionSelect = useCallback(
    (e) => setSelectedCollection(e.currentTarget.id),
    [],
  )

  const onLabelSelect = useCallback(
    (e) => {
      const labelId = e.currentTarget.id
      if (labels.includes(labelId)) {
        setSelectedLabels([...selectedLabels.filter((id) => id != labelId)])
      } else {
        setSelectedLabels([...selectedLabels, labelId])
      }
    },
    [selectedLabels],
  )

  return (
    <Box>
      <List
        sx={{
          background: grey[300],
          height: "100%",
          border: "1px solid rgba(0, 0, 0, 0.12);",
          borderRadius: "10px",
        }}
      >
        <ListItem
          disablePadding
          sx={{ padding: "12px 0", width: "max-content" }}
          key="collection_all"
        >
          <CollectionButton
            selected={selectedCollection == "all"}
            key="all"
            id="all"
            onClick={onCollectionSelect}
          >
            <AllInboxIcon fontSize="small" />
            <Typography>All Citations</Typography>
            <ChevronRightIcon
              fontSize="small"
              visibility="hidden"
              className={`${selectedCollection === "all" && "selected"}`}
            />
          </CollectionButton>
        </ListItem>
        <ListItem disablePadding key="collection_list_item">
          <List
            subheader={
              <CollectionsHeader>
                <LocalLibraryIcon fontSize="small" />
                <Typography>Collections</Typography>
              </CollectionsHeader>
            }
          >
            {(collections.length > 0 &&
              collections.map((collection) => (
                <ListItem key={collection.id}>
                  <CollectionButton
                    selected={selectedCollection == collection.id}
                    id={collection.id}
                    onClick={onCollectionSelect}
                  >
                    <FeaturedPlayListIcon fontSize="small" />
                    <Typography maxWidth="50px" noWrap marginLeft="1px">
                      {collection.title}
                    </Typography>
                    <ChevronRightIcon
                      fontSize="small"
                      visibility="hidden"
                      className={`${
                        selectedCollection === collection.id && "selected"
                      }`}
                    />
                  </CollectionButton>
                </ListItem>
              ))) || (
              <Button sx={{ margin: "4px" }}>
                <Typography variant="caption" display="flex" alignItems="center">
                  <LibraryAddIcon fontSize="small" />
                  Creat Collection
                </Typography>
              </Button>
            )}
          </List>
        </ListItem>
        {collections.length > 1 && (
          <ListItem disablePadding key="collection_labels">
            <List
              subheader={
                <CollectionsHeader>
                  <LabelIcon fontSize="small" />
                  <Typography>Labels</Typography>
                </CollectionsHeader>
              }
              sx={{ width: "100%" }}
            >
              {labels.length > 0 &&
                labels.map((label) => (
                  <ListItem key={label.id}>
                    <Checkbox
                      value={selectedLabels.includes(label.id)}
                      onChange={onLabelSelect}
                    />
                    <Badge
                      sx={{ marginLeft: "12px" }}
                      badgeContent={label.label}
                      color={label.labelHex}
                    />
                  </ListItem>
                ))}
            </List>
          </ListItem>
        )}
      </List>
    </Box>
  )
}

const CollectionButton = styled(ListItemButton)<{ selected?: boolean }>`
  padding: 4px 2px;
  opacity: 1 !important;
  ${(props) =>
    props.selected &&
    "background-color: #2f4858 !important; color: white !important;"};

  .selected {
    visibility: visible;
  }
`

const CollectionsHeader = styled.div`
  padding: 4px;
  background: #485a73;
  display: inline-flex;
  align-items: center;
  color: white;
  width: 100%;
`
