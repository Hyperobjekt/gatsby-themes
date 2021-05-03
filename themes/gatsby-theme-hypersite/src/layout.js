import React from "react"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css" //this will auto show and hide the link on focus
import Page from "./page"
import Seo from "./seo"
import Main from "./main/main"
import Header from "./header/header"
import Footer from "./footer/footer"

const Layout = ({ children, pageContext }) => {
  const {
    frontmatter: { seo },
  } = pageContext
  return (
    <Page>
      <Seo {...seo} />
      <Header>
        <SkipNavLink />
      </Header>
      <Main>
        <SkipNavContent />
        {children}
      </Main>
      <Footer />
    </Page>
  )
}

export default Layout
