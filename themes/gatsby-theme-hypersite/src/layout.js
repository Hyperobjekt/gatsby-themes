import React from "react"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css" //this will auto show and hide the link on focus
import Page from "./page"
import Seo from "./seo"
import Main from "./main/main"
import Header from "./header/header"
import Footer from "./footer/footer"
import { useLocation } from "@reach/router"
import { Breadcrumb } from "./breadcrumb"
const Layout = ({ children, meta }) => {
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
        <Breadcrumb />
        <SkipNavContent />
        {children}
      </Main>
      <Footer />
    </Page>
  )
}

export default Layout
