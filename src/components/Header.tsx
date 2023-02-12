import * as React from "react"
import { useCallback, useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material"
import { Logo, PrimaryButton } from "./Typography"
import config from "../config"
import { CSL_METADATA } from "../csl_metadata"

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static">
      <Container disableGutters maxWidth={false} sx={{ background: "#ECE4D5" }}>
        <Toolbar>
          <Logo
            variant="h6"
            // @ts-ignore
            as="a"
            href="/"
            noWrap
            sx={{ display: { xs: "none", md: "flex" }, fontSize: "28px" }}
          >
            Citation Generator
          </Logo>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {config.SERVICES_PAGES.filter(({ disabled }) => !disabled).map(
              ({ name, href }) =>
                (href === "guide" && <StyleGuideButton key="style" />) || (
                  <PrimaryButton
                    key={name}
                    href={href}
                    sx={{ my: 2, display: "block" }}
                  >
                    {name}
                  </PrimaryButton>
                ),
            )}
          </Box>

          {/** Mobile View  **/}
          <Logo
            variant="h5"
            // @ts-ignore
            as="a"
            href="/"
            noWrap
            sx={{ display: { xs: "flex", md: "none" }, fontSize: "22px" }}
          >
            Citation Generator
          </Logo>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {config.SERVICES_PAGES.filter(({ disabled }) => !disabled).map(
                ({ name, href }) =>
                  (href === "guide" && <AccordionStyleGuidButton key={name} />) || (
                    <MenuItem key={name} component="a" href={href}>
                      <Typography textAlign="center">{name}</Typography>
                    </MenuItem>
                  ),
              )}
            </Menu>
          </Box>
        </Toolbar>
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            flexFlow: "row",
            flexWrap: "wrap",
            background: "#37293C",
            justifyContent: "center",
          }}
        >
          {Object.values(CSL_METADATA).map(({ id }) => (
            <Button
              key={id}
              href={`/${id.toLocaleLowerCase()}/`}
              component="a"
              sx={{
                color: "#FFFFFF",
                display: "block",
                textAlign: "center",
                "&:hover": {
                  backgroundColor: "#7B7186",
                },
              }}
            >
              {id}
            </Button>
          ))}
        </Container>
      </Container>
    </AppBar>
  )
}

export default Header

const StyleGuideButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = useCallback((event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget)
    }
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <PrimaryButton
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
        sx={{ my: 2, display: "block" }}
      >
        Style Guide
      </PrimaryButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem component="a" href="/guide/chicago/">
          <Typography px={2} textAlign="center">
            Chicago
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

const AccordionStyleGuidButton: React.FC = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Style Guide</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MenuItem component="a" href="/guide/chicago/">
          <Typography textAlign="center">Chicago</Typography>
        </MenuItem>
      </AccordionDetails>
    </Accordion>
  )
}
