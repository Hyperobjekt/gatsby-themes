import { createTheme } from "@material-ui/core/styles"

let theme = createTheme({
  palette: {
    primary: {
      main: "#6a00ff",
    },
    secondary: {
      main: "#6699cc",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        // make wrappers fill viewport
        "html, body, #___gatsby,#gatsby-focus-wrapper": {
          height: "100%",
        },
        html: {
          scrollBehavior: "smooth",
        },
        code: {
          background: "rgb(45, 42, 85)",
          color: "rgb(158, 254, 255)",
          padding: "0 4px",
          borderRadius: "4px",
          display: "inline-block",
        },
      },
    },
    MuiTypography: {
      body1: {
        margin: "1rem 0",
      },
    },
    MuiDivider: {
      root: { margin: "1rem 0" },
    },
    // make the page fill the viewport
    HypPage: {
      root: {
        height: "100%",
      },
    },
    HypBranding: {
      root: {
        color: "#fff",
        fontSize: 24,
        textDecoration: "none",
      },
    },
    // hide the social links in the header
    HypSocialLinks: {
      root: {
        display: "none",
      },
    },
    // hide the page level breadcrumb
    HypBreadcrumb: {
      root: {
        display: "none",
      },
    },
  },
})

export default theme
