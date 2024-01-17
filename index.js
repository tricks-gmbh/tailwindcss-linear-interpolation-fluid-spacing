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
        ...(options?.sizes ?? Object.keys(require('tailwindcss/defaultTheme').spacing)),
        ...(options?.extend?.sizes ?? []),
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
      const xxs = 375
      const xxxl = 1920

      for (const [size, value] of Object.entries(values)) {
        for (const [size2, value2] of Object.entries(values)) {
          if (parseFloat(size2) <= parseFloat(size)) continue
          const m = (value2 - value) / (xxxl - xxs)
          let b = value - m * xxs
          let sign = '+'
          if (b < 0) {
            sign = '-'
            b = Math.abs(b)
          }
          obj[`vw-${size}-to-${size2}`] = `calc(${m * 100}vw ${sign} ${b / 16}rem)`
        }
      }

      return obj
    }

    return {
      theme: {
        extend: {
          spacing: (theme) => {
            return spacing(theme('screens'))
          },
          fontSize: (theme) => {
            return spacing(theme('screens'))
          },
        },
      },
    }
  }
)

module.exports = dynamicSpacing
