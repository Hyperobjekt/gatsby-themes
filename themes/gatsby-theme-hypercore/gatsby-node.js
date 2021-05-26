const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

/**
 * Checks if a file or dir belongs to a parent directory
 * @param {*} dir
 * @param {*} parent
 * @returns {boolean}
 */
const isChildOf = (dir, parent) => {
  const relative = path.relative(parent, dir)
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions
  // Create a default empty array
  createFieldExtension({
    name: `defaultSubMenu`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return []
          }
          return source[info.fieldName]
        },
      }
    },
  })

  // Type definition for the submenu to ensure there is always a submenu array to query
  const subMenuTypeDefs = `
    type Site implements Node @infer {
      siteMetadata: SiteMetadata
    }
    type SiteMetadata {
      menuLinks: [MenuLinks]
      logo: String
      icon: String
    }
    type MenuLinks {
      name: String!
      link: String!
      subMenu: [SubMenu] @defaultSubMenu
    }
    type SubMenu {
      name: String
      link: String
    }
  `

  const frontmatterTypeDefs = `
    type MdxFrontmatter implements Node {
      name: String
      draft: Boolean
      path: String
      alias: String
      lang: String
      template: String
      meta: SeoFrontmatter!
      embeddedImages: [File] @fileByRelativePath
      store: [Store]
    }
    type SeoFrontmatter {
      title: String
      description: String
      keywords: String
      image: File @fileByRelativePath
      isBlogPost: Boolean
    }
    type Store {
      key: String
      value: String
    }
  `
  createTypes(subMenuTypeDefs)
  createTypes(frontmatterTypeDefs)
}

const createRedirects = (redirectNodes, createRedirect) => {
  redirectNodes.forEach((node) => {
    createRedirect({
      fromPath: node.frontmatter.alias,
      toPath: node.frontmatter.path,
      isPermanent: true,
    })
  })
}

/** 
 * Creates pages for the given provided nodes 
 */
const createPages = (pageNodes, {createPage}, themeOptions) => {
  pageNodes.forEach((node) => {
    const templateKey = node.frontmatter.template || "default"
    const hasTemplate =
      themeOptions.hasOwnProperty("layouts") &&
      themeOptions.layouts.hasOwnProperty(templateKey)
    const component = hasTemplate
      ? themeOptions.layouts[templateKey]
      : require.resolve(`./src/templates/page.js`)
    // use frontmatter path if it exists, if not fallback on filename based slug
    const pageSlug = node.frontmatter?.path || '/' + node.slug
    if (pageSlug) {
      createPage({
        path: pageSlug,
        component: component,
        context: {
          id: node.id,
          pathSlug: pageSlug,
          frontmatter: node.frontmatter,
        },
      })
    } else {
      console.warn('unable to create page (missing path)')
    }
  })
}

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          slug
          frontmatter {
            name
            draft
            path
            alias
            lang
            template
            meta {
              title
            }
          }
          fileAbsolutePath
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panic("failed to create pages ", result.errors)
  }

  // process MDX nodes that have redirects
  const redirects = result.data.allMdx.nodes.filter((node) =>
    Boolean(node.frontmatter.alias)
  )
  createRedirects(redirects, actions.createRedirect)


  // process pages
  const pagesPath = path.resolve(themeOptions.contentPath)
  // filter out pages that are outsite the theme content path and have draft status
  const pages = result.data.allMdx.nodes.filter(
    (node) =>
      isChildOf(node.fileAbsolutePath, pagesPath) &&
      (node.frontmatter.draft !== true || process.env.PUBLISH_DRAFTS)
  )
  createPages(pages, actions, themeOptions)
}
