import { graphql } from "gatsby"
import React from "react"
import Layout from "../layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

/**
 * Pulls either a gatsby image or a image path from frontmatter
 * @param {*} frontmatter
 * @returns
 */
const getSocialImage = (meta) => {
  const metaImage = meta?.image
  const gatsbyImage =
    meta?.image?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
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
    return store.reduce((obj, { key, value }) => {
      obj[key] = value
      return obj
    }, {})
  return {}
}

/**
 * Processes the MDX data and returns props for the layout / renderer
 * @param {*} props
 * @returns {object}
 */
export const getMdxProps = (props) => {
  const mdx = props.data?.mdx || {}
  const { meta, embeddedImages, store, ...frontmatter } = mdx.frontmatter || {}
  const image = getSocialImage(meta)
  const seo = meta || {}
  if (image) seo.image = image
  const kvStore = getKeyValueStore(store)
  const localImages = embeddedImages || []
  return { meta: seo, frontmatter, localImages, store: kvStore, body: mdx.body }
}

export default function PagesTemplate(props) {
  const { body, ...mdxProps } = getMdxProps(props)
  return (
    <Layout {...mdxProps} {...props}>
      {body && (
        <MDXRenderer {...mdxProps} {...props}>
          {body}
        </MDXRenderer>
      )}
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
