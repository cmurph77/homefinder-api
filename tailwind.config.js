/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}' /* src folder, for example */, 'node_modules/flowbite-react/lib/esm/**/*.js',],
  theme: {
    extend: {},
  },
 plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('flowbite/plugin'),
    require('autoprefixer'),
    require('tailwindcss'),
  ]
};
