module.exports = (themeOptions) => {
  // content path for site pages
  const contentPath = themeOptions.contentPath || `content/pages`

  // location for linked assets to be copied to via gatsby-remark-copy-linked-files
  const assetPath = themeOptions.assetPath || `content/assets`

  // Options passed to gatsby-theme-material-ui
  // TODO: Currently, material theme requires a font to be set in webFontsConfig
  //        find a way to make this optional for cases where we're not using google fonts
  const materialOptions = themeOptions.materialOptions || {
    webFontsConfig: {
      fonts: {
        google: [
          {
            family: "Oswald",
            variants: ["500"],
          },
        ],
      },
    },
  }

  // options for optimizing images linked in markdown using gatsby-remark-images
  const remarkImagesOptions = {
    maxWidth: 1440,
    quality: 80,
    linkImagesToOriginal: false,
    withWebp: true,
    backgroundColor: `transparent`,
  }

  return {
    contentPath,
    assetPath,
    materialOptions,
    remarkImagesOptions,
  }
}
