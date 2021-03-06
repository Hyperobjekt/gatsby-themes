const remarkSlug = require("remark-slug")
const withDefaults = require(`./src/default-options`)

module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions)
  const remarkImagesOptions = options.remarkImagesOptions
  const gatsbyRemarkPlugins = [
    {
      resolve: `gatsby-remark-relative-images`,
      options: {},
    },
    {
      resolve: `gatsby-remark-images`,
      options: remarkImagesOptions,
    },
    {
      resolve: `gatsby-remark-copy-linked-files`,
      options: {
        destinationDir: options.assetPath || `content/assets`,
      },
    },

    { resolve: `gatsby-remark-smartypants` },
    { resolve: `gatsby-remark-external-links` },
  ]
  const remarkPlugins = [remarkSlug]
  return {
    siteMetadata: {
      title: `Placeholder title`,
      description: `Placeholder description`,
      keywords: [`gatsby`],
      author: `Placeholder author`,
      siteUrl: `https://www.gatsbyjs.org`, //Change to you site address, required for sitemap.xml and robots.txt file among other things
      menuLinks: [
        {
          name: `Placeholder Menu Link`,
          link: `/`,
          type: `internal`, //internal or anchor
        },
      ],
      social: [
        {
          name: `Placeholder social link`,
          value: `https://www.gatsbyjs.org`,
        },
      ],
      copyright: "Website copyright notice " + new Date().getFullYear(),
    },
    plugins: [
      `gatsby-remark-images`,
      "gatsby-plugin-react-helmet",
      "gatsby-plugin-sitemap",
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          defaultLayouts: {
            default: require.resolve("./src/templates/page.js"),
          },
          gatsbyRemarkPlugins: gatsbyRemarkPlugins,
          remarkPlugins: remarkPlugins,
          commonmark: true,
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "pages",
          path: options.contentPath || `content/pages`,
        },
        __key: "pages",
      },
      {
        resolve: "gatsby-theme-material-ui",
        options: options.materialOptions,
      },
      `gatsby-plugin-image`,
      {
        resolve: `gatsby-plugin-sharp`,
        options: {
          defaults: {
            quality: 70,
            formats: ["auto", "webp", "avif"],
            placeholder: "blurred",
          },
        },
      },
      `gatsby-transformer-sharp`,
    ].filter(Boolean),
  }
}
