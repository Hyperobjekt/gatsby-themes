import React from "react"
import clsx from "clsx"
import { Button, Drawer, withStyles } from "@material-ui/core"
import { useSiteValues } from "../../../hooks/use-site-store"
import { Link } from "gatsby-material-ui-components"
import MobileLinks from "./mobile-links"

const styles = (theme) => ({
  root: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {},
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
  const [menuOpen, setMenuOpen] = useSiteValues(["menuOpen", "setMenuOpen"])

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className={clsx(classes.root, className)}>
      <Button className={classes.button} onClick={handleToggleMenu}>
        {buttonLabel}
      </Button>
      <Drawer
        className={classes.drawer}
        anchor={anchor}
        open={menuOpen}
        onClose={handleToggleMenu}
      >
        <MobileLinks LinkComponent={Link} links={links} />
      </Drawer>
    </div>
  )
}

export default withStyles(styles)(MobileNavigation)
