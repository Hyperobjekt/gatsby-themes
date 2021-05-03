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
      type: String
    }
  `

  const frontmatterTypeDefs = `
    type MdxFrontmatter implements Node {
      publish: Boolean
      path: String
      alias: String
      lang: String
      template: String
      seo: SeoFrontmatter
    }
    type SeoFrontmatter {
      title: String
      description: String
      keywords: String
      image: String
      isBlogPost: Boolean
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

const createPages = (pageNodes, createPage, themeOptions) => {
  pageNodes.forEach((node) => {
    const templateKey = node.frontmatter.template || "default"
    const hasTemplate =
      themeOptions.hasOwnProperty("layouts") &&
      themeOptions.layouts.hasOwnProperty(templateKey)
    const component = hasTemplate
      ? themeOptions.layouts[templateKey]
      : require.resolve(`./src/pages.js`)
    createPage({
      path: node.frontmatter.path,
      component: component,
      context: {
        id: node.id,
        pathSlug: node.frontmatter.path,
        frontmatter: node.frontmatter,
      },
    })
  })
}

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            publish
            path
            alias
            lang
            template
            seo {
              title
              description
              keywords
              image
              isBlogPost
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

  const redirects = result.data.allMdx.nodes.filter((node) =>
    Boolean(node.frontmatter.alias)
  )
  createRedirects(redirects, actions.createRedirect)

  const pagesPath = path.resolve(themeOptions.contentPath)
  // only create pages for files in the content path
  const pages = result.data.allMdx.nodes.filter(
    (node) =>
      isChildOf(node.fileAbsolutePath, pagesPath) &&
      Boolean(node.frontmatter.path) &&
      (node.frontmatter.publish === true ||
        process.env.NODE_ENV !== "production")
  )
  createPages(pages, actions.createPage, themeOptions)
}
