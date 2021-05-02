import purple from "@material-ui/core/colors/purple"
import pink from "@material-ui/core/colors/pink"
import { createMuiTheme } from "@material-ui/core"

let theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: pink[500],
    },
  },
})

export default theme
