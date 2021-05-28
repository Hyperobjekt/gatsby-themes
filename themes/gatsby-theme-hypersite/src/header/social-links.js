import React from "react"
import { SocialButton } from "@hyperobjekt/material-ui-website/lib/social-button"
import { Box } from "@material-ui/core"
import clsx from "clsx"

const SocialLinks = ({ links, ...props }) => {
  return (
    <Box className={clsx("HypSocialLinks-root")} {...props}>
      {links.map(({ icon, link }) => (
        <SocialButton key={icon} icon={icon} href={link} />
      ))}
    </Box>
  )
}

SocialLinks.propTypes = {}

export default SocialLinks
