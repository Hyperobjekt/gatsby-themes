import { graphql } from "gatsby"
import React from "react"
import Layout from "../layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

/**
 * Pulls either a gatsby image or a image path from frontmatter
 * @param {*} frontmatter
 * @returns
 */
const getSocialImage = (frontmatter) => {
  const metaImage = frontmatter?.meta?.image
  const gatsbyImage =
    metaImage &&
    metaImage.childImageSharp?.gatsbyImageData?.images?.fallback?.src
  if (gatsbyImage) return gatsbyImage
  if (metaImage) return metaImage
  return null
}

export default function PagesTemplate(props) {
  const mdx = props.data.mdx
  const frontmatter = props.data.mdx.frontmatter
  const image = getSocialImage(frontmatter)
  const seo = {
    ...(frontmatter?.meta || {}),
  }
  if (image) seo.image = image
  return (
    <Layout meta={seo} {...props}>
      <MDXRenderer
        frontmatter={frontmatter}
        meta={seo}
        localImages={frontmatter?.embeddedImages}
      >
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
