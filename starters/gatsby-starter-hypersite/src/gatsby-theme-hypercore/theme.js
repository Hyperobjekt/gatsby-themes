import pink from "@material-ui/core/colors/pink"
import { createMuiTheme } from "@material-ui/core"

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6a00ff",
    },
    secondary: {
      main: pink[500],
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        ".HypBranding-root": {
          color: "#fff",
          fontSize: 24,
          textDecoration: "none",
        },
      },
    },
  },
})

export default theme
