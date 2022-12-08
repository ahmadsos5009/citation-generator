import * as React from "react"
import { Box, Link, Typography } from "@mui/material"

const logoImageData =
  "data:image/png;base64,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"

const Footer: React.FC = () => (
  <Box
    sx={{
      background: "#f4f4f4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 0",
    }}
    component="footer"
  >
    <Link href="/" sx={{ margin: "2px" }}>
      <img src={logoImageData} alt="Citation Generator" />
    </Link>
    <Box
      margin="0 8px"
      sx={{
        typography: "body1",
        "& > :not(style) + :not(style)": {
          ml: 1,
        },
      }}
    >
      <Link href="/about" underline="none">
        About
      </Link>
    </Box>

    <Typography align="center">© Citation Generator 2022</Typography>
  </Box>
)

export default Footer
