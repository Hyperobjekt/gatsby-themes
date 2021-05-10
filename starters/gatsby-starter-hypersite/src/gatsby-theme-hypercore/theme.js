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
        code: {
          background: "rgb(45, 42, 85)",
          color: "rgb(158, 254, 255)",
          padding: "0 4px",
          borderRadius: "4px",
          display: "inline-block",
        },
        ".MuiTypography-body1 + .MuiTypography-body1": {
          marginTop: "1rem",
        },
      },
    },
    MuiDivider: {
      root: { margin: "1rem 0" },
    },
  },
})

export default theme
