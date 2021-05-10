import { mdxComponents } from "gatsby-theme-hypercore"
import CodeBlock from "../code-block"
import Container from "../container"
import Block from "../main/block"
import Hero from "../main/hero"

export default {
  ...mdxComponents,
  Container,
  Block,
  Hero,
  pre: CodeBlock,
}
