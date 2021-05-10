import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import HomeIcon from "./icons/home"
import SeparatorIcon from "./icons/separator"
import ArrowDropDownIcon from "./icons/dropdown"
import { GatsbyLink } from "gatsby-theme-material-ui"
import { HorizontalNavigation } from "@hyperobjekt/material-ui-website/lib/navigation"
import { useLocation } from "@reach/router"
import { withStyles } from "@material-ui/core"
import { Block } from "@hyperobjekt/material-ui-website/lib/block"

export const BreadcrumbNavigation = withStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(-2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  listItem: {
    "&:hover $link, &:focus-within $link": {
      background: "transparent",
      textDecoration: "underline",
    },
  },
  depth0: {
    "& $link, & $listItem": {
      background: "transparent",
    },
  },
  separator: {
    display: "flex",
    alignItems: "center",
    "& > svg": { fontSize: 16, margin: "auto" },
  },
}))(HorizontalNavigation)

export function useBreadcrumb() {
  const { allSitePage } = useStaticQuery(graphql`
    query AllPagesQuery {
      allSitePage {
        nodes {
          path
          context {
            frontmatter {
              name
              meta {
                title
              }
            }
          }
        }
      }
    }
  `)
  const location = useLocation()
  const allPages = allSitePage.nodes
    // shape and add depth for each page
    .map((d) => ({
      name: d.context?.frontmatter?.name || d.context?.frontmatter?.meta?.title,
      link: d.path,
      depth: d.path.replace(/\/+$/, "").replace(/[^/]/g, "").length,
    }))
    .filter((d) => Boolean(d.name) && d.link.indexOf("404") === -1)
  return (
    allPages
      // filter out pages not in the current path
      .filter((d) => location.pathname.includes(d.link))
      .map((d) => {
        const parent = d.link.replace(/\/+$/, "").split("/")
        if (parent.length > 0) parent.pop()
        const subMenu = allPages
          .filter((sub) => {
            // no submenu for home
            if (d.depth < 2) return false
            if (d.depth !== sub.depth) return false
            return sub.link.startsWith(parent.join("/"))
          })
          // sort alphabetically
          .sort((a, b) => a.name?.localeCompare(b.name))
        return {
          ...d,
          // add siblings as submenu
          subMenu: subMenu.length > 1 ? subMenu : [],
        }
      })
      .sort((a, b) => a.depth - b.depth)
  )
}

const Breadcrumb = ({ ...props }) => {
  const links = useBreadcrumb().map((d) => {
    if (d.link === "/")
      return {
        ...d,
        name: <HomeIcon aria-label="home" />,
      }
    return d
  })
  return links.length > 1 ? (
    <Block
      small
      className="HypBreadcrumb-root"
      ContainerProps={{ className: "HypBreadcrumb-container" }}
    >
      <BreadcrumbNavigation
        className="HypBreadcrumb-navigation"
        LinkComponent={GatsbyLink}
        isGatsbyLink={true}
        links={links}
        ArrowIcon={ArrowDropDownIcon}
        separator={<SeparatorIcon />}
        {...props}
      />
    </Block>
  ) : null
}

Breadcrumb.propTypes = {}

export default Breadcrumb
