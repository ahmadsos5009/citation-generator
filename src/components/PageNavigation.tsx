import React from "react"
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { useLocation } from "@reach/router"

const PageStructure = [
  {
    type: "list",
    title: "Chicago citation style",
  },
  {
    type: "link",
    href: "#in-text",
    title: "In-text Citations",
  },
  {
    type: "link",
    href: "#list",
    title: "Reference List",
  },
  {
    type: "link",
    href: "#notes",
    title: "Footnotes / Endnotes",
  },
  {
    type: "link",
    href: "#annotated-bibliography",
    title: "Annotated Bibliography",
  },
]

const PageNavigation: React.FC<{ documents: []; documentsLink: [] }> = ({
  documents,
  documentsLink,
}) => {
  const { hash } = useLocation()

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
        top: 0,
        bottom: 0,
        position: "sticky",
        pl: "6px",
        paddingTop: "24px",
        color: "#3B414C",
      }}
    >
      <List disablePadding sx={{ alignSelf: "flex-end" }}>
        {PageStructure.map(
          ({ type, title, href }, index) =>
            (type === "list" && (
              <ListItem key={index.toString()} sx={{ flexDirection: "column" }}>
                <ListItemText>
                  <ListItemButton href="#title">{title}</ListItemButton>
                </ListItemText>
                <List>
                  {documents?.map((title, index) => (
                    <ListItem
                      key={index.toString()}
                      button
                      component="a"
                      href={documentsLink[index]}
                    >
                      <ListItemText
                        sx={{
                          textDecoration:
                            (hash === documentsLink[index] && "underline") ||
                            "unset",
                          color: (hash === href && "#675970") || "inherit",
                        }}
                        primaryTypographyProps={{
                          fontWeight: (hash === href && 700) || "inherit",
                        }}
                        primary={title}
                      />
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            )) || (
              <ListItem key={index.toString()} button component="a" href={href}>
                <ListItemText
                  sx={{
                    textDecoration: (hash === href && "underline") || "unset",
                    color: (hash === href && "#675970") || "inherit",
                  }}
                  primaryTypographyProps={{
                    fontWeight: (hash === href && 700) || "inherit",
                  }}
                  primary={title}
                />
              </ListItem>
            ),
        )}
      </List>
    </Container>
  )
}

export default PageNavigation
