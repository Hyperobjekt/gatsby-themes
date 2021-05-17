import { mdxComponents } from "gatsby-theme-hypercore"
import CodeBlock from "../code-block"
import Container from "../container"
import Block from "../main/block"
import Hero from "../main/hero"
import { Box } from "@material-ui/core"

export default {
  ...mdxComponents,
  Container,
  Block,
  Hero,
  Box,
  pre: CodeBlock,
}
