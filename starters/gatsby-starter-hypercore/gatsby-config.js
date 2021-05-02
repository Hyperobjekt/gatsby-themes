const metadata = require("./config/metadata.json")
module.exports = {
  siteMetadata: metadata,
  plugins: [
    {
      resolve: `gatsby-theme-hypercore`,
      options: {
        contentPath: `content/pages`,
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
