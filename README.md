# tailwindcss-linear-interpolation-fluid-spacing

A Tailwind CSS plugin that provides linear interpolated fluid-responsive spacings between two viewport widths.

Inspired by
* https://github.com/ixkaito/tailwindcss-fluid-spacing
* https://jakobud.medium.com/css-polyfluidsizing-using-calc-vw-breakpoints-and-linear-equations-8e15505d21ab
* https://github.com/ttober

## Installation

Install the plugin from npm:

```sh
npm install -D git+https://github.com/tricks-gmbh/tailwindcss-linear-interpolation-fluid-spacing
```
or
```sh
yarn add -D git+https://github.com/tricks-gmbh/tailwindcss-linear-interpolation-fluid-spacing
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-linear-interpolation-fluid-spacing'),
    // ...
  ],
}
```

## License

MIT
