import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { Box, withStyles } from "@material-ui/core"
import Container from "../container"

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 0),
  },
  container: {},
})

const Block = ({
  classes,
  className,
  children,
  component,
  ContainerProps,
  ...props
}) => {
  const Component = component
  return (
    <Component className={clsx(classes.root, className)} {...props}>
      <Container className={clsx(classes.container)} {...ContainerProps}>
        {children}
      </Container>
    </Component>
  )
}

Block.defaultProps = {
  component: Box,
  ContainerProps: {},
}

Block.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default withStyles(styles)(Block)
