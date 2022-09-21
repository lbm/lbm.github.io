import originalTheme from '@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index'
import { lighten } from '@theme-ui/color'
import { merge } from 'theme-ui'

const theme = merge(originalTheme, {
  buttons: {
    primary: {
      '&:hover': {
        bg: lighten('primary', 0.05),
        cursor: 'pointer'
      }
    }
  }
})

export default theme
