import React from "react"
import { Box, List, ListItem } from "@material-ui/core"

const TableOfContents = ({ items, ...props }) => {
  return (
    <List>
      {items.map((item) => {
        return (
          <>
            <ListItem component="a" href={item.url}>
              {item.title}
            </ListItem>
            {item.items && <TableOfContents items={item.items} />}
          </>
        )
      })}
    </List>
  )
}

const KitchenSink = ({ children, ...props }) => {
  return (
    <Box display="flex">
      <Box minWidth={320} p={3} bgcolor="background.paper">
        <Box position="sticky" top={64}>
          <TableOfContents items={props.tableOfContents.items} />
        </Box>
      </Box>
      <Box
        display="block"
        maxWidth={`calc(100vw - 320px)`}
        bgcolor="background.default"
      >
        {children}
      </Box>
    </Box>
  )
}

KitchenSink.propTypes = {}

export default KitchenSink
