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
  if (!frontmatter) return null
  const metaImage = frontmatter.meta?.image
  const gatsbyImage =
    metaImage &&
    metaImage.childImageSharp?.gatsbyImageData?.images?.fallback?.src
  if (gatsbyImage) return gatsbyImage
  if (metaImage) return metaImage
  return null
}

/** 
 * Maps the key value string store in frontmatter to a JSON object
 * available in `props.store` of the MDX body.
 */
const getKeyValueStore = (store) => {
  if (Array.isArray(store))
    return store.reduce((obj, { key, value}) => {
      obj[key] = value
      return obj
    }, {})
  return {}
}

export default function PagesTemplate(props) {
  const mdx = props.data.mdx
  const frontmatter = mdx.frontmatter || {}
  const image = getSocialImage(frontmatter)
  const seo = frontmatter.meta || {}
  if (image) seo.image = image
  const store = getKeyValueStore(frontmatter.store)
  const localImages = frontmatter.embeddedImages || []
  return (
    <Layout meta={seo} {...props}>
      {/* props passed to MDXRenderer are available in the MDX body */}
      <MDXRenderer
        frontmatter={frontmatter}
        meta={seo}
        store={store}
        localImages={localImages}
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
      slug
      timeToRead
      tableOfContents
      wordCount {
        sentences
        words
      }
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
        store {
          key
          value
        }
      }
    }
  }
`
