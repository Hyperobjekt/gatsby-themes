import React from "react"
import { SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css" //this will auto show and hide the link on focus
import Page from "./page"
import Seo from "./seo"
import Main from "./main/main"
import Header from "./header/header"
import Footer from "./footer/footer"
import { useLocation } from "@reach/router"
import { Breadcrumb, useBreadcrumb } from "./breadcrumb"
import { useSiteMetadata } from "../../gatsby-theme-hypercore"
import HomeIcon from "./icons/home"
import { getSocialLink } from "./utils"

/**
 * Provides a base layout for the page, with a header, main, and footer.
 */
const Layout = ({ children, meta }) => {
  const location = useLocation()
  const { menuLinks, social, copyright, logo, title } = useSiteMetadata()

  // navigation links for the header
  const headerLinks = menuLinks.filter(
    (link) => !link.location || link.location === "header"
  )

  // navigation links for the footer
  const footerLinks = menuLinks.filter(
    (link) => !link.location || link.location === "footer"
  )

  // social links
  const socialLinks = social.map(({ name, value }) =>
    getSocialLink(name, value)
  )

  // breadcrumb configuration
  const homeIcon = <HomeIcon aria-label="home" />
  const breadcrumbLinks = useBreadcrumb().map((d) =>
    d.link === "/" ? { ...d, name: homeIcon } : d
  )

  // get page level class for page level overrides
  const pageClasses = location.pathname
    .split("/")
    .filter(Boolean)
    .map((name) => `HypPage-${name}`)
    .join(" ")

  return (
    <Page className={pageClasses}>
      <Seo {...meta} />
      <Header
        logo={logo}
        title={title}
        links={headerLinks}
        social={socialLinks}
      />
      <Main>
        <Breadcrumb links={breadcrumbLinks} />
        <SkipNavContent />
        {children}
      </Main>
      <Footer links={footerLinks} copyright={copyright} social={socialLinks} />
    </Page>
  )
}

export default Layout
