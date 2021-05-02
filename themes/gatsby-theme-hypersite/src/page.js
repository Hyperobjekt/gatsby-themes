import { Page as BasePage } from "@hyperobjekt/material-ui-website"
import { withStyles } from "@material-ui/core"

export default withStyles((theme) => ({
  root: {
    position: "absolute",
    minHeight: "100%",
    width: "100%",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "stretch",
  },
}))(BasePage)
