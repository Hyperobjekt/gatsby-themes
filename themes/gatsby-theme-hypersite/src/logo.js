import React from "react"
import { Branding } from "@hyperobjekt/material-ui-website"

const Logo = ({ logo, title, ...props }) => {
  return (
    <Branding logo={logo && <img src={logo} alt={title} />} {...props}>
      {!logo && title}
    </Branding>
  )
}

export default Logo
