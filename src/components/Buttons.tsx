import React, { useCallback, useContext } from "react"
import {
  Badge,
  BadgeProps,
  Box,
  Button,
  Fab,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material"
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import { DBContext } from "../provider/DBProvider"
import { clearCitationFields } from "./utilities/html_fields"
import { CitationDocumentType, CollectionLabel } from "../types"
import { StoreContext } from "../provider/Store"
import FilterListIcon from "@mui/icons-material/FilterList"
import { useDropDownMenu } from "./hooks"
import { ReferencesListContext } from "../provider/ReferencesListProvider"
import CheckIcon from "@mui/icons-material/Check"
import ArticleIcon from "@mui/icons-material/Article"
import { blue, red } from "@mui/material/colors"
import { ExportFileNameModel } from "./Model"
import useExportCitations from "./hooks/export"

export const CiteResourceButton: React.FC<{
  onCiteResource: () => void
}> = ({ onCiteResource }) => (
  <Tooltip title="save citation to the References list">
    <Fab color="primary" aria-label="cite" size="large" onClick={onCiteResource}>
      Save
    </Fab>
  </Tooltip>
)

export const ClearFields: React.FC<{ document: CitationDocumentType }> = ({
  document,
}) => {
  const { dispatch } = useContext(StoreContext)

  const onClearClick = useCallback(() => {
    dispatch({ type: "clear", documentType: document })
    clearCitationFields(document)
  }, [dispatch, document])

  return (
    <Tooltip title="clear all fields">
      <Fab color="primary" aria-label="clear" size="large" onClick={onClearClick}>
        Clear
      </Fab>
    </Tooltip>
  )
}

export const ToggleCitationsListButton: React.FC = () => {
  const { showCitationsList, setShowCitationsList } = useContext(DBContext)

  const toggleCitationsList = useCallback(
    () => setShowCitationsList(!showCitationsList),
    [showCitationsList, setShowCitationsList],
  )

  if (showCitationsList === undefined) {
    return <></>
  }

  return (
    <Box display="flex" justifyContent="end">
      {(showCitationsList && (
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          style={{ font: "10" }}
          onClick={toggleCitationsList}
        >
          <CloseFullscreenIcon sx={{ mr: 1 }} />
          <Typography variant="overline" display="block">
            Hide Citations List
          </Typography>
        </Fab>
      )) || (
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          style={{ font: "10" }}
          onClick={toggleCitationsList}
        >
          <MenuOpenIcon sx={{ mr: 1 }} />
          <Typography variant="overline" display="block">
            Show Stored Citations
          </Typography>
        </Fab>
      )}
    </Box>
  )
}

const ITEM_HEIGHT = 48

export const ReferenceFilterButton: React.FC = () => {
  const { anchorEl, handleClick, handleClose } = useDropDownMenu()
  const { filters, setFilters } = useContext(ReferencesListContext)

  const onMenuItemClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const type = e.currentTarget.accessKey as CitationDocumentType
      if (filters.includes(type)) {
        setFilters([...filters.filter((documentType) => documentType != type)])
      } else {
        setFilters([...filters, type])
      }
    },
    [filters, setFilters],
  )

  return (
    <>
      <Tooltip title="Filter By Document Type">
        <IconButton onClick={handleClick}>
          <Badge badgeContent={filters.length} color="primary">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {Object.values(CitationDocumentType).map((option) => (
          <MenuItem
            key={option}
            accessKey={option}
            onClick={onMenuItemClick}
            sx={{ justifyContent: "space-between" }}
          >
            {option}
            {filters.includes(option) && <CheckIcon />}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export const ReferenceExportButton: React.FC<{ view: "Editor" | "Generator" }> = ({
  view,
}) => {
  const { anchorEl, handleClick, handleClose } = useDropDownMenu()
  const open = Boolean(anchorEl)

  const { citationHtml, citationsJson } = useExportCitations(view)

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Export
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        PaperProps={{
          style: {
            width: "13ch",
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <ExportFileNameModel
          buttonText="PDF"
          closeDropDown={handleClose}
          citationHtml={citationHtml}
          citationsJson={citationsJson}
          buttonIcon={<ArticleIcon sx={{ color: red[500] }} />}
        />
        <ExportFileNameModel
          buttonText="Word"
          closeDropDown={handleClose}
          citationHtml={citationHtml}
          citationsJson={citationsJson}
          buttonIcon={<ArticleIcon sx={{ color: blue[500] }} />}
        />
        <ExportFileNameModel
          buttonText="BibTex"
          closeDropDown={handleClose}
          citationHtml={citationHtml}
          citationsJson={citationsJson}
          buttonIcon={<ArticleIcon color="secondary" />}
        />
      </Menu>
    </>
  )
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 25,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))

import CloseIcon from "@mui/icons-material/Close"

export const LabelBadge: React.FC<{
  label: CollectionLabel
  onRemoveSelectedLabelClick: (e: React.MouseEvent) => void
}> = ({ label, onRemoveSelectedLabelClick }) => (
  <IconButton aria-label="cart" size="small">
    <StyledBadge badgeContent={label.label} color={label.labelHex}>
      <CloseIcon
        fontSize="small"
        sx={{ padding: 0 }}
        id={label.id}
        onClick={onRemoveSelectedLabelClick}
      />
    </StyledBadge>
  </IconButton>
)

export const FileImport = styled(IconButton)`
  :hover {
    border: #d32f2f 1px solid;
  }
`

export const Feedback = styled(Fab)`
  position: fixed;
  top: 90%;
  right: 0;
`
