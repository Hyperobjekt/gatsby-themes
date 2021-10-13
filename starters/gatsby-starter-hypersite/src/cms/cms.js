import CMS from "netlify-cms-app"
import pages from "./pages"
import { config } from "@hyperobjekt/cms-config"

window.CMS_MANUAL_INIT = true

CMS.init({
  load_config_file: false,
  // remember to run npx netlify-cms-proxy-server if running locally
  local_backend: process.env.CI !== true,
  backend: {
    name: "github",
    repo: "Hyperobjekt/gatsby-starter-hypersite",
    branch: "main",
  },
  media_folder: "/static/images",
  public_folder: "/images",
  collections: [config, pages],
})
