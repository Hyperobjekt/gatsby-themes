import CMS from "netlify-cms-app"
import options from "./options"

window.CMS_MANUAL_INIT = true

CMS.init({
  config: options,
})
