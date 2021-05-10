import React from "react"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css" //this will auto show and hide the link on focus
import Page from "./page"
import Seo from "./seo"
import Main from "./main/main"
import Header from "./header/header"
import Footer from "./footer/footer"
import { useLocation } from "@reach/router"
import Breadcrumb, { useBreadcrumb } from "./breadcrumb"
const Layout = ({ children, meta }) => {
  const links = useBreadcrumb()
  const location = useLocation()
  const classes = location.pathname
    .split("/")
    .filter(Boolean)
    .map((name) => `HypPage-${name}`)
    .join(" ")
  return (
    <Page className={classes}>
      <Seo {...meta} />
      <Header>
        <SkipNavLink />
      </Header>
      <Main>
        {links.length > 1 && <Breadcrumb />}
        <SkipNavContent />
        {children}
      </Main>
      <Footer />
    </Page>
  )
}

export default Layout
