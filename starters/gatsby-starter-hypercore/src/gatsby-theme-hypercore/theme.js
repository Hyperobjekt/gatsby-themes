import purple from "@material-ui/core/colors/purple"
import pink from "@material-ui/core/colors/pink"
import { createTheme } from "@material-ui/core/styles"

let theme = createTheme({
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
