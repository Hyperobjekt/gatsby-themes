import { graphql } from "gatsby"
import React from "react"
import Layout from "./layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function PagesTemplate(props) {
  const mdx = props.data.mdx
  const frontmatter = props.data.mdx.frontmatter
  const image =
    frontmatter?.meta?.image?.childImageSharp?.gatsbyImageData?.images?.fallback
      ?.src
  const seo = {
    ...(frontmatter?.meta || {}),
    image: image ? props.location.origin + image : undefined,
  }
  return (
    <Layout seo={seo} {...props}>
      <MDXRenderer meta={seo} localImages={frontmatter?.embeddedImages}>
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
        meta {
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
