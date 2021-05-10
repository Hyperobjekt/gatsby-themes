import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

export function useBreadcrumb() {
  const { allSitePage } = useStaticQuery(graphql`
    query BreadcrumbQuery {
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
  const result = allPages
    // filter out pages not in the current path
    .filter((d) => {
      const keep = location.pathname.includes(d.link.replace(/\/+$/, ""))
      return keep
    })
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
  return result
}
