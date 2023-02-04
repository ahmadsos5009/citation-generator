import { ThemeOptions } from "@mui/material"

export default <ThemeOptions>{
  palette: {
    text: {
      secondary: "#3B414C",
    },
    primary: {
      main: "#EEF0F2",
      light: "#FDF5EC",
      "50": "#FBF4EF",
      dark: "#ECE4D5",
    },
    secondary: {
      main: "#37293C",
      light: "#675970",
      dark: "#171710",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: ["catamaran"].join(","),
    h6: {
      color: "#171710",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "secondary",
      },
    },
  },
}
