import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import {
  Alert,
  Box,
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"

import { generateCitation } from "./utilities/citation_generator"
import { DBContext } from "../provider/DBProvider"
import { Citation, CitationDocumentType, CitationJSDocumentType } from "../types"
import { ReferenceExportButton, ReferenceFilterButton } from "./Buttons"
import { ReferencesListContext } from "../provider/ReferencesListProvider"
import { grey } from "@mui/material/colors"
import { navigate } from "gatsby"

export const ReferencesList: React.FC<{
  setDocumentType: React.Dispatch<React.SetStateAction<CitationDocumentType>>
}> = ({ setDocumentType }) => {
  const { state, dispatch, format } = useContext(DBContext)

  const { filters, selectedCitations, setSelectedCitations } =
    useContext(ReferencesListContext)

  const citations = useMemo(() => {
    const citations: {
      view: { convertedCitation: string; inText: string }
      citationID: string
      type: CitationDocumentType
    }[] = []
    filters.map((doc) =>
      Object.values(state.value[doc]).map((c) => {
        citations.push({
          view: generateCitation(c, CitationJSDocumentType[doc], "html", format),
          citationID: c.id,
          type: doc,
        })
      }),
    )
    return citations
  }, [state.value, filters])

  const handleOnDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (event.currentTarget) {
        dispatch({
          type: "delete",
          citationID: (event.currentTarget as HTMLButtonElement).value,
          setDocumentType,
        })
      }
    },
    [dispatch],
  )

  const handleOnEditClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (event.currentTarget) {
        const citationID = (event.currentTarget as HTMLButtonElement).value
        dispatch({
          type: "edit",
          citationID,
          setDocumentType,
        })
      }
    },
    [dispatch],
  )

  const onCheckBoxClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      if (selectedCitations.includes(value)) {
        setSelectedCitations([...selectedCitations.filter((c) => c != value)])
      } else {
        setSelectedCitations([...selectedCitations, value])
      }
    },
    [selectedCitations, setSelectedCitations],
  )

  return (
    <CollectionProvider>
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
            {/*<Collections />*/}
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
                      secondaryAction={
                        <Stack direction="row">
                          <Checkbox
                            edge="end"
                            inputProps={{ "aria-labelledby": labelId }}
                            value={citation.citationID}
                            onChange={onCheckBoxClick}
                            checked={selectedCitations.includes(citation.citationID)}
                          />
                        </Stack>
                      }
                      disablePadding
                    >
                      <Stack width="80%">
                        <Box padding="0 2px">
                          <Box
                            sx={{ overflowWrap: "break-word" }}
                            dangerouslySetInnerHTML={{
                              __html: citation?.view.convertedCitation || "",
                            }}
                          />

                          <Box
                            className="in-text-viewa"
                            style={{ padding: "2px" }}
                            display="flex"
                            flexDirection="column"
                          >
                            <Stack direction="row" alignItems="center">
                              <Typography
                                variant="caption"
                                display="inline"
                                fontWeight="600"
                                gutterBottom
                                margin={0}
                              >
                                In-text Citation
                                <Box
                                  display="inline"
                                  fontWeight="300"
                                  paddingLeft="4px"
                                  dangerouslySetInnerHTML={{
                                    __html: citation?.view.inText || "",
                                  }}
                                />
                              </Typography>
                            </Stack>
                          </Box>
                        </Box>

                        <Stack className="edit-button-grouap" flexDirection="row">
                          <IconButton
                            onClick={handleOnEditClick}
                            value={citation.citationID}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={handleOnDeleteClick}
                            value={citation.citationID}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          <Tooltip
                            title={
                              DocumentLabel[CitationJSDocumentType[citation.type]]
                            }
                          >
                            <DocumentBadgeContainer>
                              {DocumentIcon[CitationJSDocumentType[citation.type]]}
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
    </CollectionProvider>
  )
}

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import { DocumentIcon, DocumentLabel } from "./Citation"
import { CollectionProvider } from "../provider/CollectionProvider"
import { CollectionModel } from "./modal/CollectionModel"
import { PrimaryList } from "./Lists"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { Primary } from "./Typography"
import styled from "@emotion/styled"

const ListHeader: React.FC = () => {
  const [selectAll, setSelectedAll] = useState(false)
  const { setSelectedCitations, selectedCitations, filters } =
    useContext(ReferencesListContext)
  const { state, format, citationDocument } = useContext(DBContext)

  const onSelectAllClick = useCallback(() => {
    if (!selectAll) {
      const selectedCitations: string[] = []
      filters.map((doc) =>
        Object.values(state.value[doc]).map((c) => selectedCitations.push(c.id)),
      )
      setSelectedCitations(selectedCitations)
    } else {
      setSelectedCitations([])
    }
    setSelectedAll(!selectAll)
  }, [setSelectedAll, selectAll, filters, setSelectedCitations, state.value])

  const [showAlert, setShowAlert] = useState(false)
  const closeSnackbar = useCallback(() => setShowAlert(false), [setShowAlert])

  const onPreviewClick = useCallback(() => {
    // TODO:: Abstract to utils method
    let citations: Citation[] = []
    filters.map((doc) => {
      citations = [
        ...citations,
        ...Object.values(state.value[doc])
          .filter((c) => selectedCitations.includes(c.id) && c)
          .map((c) => ({ ...c })),
      ]
    })

    if (citations.length < 1) {
      setShowAlert(true)
    } else {
      return navigate("/citationsList", {
        state: { citations, style: format, citationDocument },
      })
    }
  }, [filters, state.value, selectedCitations, setShowAlert])

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
          <ReferenceFilterButton />

          <IconButton onClick={onPreviewClick}>
            <RemoveRedEyeIcon />
          </IconButton>

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
        <Box marginRight="18px">
          <ReferenceExportButton view="Generator" />
          <Checkbox edge="end" value={selectAll} onChange={onSelectAllClick} />
        </Box>
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
