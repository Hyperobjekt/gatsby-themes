import React from "react"
import Providers from "./src/providers"

/**
 * Wrap providers for site (MDXProvider + SiteContext)
 */
export const wrapRootElement = ({ element }) => <Providers>{element}</Providers>
