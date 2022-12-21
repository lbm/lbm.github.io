require('dotenv').config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const siteTitle = 'Lachlan Mitchell'
const siteDescription =
  'Tokyo-based cloud security engineer and cybersecurity analyst.'
const googleAnalyticsId = 'UA-125883241-1'

module.exports = {
  siteMetadata: {
    siteTitle: siteTitle,
    siteTitleAlt: siteTitle,
    siteHeadline: siteDescription,
    siteUrl: 'https://lachlan.io',
    siteDescription: siteDescription,
    siteLanguage: 'en',
    siteImage: '/banner.jpg',
    author: '@lachlanmitchell'
  },
  plugins: [
    {
      resolve: '@lekoarts/gatsby-theme-minimal-blog',
      options: {
        postsPrefix: '/blog',
        mdx: false,
        formatString: 'MMM Do YYYY',
        navigation: [
          {
            title: 'About',
            slug: '/about'
          },
          {
            title: 'Blog',
            slug: '/blog'
          }
        ],
        externalLinks: [
          {
            name: 'GitHub',
            url: 'https://github.com/lbm'
          },
          {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/lachlan-mitchell'
          },
          {
            name: 'Twitter',
            url: 'https://twitter.com/lachlanmitchell'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        lessBabel: true,
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        enableListener: true,
        preconnect: ['https://fonts.gstatic.com'],
        web: [
          {
            name: 'IBM Plex Sans',
            file: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: 'lachlan.io',
        description: siteDescription,
        start_url: '/',
        background_color: '#fff',
        theme_color: '#1a202c',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': content }]
                }
              }),
            query: `
              {
                allPost(sort: { fields: date, order: DESC }) {
                  nodes {
                    title
                    date(formatString: "MMMM D, YYYY")
                    excerpt
                    slug
                  }
                }
              }
            `,
            output: 'rss.xml',
            title: siteTitle
          }
        ]
      }
    },
    shouldAnalyseBundle && {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
        reportFilename: '_bundle.html',
        openAnalyzer: false
      }
    }
  ].filter(Boolean)
}
