import { HorizontalNavigation } from "@hyperobjekt/material-ui-website"
import { withStyles } from "@material-ui/core"

export default withStyles((theme) => ({
  root: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  list: {
    display: "flex",
    flexDirection: "row",
  },
  listItem: {
    background: theme.palette.primary.main,
  },
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    "&:hover, &:focus": {
      textDecoration: "underline",
    },
  },
  linkActive: {
    fontWeight: "bold",
  },
}))(HorizontalNavigation)
