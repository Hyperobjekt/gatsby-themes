import React from "react"
import { Header as BaseHeader } from "@hyperobjekt/material-ui-website"
import { styled } from "@material-ui/core"
import Container from "../container"
import DesktopNavigation from "./desktop-navigation"
import MobileNavigation from "./mobile-navigation"
import Logo from "../logo"
import { GatsbyLink } from "gatsby-material-ui-components"
import { useSiteMetadata } from "gatsby-theme-hypercore"

const ContentContainer = styled(Container)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const Header = ({ children, ...props }) => {
  const siteMetadata = useSiteMetadata()
  return (
    <BaseHeader sticky stickyOffset={0} {...props}>
      {children}
      <ContentContainer>
        <Logo />
        <DesktopNavigation
          LinkComponent={GatsbyLink}
          isGatsbyLink={true}
          links={siteMetadata.menuLinks}
        />
        <MobileNavigation buttonLabel="Menu" links={siteMetadata.menuLinks} />
      </ContentContainer>
    </BaseHeader>
  )
}

export default Header
