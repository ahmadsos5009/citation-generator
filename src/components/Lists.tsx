import { List } from "@mui/material"
import styled from "@emotion/styled"

export const PrimaryList = styled(List)`
  ::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  ::-webkit-scrollbar-track {
    background-color: #dbdbe3;
  }

  /* scrollbar itself */
  ::-webkit-scrollbar-thumb {
    background-color: #85858b;
    border-radius: 16px;
    border: 4px solid #dbdbe3;
  }

  /* set button(top and bottom of the scrollbar) */
  ::-webkit-scrollbar-button {
    display: none;
  }
`
