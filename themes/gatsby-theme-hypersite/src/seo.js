import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { useSiteMetadata } from "gatsby-theme-hypercore"
import * as _pick from "lodash.pick"

export const SEO_KEYS = ["title", "description", "keywords", "image"]

export function Seo({
  isBlogPost,
  title,
  description,
  keywords,
  image,
  url,
  twitter,
}) {
  return (
    <Helmet>
      {/* General tags */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {image && <meta name="image" content={image} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* OpenGraph tags */}
      {url && <meta property="og:url" content={url} />}
      {isBlogPost && <meta property="og:type" content="article" />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card tags */}
      {image && <meta name="twitter:card" content="summary_large_image" />}
      {twitter && <meta name="twitter:creator" content={twitter} />}
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}

function SeoWithDefaults(props) {
  const siteMetadata = useSiteMetadata()
  const twitter = Array.isArray(siteMetadata.social)
    ? siteMetadata.social.find((s) => s.name?.toLowerCase() === "twitter")
    : null
  const defaultProps = _pick(siteMetadata, SEO_KEYS)
  const seoProps = {
    ...defaultProps,
    twitter: twitter?.value,
    ...props,
  }
  return <Seo {...seoProps} />
}

SeoWithDefaults.propTypes = {
  isBlogPost: PropTypes.bool,
}

SeoWithDefaults.defaultProps = {
  isBlogPost: false,
}

export default SeoWithDefaults
