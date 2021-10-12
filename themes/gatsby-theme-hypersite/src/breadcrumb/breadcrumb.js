import React from "react"
import PropTypes from "prop-types"
import SeparatorIcon from "../icons/separator"
import ArrowDropDownIcon from "../icons/dropdown"
import { GatsbyLink } from "gatsby-theme-material-ui"
import { HorizontalNavigation } from "@hyperobjekt/material-ui-website"
import { withStyles } from "@material-ui/core"
import { Block } from "@hyperobjekt/material-ui-website/lib/block"
import clsx from "clsx"

export const styles = (theme) => ({
  root: {
    position: "relative",
    zIndex: 10,
  },
  container: {},
  navigation: {
    marginLeft: theme.spacing(-2),
  },
  depth0: {
    "& $link, & $listItem": {
      background: "transparent",
    },
  },
  depth1: {
    left: theme.spacing(2),
    maxHeight: "66vh",
    overflow: "auto",
    minWidth: 160,
    zindex: 10,
    "& $listItem": {
      background: theme.palette.primary.main,
      "&:hover $link, &:focus-within $link": {
        background: theme.palette.action.hover,
      },
    },
    "& $link": {
      color: theme.palette.primary.contrastText,
    },
  },
  list: {},
  listItem: {
    "&:hover > $link, &:focus-within > $link": {
      background: "transparent",
      textDecoration: "underline",
    },
  },
  listItemActive: {},
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  linkActive: {},
  arrow: {},
  separator: {
    display: "flex",
    alignItems: "center",
    "& > svg": { fontSize: 16, margin: "auto" },
  },
})

export const Breadcrumb = ({
  className,
  classes,
  links,
  NavigationProps,
  ...props
}) => {
  const { root, container, navigation, ...navClasses } = classes
  return links && links.length > 1 ? (
    <Block
      small
      className={clsx("HypBreadcrumb-root", root, className)}
      ContainerProps={{
        className: clsx("HypBreadcrumb-container", container),
      }}
      {...props}
    >
      <HorizontalNavigation
        classes={{
          root: clsx("HypBreadcrumb-navigation", navigation),
          ...navClasses,
        }}
        LinkComponent={GatsbyLink}
        isGatsbyLink={true}
        links={links}
        ArrowIcon={ArrowDropDownIcon}
        separator={<SeparatorIcon />}
        {...NavigationProps}
      />
    </Block>
  ) : null
}

Breadcrumb.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  NavigationProps: PropTypes.object,
}

export default withStyles(styles, { name: "HypBreadcrumb" })(Breadcrumb)
