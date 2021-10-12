import React from "react"
import { SocialButton } from "@hyperobjekt/material-ui-website/lib/social-button"
import { Box } from "@material-ui/core"
import clsx from "clsx"
import { withStyles } from "@material-ui/styles"

const styles = (theme) => ({
  root: {},
})

const SocialLinks = ({ classes, className, links, ...props }) => {
  return (
    <Box
      className={clsx("HypSocialLinks-root", classes.root, className)}
      {...props}
    >
      {links.map(({ icon, link }) => (
        <SocialButton key={icon} icon={icon} href={link} />
      ))}
    </Box>
  )
}

SocialLinks.propTypes = {}

export default withStyles(styles, { name: "HypSocialLinks" })(SocialLinks)
