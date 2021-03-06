const path = require("path")
const metadata = require("./config/metadata.json")
module.exports = {
  siteMetadata: metadata,
  plugins: [
    {
      resolve: `gatsby-theme-hypersite`,
      options: {
        contentPath: `content/pages`,
        assetPath: `content/assets`,
        templates: {
          customFrontmatter: path.resolve(
            "./src/templates/customFrontmatter.js"
          ),
        },
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        manualInit: true,
        modulePath: `./src/cms/cms.js`,
      },
    },
  ],
}
