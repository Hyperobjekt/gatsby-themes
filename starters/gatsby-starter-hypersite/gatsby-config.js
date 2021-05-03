const metadata = require("./config/metadata.json")
module.exports = {
  siteMetadata: metadata,
  plugins: [
    {
      resolve: `gatsby-theme-hypersite`,
      options: {
        contentPath: `content/pages`,
        assetPath: `content/assets`,
      },
    },
    // {
    //   resolve: "gatsby-plugin-netlify-cms",
    //   options: {
    //     manualInit: true,
    //     modulePath: `${__dirname}/src/cms/cms.js`,
    //   },
    // },
  ],
}
