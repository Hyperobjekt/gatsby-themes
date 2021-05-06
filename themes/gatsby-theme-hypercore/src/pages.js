import { graphql } from "gatsby"
import React from "react"
import Layout from "./layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function PagesTemplate(props) {
  const mdx = props.data.mdx
  const frontmatter = props.data.mdx.frontmatter
  const image =
    frontmatter?.seo?.image?.childImageSharp?.gatsbyImageData?.images?.fallback
      ?.src
  const seo = {
    ...(frontmatter.seo ? frontmatter.seo : {}),
    image: image ? props.location.origin + image : undefined,
  }
  console.log("page template props", props)
  return (
    <Layout seo={seo} {...props}>
      <MDXRenderer localImages={frontmatter?.embeddedImages}>
        {mdx.body}
      </MDXRenderer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        seo {
          title
          description
          keywords
          image {
            childImageSharp {
              gatsbyImageData(
                transformOptions: { fit: COVER, cropFocus: CENTER }
                width: 1200
                height: 630
              )
            }
          }
          isBlogPost
        }
        embeddedImages {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`
