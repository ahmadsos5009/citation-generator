import React, { useCallback, useContext } from "react"
import { ManagerContext } from "../../provider/ManagerProvider"
import { GridToolbarFilterButton, useGridApiContext } from "@mui/x-data-grid"
import { DBContext } from "../../provider/DBProvider"
import { export_citations } from "../utilities/citation_exporter"
import { Button, ButtonGroup, Stack, Typography } from "@mui/material"

import { AddCitationsToProject } from "./Project"
import styled from "@emotion/styled"
import { TProject } from "../../db/types"

const ListToolbar: React.FC = () => {
  const { group } = useContext(ManagerContext)

  const {
    current: { state },
  } = useGridApiContext()
  const { selection } = state

  const { citationDao, projectDao } = useContext(DBContext)

  const onDeleteClick = useCallback(async () => {
    await citationDao.bulkDelete(selection as string[])
  }, [selection])

  const onExportClick = useCallback(
    async (e) => {
      const format = e.currentTarget.value
      const references = await citationDao.bulkGet(selection as string[])
      // TODO:: import a runtime
      require("@citation-js/plugin-bibtex")
      require("@citation-js/plugin-ris")
      export_citations(references, format, "untitled")
    },
    [selection],
  )

  const isProjectSelected = group.id !== "all" && group.id !== "favorites"

  const onRemoveProjectCitation = useCallback(() => {
    const citations = state.rows.ids.filter(
      (id) => !selection.includes(id),
    ) as string[]

    projectDao.edit(group.id, {
      citations,
    } as TProject)
  }, [selection, state.rows.ids])

  return (
    <Stack bgcolor="#F4F3F5" borderRadius="10px 10px 0 0" p={1}>
      <Stack justifyContent="space-between" direction="row" py={1}>
        <Label>{group.label}</Label>
        <Stack direction="row">
          {/*  TODO:: implement full text search */}
          {/*<Button color="secondary" size="small" startIcon={<SearchIcon />}>*/}
          {/*  Search*/}
          {/*</Button>*/}

          {/* @ts-ignore */}
          <GridToolbarFilterButton
            sx={{
              color: "secondary.dark",
              "& .MuiBadge-badge": { backgroundColor: "primary.dark" },
            }}
          />
        </Stack>
      </Stack>

      <Stack>
        {!!selection.length && (
          <Stack direction="row" justifyContent="space-between" p={1}>
            <Stack direction="row" spacing={2}>
              <Stack alignItems="center">
                <ButtonGroup color="secondary">
                  <Button size="small" value="bibtex" onClick={onExportClick}>
                    BibTex .bib
                  </Button>
                  <Button size="small" value="ris" onClick={onExportClick}>
                    Ris .ris
                  </Button>
                  {/* TODO:: add word doc xml  */}
                </ButtonGroup>
                <Typography variant="caption" align="center" p={1}>
                  Export Selected References
                </Typography>
              </Stack>

              <Stack alignItems="center">
                <ButtonGroup color="secondary">
                  <AddCitationsToProject />
                </ButtonGroup>
                <Typography variant="caption" align="center" p={1}>
                  Add Selected References
                </Typography>
              </Stack>
            </Stack>

            <Stack justifyContent="center">
              <Stack direction="row">
                <Button onClick={onDeleteClick} color="secondary" size="small">
                  Delete
                </Button>
                {isProjectSelected && (
                  <Button
                    color="secondary"
                    size="small"
                    onClick={onRemoveProjectCitation}
                  >
                    Remove from Project
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

const Label = styled("h4")`
  font-family: Noto Sans, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  margin: 0;
`

export default ListToolbar
