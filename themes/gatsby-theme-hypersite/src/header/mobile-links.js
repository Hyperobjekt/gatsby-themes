import { VerticalNavigation } from "@hyperobjekt/material-ui-website"
import { withStyles } from "@material-ui/core"

const MobileLinks = withStyles((theme) => ({
  root: {},
  depth0: {},
  depth1: {},
  depth2: {},
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1,
  },
  listItem: {
    "&:hover": {
      background: theme.palette.action.hover,
    },
  },
  listItemActive: {},
  link: {
    width: "100%",
    flex: 1,
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  linkActive: {
    background: theme.palette.action.selected,
  },
  arrow: {},
  separator: {},
}))(VerticalNavigation)

export default MobileLinks
