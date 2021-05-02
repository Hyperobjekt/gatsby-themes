import { graphql } from "gatsby"
import React from "react"
import Layout from "./layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function PagesTemplate(props) {
  const mdx = props.data.mdx
  return (
    <Layout {...props}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
