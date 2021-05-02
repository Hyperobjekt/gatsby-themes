module.exports = (themeOptions) => {
  const contentPath = themeOptions.contentPath || `content/pages`
  const assetPath = themeOptions.assetPath || `content/assets`
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

  return {
    contentPath,
    assetPath,
    materialOptions,
    remarkImagesWidth: 1440,
  }
}
