import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            logo
            siteUrl
            title
            description
            keywords
            image
            copyright
            menuLinks {
              name
              link
            }
            social {
              name
              value
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
