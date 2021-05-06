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
        "[class*='Hero-content'] > .MuiTypography-root:first-child": {
          textShadow: `0 1px 4px #000`,
        },
      },
    },
  },
})

export default theme
