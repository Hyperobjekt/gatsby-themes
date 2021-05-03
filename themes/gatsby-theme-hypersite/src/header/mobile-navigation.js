import React, { useState } from "react"
import clsx from "clsx"
import { Button, Drawer, withStyles } from "@material-ui/core"
import MobileLinks from "./mobile-links"
import { GatsbyLink } from "gatsby-material-ui-components"

const styles = (theme) => ({
  root: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    color: theme.palette.primary.contrastText,
  },
  drawer: {
    "& .MuiDrawer-paper": {
      minWidth: 320,
    },
  },
})

const MobileNavigation = ({
  classes,
  className,
  links,
  buttonLabel,
  anchor = "right",
  ...props
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className={clsx(classes.root, className)} {...props}>
      <Button className={classes.button} onClick={handleToggleMenu}>
        {buttonLabel}
      </Button>
      <Drawer
        className={classes.drawer}
        anchor={anchor}
        open={menuOpen}
        onClose={handleToggleMenu}
      >
        <MobileLinks
          LinkComponent={GatsbyLink}
          isGatsbyLink={true}
          links={links}
        />
      </Drawer>
    </div>
  )
}

export default withStyles(styles)(MobileNavigation)
