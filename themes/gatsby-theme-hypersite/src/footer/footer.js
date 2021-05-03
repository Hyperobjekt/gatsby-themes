import React from "react"
import { Footer as BaseFooter } from "@hyperobjekt/material-ui-website"
import { useSiteMetadata } from "gatsby-theme-hypercore"
import Container from "../container"

export default function Footer() {
  const siteMetadata = useSiteMetadata()
  return (
    <BaseFooter style={{ background: "#eee", padding: `24px 0` }}>
      <Container>{siteMetadata.copyright}</Container>
    </BaseFooter>
  )
}
