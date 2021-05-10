import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import HomeIcon from "./icons/home"
import SeparatorIcon from "./icons/separator"
import ArrowDropDownIcon from "./icons/dropdown"
import { GatsbyLink } from "gatsby-theme-material-ui"
import { HorizontalNavigation } from "@hyperobjekt/material-ui-website/lib/navigation"
import { useLocation } from "@reach/router"
import { withStyles } from "@material-ui/core"
import { Block } from "@hyperobjekt/material-ui-website/lib/block"
import clsx from "clsx"

export const styles = (theme) => ({
  root: {
    position: "relative",
    zIndex: 10,
  },
  container: {},
  navigation: {
    marginLeft: theme.spacing(-2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  listItem: {
    "&:hover > $link, &:focus-within > $link": {
      background: "transparent",
      textDecoration: "underline",
    },
  },
  depth0: {
    "& $link, & $listItem": {
      background: "transparent",
    },
  },
  depth1: {
    left: theme.spacing(2),
    maxHeight: "66vh",
    overflow: "auto",
    minWidth: 160,
    zindex: 10,
    "& $listItem": {
      background: theme.palette.primary.main,
      "&:hover $link, &:focus-within $link": {
        background: theme.palette.action.hover,
      },
    },
    "& $link": {
      color: theme.palette.primary.contrastText,
    },
  },
  separator: {
    display: "flex",
    alignItems: "center",
    "& > svg": { fontSize: 16, margin: "auto" },
  },
})

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

const Breadcrumb = ({ className, classes, NavigationProps, ...props }) => {
  const links = useBreadcrumb().map((d) => {
    if (d.link === "/")
      return {
        ...d,
        name: <HomeIcon aria-label="home" />,
      }
    return d
  })
  const { root, container, navigation, ...navClasses } = classes
  return links.length > 1 ? (
    <Block
      small
      className={clsx("HypBreadcrumb-root", root, className)}
      ContainerProps={{
        className: clsx("HypBreadcrumb-container", container),
      }}
      {...props}
    >
      <HorizontalNavigation
        classes={{
          root: clsx("HypBreadcrumb-navigation", navigation),
          ...navClasses,
        }}
        LinkComponent={GatsbyLink}
        isGatsbyLink={true}
        links={links}
        ArrowIcon={ArrowDropDownIcon}
        separator={<SeparatorIcon />}
        {...NavigationProps}
      />
    </Block>
  ) : null
}

Breadcrumb.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  NavigationProps: PropTypes.object,
}

export default withStyles(styles)(Breadcrumb)
