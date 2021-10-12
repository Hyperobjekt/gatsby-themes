import { createFolderCollection } from "@hyperobjekt/cms-config"

const pages = createFolderCollection({
  label: "Pages",
  folder: "content/pages",
  media_folder: "/content/pages/images",
  public_folder: "./images",
})

export default pages
