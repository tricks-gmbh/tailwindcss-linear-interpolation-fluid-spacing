const plugin = require('tailwindcss/plugin')

const dynamicSpacing = plugin.withOptions(
  () => {
    return () => {
      // empty
    }
  },
  (options) => {
    const spacing = () => {
      const sizes = [
        ...Object.keys(require('tailwindcss/defaultTheme').spacing),
        ...(Object.keys(require('./tailwind.config.js').theme.extend.spacing) ?? []),
      ]
        .filter((size) => Number(size) !== 0 && !isNaN(size))
        .map((size) => `${size}`)

      const values = sizes.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: cur * 4,
        }),
        {}
      )

      const obj = {}
      const mobileLayout = options?.mobileLayout || 375
      const desktopLayout = options?.desktopLayout || 1920
      const clampMax = options?.clampMax || 2560

      for (const [size, value] of Object.entries(values)) {
        for (const [size2, value2] of Object.entries(values)) {
          if (parseFloat(size2) <= parseFloat(size)) continue
          const m = (value2 - value) / (desktopLayout - mobileLayout)
          let b = value - m * mobileLayout
          let sign = '+'
          if (b < 0) {
            sign = '-'
            b = Math.abs(b)
          }
          obj[`vw-${size}-to-${size2}`] = `clamp(${size / 4}rem, calc(${m * 100}vw ${sign} ${
            b / 16
          }rem), ${(m * clampMax + b) / 16}rem)`
        }
      }

      return obj
    }

    return {
      theme: {
        extend: {
          spacing: () => {
            return spacing()
          },
        },
      },
    }
  }
)

module.exports = dynamicSpacing
