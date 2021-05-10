import React, { useRef, useState } from "react"
import clsx from "clsx"
import { Button, Drawer, IconButton, withStyles } from "@material-ui/core"
import MobileLinks from "./mobile-links"
import { GatsbyLink } from "gatsby-material-ui-components"
import CloseIcon from "../icons/close"

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
  close: {
    marginLeft: "auto",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
})

/**
 * Provides mobile-friendly navigation, with a menu button that triggers a drawer to open.
 */
const MobileNavigation = ({
  classes,
  className,
  links,
  buttonLabel,
  anchor = "right",
  children,
  ...props
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeRef = useRef(null)
  const openRef = useRef(null)

  const handleToggleMenu = () => {
    const isOpen = !menuOpen
    setMenuOpen(isOpen)
    if (isOpen) {
      // closeRef?.current?.focus()
    } else {
      openRef.current.focus()
    }
  }

  return (
    <div className={clsx(classes.root, className)} {...props}>
      <Button
        ref={openRef}
        className={classes.button}
        onClick={handleToggleMenu}
      >
        {buttonLabel}
      </Button>
      <Drawer
        className={classes.drawer}
        anchor={anchor}
        open={menuOpen}
        onClose={handleToggleMenu}
      >
        <IconButton
          className={classes.close}
          ref={closeRef}
          onClick={handleToggleMenu}
        >
          <CloseIcon aria-label="close menu" />
        </IconButton>
        <MobileLinks
          LinkComponent={GatsbyLink}
          isGatsbyLink={true}
          LinkProps={{
            partiallyActive: false,
          }}
          links={links}
        />
        {children}
      </Drawer>
    </div>
  )
}

export default withStyles(styles)(MobileNavigation)
