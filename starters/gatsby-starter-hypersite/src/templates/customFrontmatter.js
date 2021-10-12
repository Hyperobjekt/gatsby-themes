import { graphql } from "gatsby"
import { PageTemplate } from "gatsby-theme-hypercore"

export default PageTemplate

export const pageQuery = graphql`
  query CustomQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      slug
      frontmatter {
        name
        meta {
          title
          description
          keywords
        }
        links {
          name
          href
        }
      }
    }
  }
`
