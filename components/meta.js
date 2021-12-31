import Head from 'next/head'
import theme from '../lib/theme'

const makeTitle = (title, name) =>
  title === name ? title : `${title}`

const Meta = ({
  title = 'Year in Emoji', // page title
  name = 'Year in Emoji', // site name
  description = 'Build a virtual sticker wall from hackathons and conferences you attend.', // page description
  image = 'https://cloud-e40xxir4e-hack-club-bot.vercel.app/0facebook_post_-_109.png', // social card image URL
  url = 'https://stickerwall.vercel.app',
  children,
  twitter_type = 'summary_large_image'
}) => (
  <Head>
    <meta key="og_locale" property="og:locale" content="en_US" />
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content={name} />
    <title key="title">{makeTitle(title, name)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title, name)} />
    <meta
      key="tw_title"
      name="twitter:title"
      content={makeTitle(title, name)}
    />
    {description && (
      <>
        <meta key="desc" name="description" content={description} />
        <meta key="og_desc" property="og:description" content={description} />
        <meta key="tw_desc" name="twitter:description" content={description} />
      </>
    )}
    {image && (
      <>
        <meta key="og_img" property="og:image" content={image} />
        <meta key="tw_img" name="twitter:image" content={image} />
      </>
    )}
    <meta key="tw_card" name="twitter:card" content={twitter_type} />
    <meta key="theme_color" name="theme-color" content={theme.colors.primary} />
    <link key="manifest" rel="manifest" href={`${url}/site.webmanifest`} />
    {children}
  </Head>
)

export default Meta
