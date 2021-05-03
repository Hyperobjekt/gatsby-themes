# Hyperobjekt Gatsby Themes

## Themes

- `gatsby-theme-hypercore`: provides core page creation functionality with MDX integration
- `gatsby-theme-hypersite`: builds off of `gatsby-theme-hypercore` and provides basic website components and some custom MDX components (e.g. `Block`, `Container`, `Hero`)

## Roadmap

- add common components to `gatsby-theme-hypersite`
- add `gatsby-theme-hyperblog` for blog functionality based of [gatsby-theme-blog-core](https://github.com/gatsbyjs/themes/tree/master/packages/gatsby-theme-blog-core)

## Getting Started

This is a monorepo managed with yarn / lerna, install lerna using:

```
npm i -g lerna
```

### Developing

You can start development on a theme by running on of the following, depending on which theme you want to contribute to:

```
yarn develop:core
```

```
yarn develop:site
```

### Publishing

Publish themes with:

```
npx lerna publish
```
