import React, { useCallback, useContext, useMemo, useState } from "react"
import {
  Box,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"

import { ManagerContext } from "../../provider/ManagerProvider"
import { users } from "../../cslTypes/fieldsMapping"
import { User } from "../../cslTypes/type"
import styled from "@emotion/styled"

import { NoReferenceSelected } from "../../placeholders"

import ReferenceEdit from "./ReferenceEdit"

const Metadata: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("1")

  const onChange = useCallback((e, value) => {
    setSelectedTab(value)
  }, [])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ bgcolor: "white", height: "100%", borderRadius: "10px" }}
    >
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          borderBottomColor: "secondary.main",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={onChange}
          sx={{ bgcolor: "#817589", borderRadius: "10px 10px 0 0" }}
        >
          <Tab label="Reference Data" value="1" />
          {/* TODO:: add notes  */}
        </Tabs>
      </Box>
      <TabPanel tab="1" selectedTab={selectedTab}>
        <ReferenceViewer />
      </TabPanel>
      {/* TODO:: add notes  */}
    </Container>
  )
}

const TabPanel: React.FC<{ tab: string; selectedTab: string }> = ({
  tab,
  selectedTab,
  children,
}) => (
  <div role="tabpanel" hidden={tab !== selectedTab}>
    {tab === selectedTab && children}
  </div>
)

const ReferenceViewer: React.FC = () => {
  const { reference } = useContext(ManagerContext)

  if (!reference)
    return (
      <Stack alignItems="center">
        <NoReferenceSelected />
        <Typography variant="caption" textAlign="center" p={4}>
          Click on the preview button for one of the reference list item to show full
          reference data
        </Typography>
      </Stack>
    )

  const [editId, setEditId] = useState()

  const onEditClick = useCallback((e) => {
    setEditId(e.currentTarget.value)
  }, [])

  const closeEdit = useCallback(() => {
    setEditId(undefined)
  }, [])

  const fieldWeights = {
    title: 1,
    "container-title": 5,
    type: 2,
    author: 3,
    issued: 4,
    accessed: 4,
  }

  /**
   * Return a readable CSL citation to show it
   */
  const referenceFields = useMemo(
    () =>
      Object.entries(reference)
        .map(([key, value]) => {
          if (key === "issued" || key === "accessed") {
            return {
              key,
              value: value["date-parts"].reduce(
                (p: string, c: number) => `${p}${(p.length && "/") || ""}${c}`,
                "",
              ),
            }
          }
          if (key in users) {
            return {
              key,
              value: value.reduce(
                (p: string, { family, given }: User) => `${p} ${family} ${given}`,
                "",
              ),
            }
          }
          return { key, value }
        })
        .filter(
          ({ key }) =>
            key !== "id" && key !== "updatedTimestamp" && key !== "favorite",
        )
        // @ts-ignore
        .sort((a, b) => fieldWeights[a.key] - fieldWeights[b.key]),
    [reference],
  )

  return (
    <Table>
      <tbody>
        {referenceFields.map(({ key, value }) => (
          <tr key={key}>
            <TableData>
              <FieldTitle>{key}</FieldTitle>
            </TableData>
            <TableData>
              {(editId === key && (
                <ReferenceEdit field={key} value={value} closeEdit={closeEdit} />
              )) || (
                <>
                  <FieldValue>{value}</FieldValue>
                  {key !== "type" && (
                    <IconButton size="small" value={key} onClick={onEditClick}>
                      {/*  @ts-ignore */}
                      <EditIcon fontSize="12px" />
                    </IconButton>
                  )}
                </>
              )}
            </TableData>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const Table = styled("table")`
  font-family: Noto Sans, sans-serif;
  padding: 12px;
`

const TableData = styled("td")`
  padding: 5px;
`

const FieldTitle = styled("span")`
  font-size: 12px;
  font-weight: bold;
`

const FieldValue = styled("span")`
  font-size: 13px;
  font-family: monospace;
`

export default Metadata
