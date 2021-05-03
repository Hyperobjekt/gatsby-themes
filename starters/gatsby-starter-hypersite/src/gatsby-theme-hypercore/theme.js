import blue from "@material-ui/core/colors/blue"
import pink from "@material-ui/core/colors/pink"
import { createMuiTheme } from "@material-ui/core"

let theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
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
