import React from "react"
import { Header as BaseHeader } from "@hyperobjekt/material-ui-website"
import { styled } from "@material-ui/core"
import Container from "../container"
import DesktopNavigation from "./desktop-navigation"
import MobileNavigation from "./mobile-navigation"
import Logo from "../logo"
import { Link } from "gatsby-material-ui-components"
import { useSiteMetadata } from "gatsby-theme-hypercore"

const ContentContainer = styled(Container)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const Header = (props) => {
  const siteMetadata = useSiteMetadata()
  return (
    <BaseHeader sticky stickyOffset={0} {...props}>
      <ContentContainer>
        <Logo />
        <DesktopNavigation
          LinkComponent={Link}
          links={siteMetadata.menuLinks}
        />
        <MobileNavigation links={siteMetadata.menuLinks} />
      </ContentContainer>
    </BaseHeader>
  )
}

export default Header
