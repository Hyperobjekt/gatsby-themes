import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import HomeIcon from "@material-ui/icons/Home"
import ChevronRight from "@material-ui/icons/ChevronRight"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import { GatsbyLink } from "gatsby-theme-material-ui"
import { HorizontalNavigation } from "@hyperobjekt/material-ui-website/lib/navigation"
import { useLocation } from "@reach/router"
import { withStyles } from "@material-ui/core"

export const BreadcrumbNavigation = withStyles((theme) => ({
  link: {},
  listItem: {},
  depth0: {
    "& $link, & $listItem": {
      background: "transparent",
    },
  },
  separator: {
    display: "flex",
    alignItems: "center",
    "& > svg": { fontSize: 14, margin: "auto" },
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
  return (
    allPages
      // filter out pages not in the current path
      .filter((d) => location.pathname.includes(d.link))
      .map((d) => {
        const parent = d.link.replace(/\/+$/, "").split("/")
        if (parent.length > 0) parent.pop()
        return {
          ...d,
          // add siblings as submenu
          subMenu: allPages
            .filter((sub) => {
              // no submenu for home
              if (d.depth === 0) return false
              if (d.depth !== sub.depth) return false
              return sub.link.startsWith(parent.join("/"))
            })
            // sort alphabetically
            .sort((a, b) => a.name?.localeCompare(b.name)),
        }
      })
      .sort((a, b) => a.depth - b.depth)
  )
}

const Breadcrumb = ({ ...props }) => {
  const links = useBreadcrumb()
  return links.length > 1 ? (
    <BreadcrumbNavigation
      LinkComponent={GatsbyLink}
      isGatsbyLink={true}
      links={links}
      ArrowIcon={ArrowDropDownIcon}
      separator={<ChevronRight />}
      maxDepth={0}
      {...props}
    />
  ) : null
}

Breadcrumb.propTypes = {}

export default Breadcrumb
