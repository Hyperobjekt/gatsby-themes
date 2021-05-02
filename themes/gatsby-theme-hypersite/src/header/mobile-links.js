import { Navigation } from "@hyperobjekt/material-ui-website"
import { withStyles } from "@material-ui/core"

const MobileLinks = withStyles((theme) => ({
  root: {},
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1,
  },
  link: {
    padding: theme.spacing(2, 3),
    width: "100%",
    flex: 1,
  },
}))(Navigation)

export default MobileLinks
