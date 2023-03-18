import React, { useCallback, useContext } from "react"
import {
  Badge,
  BadgeProps,
  Button,
  Fab,
  Fade,
  IconButton,
  Menu,
  styled,
  Tooltip,
} from "@mui/material"

import { DBContext } from "../provider/DBProvider"

import { CitationJSDocumentType, CollectionLabel } from "../types"

import { useDropDownMenu } from "./hooks"

import ArticleIcon from "@mui/icons-material/Article"
import { blue, red } from "@mui/material/colors"
import { ExportFileNameModel } from "./Model"
import useExportCitations from "./hooks/export"
import { v4 as uuid } from "uuid"

export const SaveCitationButton: React.FC = () => {
  const { citation, documentType, reset } = useContext(GeneratorContext)
  const { citationDao } = useContext(DBContext)

  const onSaveClick = useCallback(() => {
    citationDao.add({
      ...citation,
      id: uuid(),
      type: CitationJSDocumentType[documentType],
      updatedTimestamp: Date.now(),
    } as TCitation)
    // TODO:: move this to GeneratorContext
    const emptyCitation = getEmptyCitation(
      citation,
      CitationJSDocumentType[documentType],
    )
    reset(emptyCitation)
  }, [citation])

  return (
    <Tooltip title="save citation to the Reference Manager">
      <Fab
        sx={{ marginBottom: "6px" }}
        color="primary"
        aria-label="cite"
        size="medium"
        onClick={onSaveClick}
      >
        Save
      </Fab>
    </Tooltip>
  )
}

export const ClearFields: React.FC = () => {
  const { documentType, reset, citation, setCitation } = useContext(GeneratorContext)

  const onClearClick = useCallback(() => {
    setCitation({}, documentType)
    const emptyCitation = getEmptyCitation(
      citation,
      CitationJSDocumentType[documentType],
    )
    reset(emptyCitation)
  }, [documentType, citation])

  return (
    <Tooltip title="clear all fields">
      <Fab color="primary" aria-label="clear" size="medium" onClick={onClearClick}>
        Clear
      </Fab>
    </Tooltip>
  )
}

export const ReferenceExportButton: React.FC = () => {
  const { anchorEl, handleClick, handleClose } = useDropDownMenu()
  const open = Boolean(anchorEl)

  const { citationHtml, citationsJson } = useExportCitations()

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
import { GeneratorContext } from "../provider/GeneratorProvider"
import { getEmptyCitation } from "./utilities/object"
import { TCitation } from "../db/types"

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
