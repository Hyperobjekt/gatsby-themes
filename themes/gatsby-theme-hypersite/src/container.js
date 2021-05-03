import React from "react"
import clsx from "clsx"
import { withStyles, Box } from "@material-ui/core"

const styles = (theme) => ({
  root: {
    margin: `auto`,
    width: `100%`,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1280,
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: 1440,
    },
  },
})

export default withStyles(styles, {
  name: "HypContainer",
})(({ classes, className, ...props }) => (
  <Box
    className={clsx(classes.root, className)}
    display="flex"
    flexDirection="column"
    {...props}
  />
))
