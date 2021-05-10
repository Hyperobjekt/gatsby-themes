import React from "react"
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core"
import { styled } from "@material-ui/core/styles"

export const H1 = ({ children, ...props }) => (
  <Typography gutterBottom variant="h1" {...props}>
    {children}
  </Typography>
)
export const H2 = ({ children, ...props }) => (
  <Typography gutterBottom variant="h2" {...props}>
    {children}
  </Typography>
)
export const H3 = ({ children, ...props }) => (
  <Typography gutterBottom variant="h3" {...props}>
    {children}
  </Typography>
)
export const H4 = ({ children, ...props }) => (
  <Typography gutterBottom variant="h4" {...props}>
    {children}
  </Typography>
)
export const H5 = ({ children, ...props }) => (
  <Typography gutterBottom variant="h5" {...props}>
    {children}
  </Typography>
)
export const H6 = ({ children, ...props }) => (
  <Typography gutterBottom variant="h6" {...props}>
    {children}
  </Typography>
)
export const Paragraph = ({ children, ...props }) => (
  <Typography variant="body1" {...props}>
    {children}
  </Typography>
)

export const TextListItem = ({ children, ...props }) => (
  <ListItem component="li" {...props}>
    <ListItemText>{children}</ListItemText>
  </ListItem>
)

export const BulletList = withStyles(
  (theme) => ({
    root: {
      listStyleType: "disc",
      paddingLeft: theme.spacing(2),
      margin: theme.spacing(2, 0),
      paddingTop: 0,
      paddingBottom: 0,
      "& > li": {
        display: "list-item",
        padding: 0,
      },
    },
  }),
  { name: "HypBulletList" }
)(List)

export const OrderedList = withStyles(
  (theme) => ({
    root: {
      listStyleType: "decimal",
      paddingLeft: theme.spacing(2),
      margin: theme.spacing(2, 0),
      paddingTop: 0,
      paddingBottom: 0,
      "& > li": {
        display: "list-item",
        padding: 0,
      },
    },
  }),
  { name: "HypOrderedList" }
)(List)

export const CodeInline = styled("code")((theme) => ({
  background: "#eee",
  padding: 8,
  borderRadius: 4,
}))

const MdxTableCell = ({ align, ...props }) => {
  return <TableCell align="left" {...props} />
}

const Blockquote = ({ children, ...props }) => (
  <Box
    bgcolor="grey.200"
    color="text.primary"
    p={3}
    m={0}
    mt={2}
    mb={2}
    borderLeft={`0.5rem solid`}
    borderColor="grey.300"
    {...props}
  >
    <Typography>{children}</Typography>
  </Box>
)

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  span: Typography,
  ul: BulletList,
  li: TextListItem,
  ol: (props) => <OrderedList component="ol" {...props} />,
  blockquote: Blockquote,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  td: MdxTableCell,
  th: MdxTableCell,
  hr: Divider,
  button: Button,
  a: Link,
  div: Box,
  Grid: Grid,
}

export default components
