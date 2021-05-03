import React from "react"
import { Box, Container } from "@material-ui/core"

export default function Layout(props) {
  const children = props.children
  return (
    <Box component="main" m={5} pt={6} pb={6} flex={1}>
      <Container>{children}</Container>
    </Box>
  )
}
