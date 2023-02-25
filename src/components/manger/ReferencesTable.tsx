import React, { useCallback, useContext, useMemo, useState } from "react"
import {
  GridColDef,
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid"
import {
  Container,
  createTheme,
  IconButton,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import StarIcon from "@mui/icons-material/Star"
import PreviewIcon from "@mui/icons-material/Preview"

import { ManagerContext } from "../../provider/ManagerProvider"
import { PrimaryText } from "../Typography"

import { DBContext } from "../../provider/DBProvider"
import { User } from "../../cslTypes/type"
import themes, { dataGrid } from "../../themes"

import { EmptyReferenceList } from "../../placeholders"
import ListToolbar from "./ListToolbar"

export const referenceColumns: GridColDef[] = [
  {
    field: "issued",
    headerName: "Year",
    sortable: false,
    disableColumnMenu: true,
    width: 100,
    valueFormatter: (params) => {
      const { value } = params
      return (value && value["date-parts"] && value["date-parts"][0]) || "--"
    },
  },
  { field: "title", headerName: "Title", flex: 2, disableColumnMenu: true },
  {
    field: "author",
    headerName: "Contributors",
    flex: 1,
    disableColumnMenu: true,
    valueFormatter: (params) => {
      return params.value.reduce(
        (prev: string, { family, given }: User) =>
          (family && `${prev} ${family} ${given}`) || "--",
        "",
      )
    },
  },
]

// TODO:: favorite
const columns: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    sortable: false,
    width: 32,
    headerAlign: "right",
    align: "right",
    renderCell: (params) => {
      const { citationDao } = useContext(DBContext)
      const [favorite, setFavorite] = useState(!!+params.row.favorite)

      const onSelectClick = useCallback(() => {
        citationDao.edit(params.id as string, {
          ...params.row,
          favorite: params.row.favorite === 1 ? 0 : 1,
        })
        setFavorite(!favorite)
      }, [favorite])

      return (
        <Stack direction="row">
          <Tooltip title="Add this reference to your favorite references">
            <IconButton size="small" onClick={onSelectClick}>
              {(favorite && <StarIcon style={{ fill: "gold" }} />) || (
                <StarOutlineIcon />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      )
    },
  },
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
  },
  ...referenceColumns,
  {
    field: "preview",
    type: "actions",
    sortable: false,
    width: 70,
    headerName: "Preview",
    renderCell: (params) => {
      const { setReference } = useContext(ManagerContext)
      const onPreviewClick = useCallback(() => {
        setReference(params.row)
      }, [params])

      return (
        <Stack direction="row">
          <Tooltip title="Preview Full Reference Data">
            <IconButton size="small" onClick={onPreviewClick}>
              <PreviewIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    },
  },
]

const DataGridTheme = createTheme({
  ...themes,
  ...dataGrid,
})

const ReferencesTable: React.FC = () => {
  const { citationDao } = useContext(DBContext)
  const { group, selectionModel, updateSelectionModel } = useContext(ManagerContext)

  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)

  const updatePage = useCallback((page) => setPage(page), [])

  const updatePageSize = useCallback((pageSize) => setPageSize(pageSize), [])

  const count = citationDao.getCitationsCount(group.id)

  const references = citationDao.getCitations({
    group: group.id,
    page,
    pageSize,
  })

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ bgcolor: "white", height: "100%" }}
    >
      <ThemeProvider theme={DataGridTheme}>
        <DataGrid
          components={{ Toolbar: ListToolbar, NoRowsOverlay }}
          selectionModel={selectionModel}
          onSelectionModelChange={updateSelectionModel}
          rows={references}
          columns={columns}
          rowCount={count}
          pagination
          page={page}
          pageSize={pageSize}
          onPageChange={updatePage}
          onPageSizeChange={updatePageSize}
          paginationMode="server"
          rowsPerPageOptions={[10, 5, 25, 50, 100]}
          checkboxSelection
        />
      </ThemeProvider>
    </Container>
  )
}

const NoRowsOverlay: React.FC = () => {
  const { group } = useContext(ManagerContext)

  const { label, message } = useMemo(() => {
    switch (group.id) {
      case "all":
        return {
          label: "Empty Reference List",
          message:
            "Create new Reference manually or Import references form external sources",
        }
      case "favorites":
        return {
          label: "No Reference in Favorites",
          message:
            "Click on the star button to add a reference to the favorites list",
        }
      default:
        return {
          label: `No Reference in ${group.label} project`,
          message: `Select references from the list and click on add to your project`,
        }
    }
  }, [group])

  return (
    <Stack bgcolor="white" alignItems="center" height="100%">
      <EmptyReferenceList />
      <PrimaryText>{label}</PrimaryText>
      <Typography variant="caption">{message}</Typography>
    </Stack>
  )
}

export default ReferencesTable
