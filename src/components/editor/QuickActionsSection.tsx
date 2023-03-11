import React from "react"
import { Button, Grid, Stack } from "@mui/material"
import { AdsSidebar } from "../Ads"
import config from "../../config"

const QuickActionsSection: React.FC = () => {
  return (
    <>
      <Grid item container md={1}>
        <Stack>
          <Button href="#annotated_bibliography_guide" component="a" variant="text">
            Annotated Bibliography Guide
          </Button>
          <Button href="#bibliography_guide" component="a" variant="text">
            Bibliography and Reference List
          </Button>
        </Stack>
      </Grid>

      <Grid item md={8}>
        {config.SHOW_ADS && <AdsSidebar dataAdSlot="1729214133" />}
        {config.SHOW_ADS && <AdsSidebar dataAdSlot="1729214133" />}
      </Grid>
    </>
  )
}

export default QuickActionsSection
