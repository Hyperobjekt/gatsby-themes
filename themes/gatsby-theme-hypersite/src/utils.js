/**
 * Maps a siteMetadata social entry from social media type
 * and account name to social media icon and link
 */
export const getSocialLink = (name, value) => {
  const type = name.toLowerCase()
  // when the value is a link, use that
  if (value.indexOf("https://") === 0) return { icon: type, link: value }
  // value is an account name, so map it to a link
  const linkPrefix = {
    twitter: `https://twitter.com/`,
    email: `mailto:`,
    github: `https://github.com/`,
    instagram: `https://instagram.com/`,
    facebook: `https://facebook.com/`,
    linkedin: `https://linkedin.com/`,
    youtube: `https://youtube.com/`,
  }
  // return the value with the link prefix
  return {
    icon: type,
    link: linkPrefix[type] ? linkPrefix[type] + value : value,
  }
}
