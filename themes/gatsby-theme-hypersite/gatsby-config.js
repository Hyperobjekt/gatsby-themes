module.exports = (options) => {
  return {
    plugins: [
      {
        resolve: `gatsby-theme-hypercore`,
        options,
      },
      `gatsby-plugin-react-helmet`,
    ],
  }
}
