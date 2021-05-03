import React from "react"
import PropTypes from "prop-types"
import { useSiteMetadata } from "gatsby-theme-hypercore"
import { Branding } from "@hyperobjekt/material-ui-website"

const Logo = (props) => {
  const siteMetadata = useSiteMetadata()
  return (
    <Branding
      logo={
        siteMetadata.logo && (
          <img src={siteMetadata.logo} alt={siteMetadata.title} />
        )
      }
      {...props}
    >
      {!siteMetadata.logo && siteMetadata.title}
    </Branding>
  )
}

Logo.propTypes = {}

export default Logo
