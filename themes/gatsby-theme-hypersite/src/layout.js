import React from "react"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css" //this will auto show and hide the link on focus
import Page from "./page"
import Seo from "./seo"
import Main from "./main/main"
import Header from "./header/header"
import Footer from "./footer/footer"
import Breadcrumb, { useBreadcrumb, BreadcrumbNavigation } from "./breadcrumb"
import { Container } from "@hyperobjekt/material-ui-website"
import { Box } from "@material-ui/core"
const Layout = ({ children, meta }) => {
  const links = useBreadcrumb()
  return (
    <Page>
      <Seo {...meta} />
      <Header>
        <SkipNavLink />
      </Header>
      <Main>
        {links.length > 1 && (
          <Box pb={2} pt={2} bgcolor="grey.200">
            <Container>
              <Breadcrumb />
            </Container>
          </Box>
        )}
        <SkipNavContent />
        {children}
      </Main>
      <Footer />
    </Page>
  )
}

export default Layout
