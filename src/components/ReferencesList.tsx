import React, { ChangeEvent, useCallback, useContext, useState } from "react"
import {
  Alert,
  Box,
  Grid,
  IconButton,
  ListItem,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"

import { DBContext } from "../provider/DBProvider"
import { CitationDocumentType } from "../types"

import { grey } from "@mui/material/colors"

export const ReferencesList: React.FC<{
  setDocumentType: React.Dispatch<React.SetStateAction<CitationDocumentType>>
}> = () => {
  const { citationDao } = useContext(DBContext)

  // TODO:: use pagination for this list and filters
  const citations = citationDao.getList()

  const handleOnDeleteClick = useCallback(
    (e) => citationDao.delete(e.currentTarget.value),
    [],
  )

  // TODO::
  const handleOnEditClick = useCallback((event) => {
    // if (event.currentTarget) {
    //   const citationID = (event.currentTarget as HTMLButtonElement).value
    //   dispatch({
    //     type: "edit",
    //     citationID,
    //     setDocumentType,
    //   })
    // }
  }, [])

  // TODO::
  const onCheckBoxClick = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // const value = e.currentTarget.value
    // if (selectedCitations.includes(value)) {
    //   setSelectedCitations([...selectedCitations.filter((c) => c != value)])
    // } else {
    //   setSelectedCitations([...selectedCitations, value])
    // }
  }, [])

  return (
    <Grid xs={10} md={8} py={2}>
      <Grid xs={12}>
        <ListHeader />
      </Grid>

      <Grid
        xs={12}
        bgcolor="white"
        p={2}
        borderRadius="10px"
        boxShadow={`0 0 0 0.5px #878da2, 0 0 2px 0.5px rgb(135 141 162 / 50%),
                            0 1px 8px 0.5px rgb(135 141 162 / 10%),
                            0 2px 12px 0.5px rgb(135 141 162 / 10%),
                            0 4px 20px 0.5px rgb(135 141 162 / 25%)`}
      >
        <Stack direction="row" spacing={4} justifyContent="center">
          {(citations.length > 0 && (
            <PrimaryList
              dense
              sx={{
                overflowY: "auto",
                width: "100%",
                height: "calc(100vh - 30vh)",
              }}
            >
              {citations.map((citation, index) => {
                const labelId = `checkbox-list-secondary-label-${index}`

                return (
                  <RefListItem
                    id={labelId}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "12px 4px",
                    }}
                    key={index.toString()}
                    // secondaryAction={
                    //   <Stack direction="row">
                    //     <Checkbox
                    //       edge="end"
                    //       inputProps={{ "aria-labelledby": labelId }}
                    //       value={citation.id}
                    //       onChange={onCheckBoxClick}
                    //       checked={selectedCitations.includes(citation.citationID)}
                    //     />
                    //   </Stack>
                    // }
                    disablePadding
                  >
                    <Stack width="80%">
                      <Box padding="0 2px">
                        <Box
                          sx={{ overflowWrap: "break-word" }}
                          dangerouslySetInnerHTML={{
                            __html: citation.title || "",
                          }}
                        />
                      </Box>

                      <Stack className="edit-button-grouap" flexDirection="row">
                        {/* TODO:: edit */}
                        {/*<IconButton*/}
                        {/*  onClick={handleOnEditClick}*/}
                        {/*  value={citation.id}*/}
                        {/*>*/}
                        {/*  <EditIcon fontSize="small" />*/}
                        {/*</IconButton>*/}
                        <IconButton
                          onClick={handleOnDeleteClick}
                          value={citation.id}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Tooltip title={DocumentLabel[citation.type]}>
                          <DocumentBadgeContainer>
                            {DocumentIcon[citation.type]}
                          </DocumentBadgeContainer>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </RefListItem>
                )
              })}
            </PrimaryList>
          )) || (
            <Box>
              <ListAltIcon fontSize="large" />
              <Typography>Empty List of References!</Typography>
              <Typography variant="caption" display="flex" justifyContent="center">
                Save a Citation to add it to the list
              </Typography>
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}

import DeleteIcon from "@mui/icons-material/Delete"

import { DocumentIcon, DocumentLabel } from "./Citation"

import { CollectionModel } from "./modal/CollectionModel"
import { PrimaryList } from "./Lists"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { Primary } from "./Typography"
import styled from "@emotion/styled"

const ListHeader: React.FC = () => {
  const [selectAll, setSelectedAll] = useState(false)

  // const onSelectAllClick = useCallback(() => {
  //   if (!selectAll) {
  //     const selectedCitations: string[] = []
  //     filters.map((doc) =>
  //       Object.values(state.value[doc]).map((c) => selectedCitations.push(c.id)),
  //     )
  //     setSelectedCitations(selectedCitations)
  //   } else {
  //     setSelectedCitations([])
  //   }
  //   setSelectedAll(!selectAll)
  // }, [setSelectedAll, selectAll, filters, setSelectedCitations, state.value])

  const [showAlert, setShowAlert] = useState(false)
  const closeSnackbar = useCallback(() => setShowAlert(false), [setShowAlert])

  // const onPreviewClick = useCallback(() => {
  //   // TODO:: Abstract to utils method
  //   let citations: Citation[] = []
  //   filters.map((doc) => {
  //     citations = [
  //       ...citations,
  //       ...Object.values(state.value[doc])
  //         .filter((c) => selectedCitations.includes(c.id) && c)
  //         .map((c) => ({ ...c })),
  //     ]
  //   })
  //
  //   if (citations.length < 1) {
  //     setShowAlert(true)
  //   } else {
  //     return navigate("/citationsList", {
  //       state: { citations, style: format, citationDocument },
  //     })
  //   }
  // }, [filters, state.value, selectedCitations, setShowAlert])

  return (
    <Box>
      <Primary>Reference Manager</Primary>
      <Stack
        justifyContent="space-between"
        direction="row"
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12);",
          borderRadius: "10px",
          margin: "12px 0",
          background: grey[300],
        }}
      >
        <Box>
          {/*<ReferenceFilterButton />*/}

          {/*<IconButton onClick={onPreviewClick}>*/}
          {/*  <RemoveRedEyeIcon />*/}
          {/*</IconButton>*/}

          <CollectionModel />

          <Snackbar
            open={showAlert}
            autoHideDuration={2000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={closeSnackbar} severity="warning" sx={{ width: "100%" }}>
              Select All Citations / Or at least one of them
            </Alert>
          </Snackbar>
        </Box>
        {/*<Box marginRight="18px">*/}
        {/*  <ReferenceExportButton view="Generator" />*/}
        {/*  <Checkbox edge="end" value={selectAll} onChange={onSelectAllClick} />*/}
        {/*</Box>*/}
      </Stack>
    </Box>
  )
}

const RefListItem = styled(ListItem)`
  .in-text-view {
    max-height: 0;
    max-width: 0;
    transition: max-height 0.15s ease-in, max-width 0.15s ease-out;
    overflow: hidden;
  }
  .edit-button-group {
    max-height: 0;
    max-width: 0;
    transition: max-height 0.15s ease-out, max-width 0.15s ease-out;
    overflow: hidden;
  }

  :hover {
    .in-text-view {
      max-height: fit-content;
      max-width: fit-content;
      transition: max-height 0.5s ease-in, max-width 0.5s ease-in;
    }
    .edit-button-group {
      max-height: fit-content;
      max-width: fit-content;
      transition: max-height 0.5s ease-in, max-width 0.5s ease-in;
    }

    background: #dcdcdc;
    border-radius: 10px;
  }

  .csl-bib-body {
    padding: 4px;
  }
`

const DocumentBadgeContainer = styled.div`
  align-self: center;
  svg {
    font-size: large;
    fill: darkgreen;
  }
`
