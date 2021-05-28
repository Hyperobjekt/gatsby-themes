import React from "react"
import { Header as BaseHeader } from "@hyperobjekt/material-ui-website"
import { styled } from "@material-ui/core"
import Container from "../container"
import DesktopNavigation from "./desktop-navigation"
import MobileNavigation from "./mobile-navigation"
import Logo from "../logo"
import { GatsbyLink } from "gatsby-material-ui-components"
import MenuIcon from "../icons/menu"
import { SkipNavLink } from "@reach/skip-nav"
import SocialLinks from "./social-links"

const ContentContainer = styled(Container)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

/**
 *  Basic site header component.  Shows skip nav, logo, and navigation.
 */
const Header = ({ logo, links, title, social, children, ...props }) => {
  return (
    <BaseHeader sticky stickyOffset={0} {...props}>
      <SkipNavLink />
      <ContentContainer>
        <Logo title={title} logo={logo} />
        <DesktopNavigation
          LinkComponent={GatsbyLink}
          isGatsbyLink={true}
          LinkProps={{
            partiallyActive: true,
          }}
          links={links}
        />
        <MobileNavigation buttonLabel={<MenuIcon />} links={links} />
        <SocialLinks links={social} />
        {children}
      </ContentContainer>
    </BaseHeader>
  )
}

export default Header
