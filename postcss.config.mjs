const tailwind = (await import('@tailwindcss/postcss')).default;
const autoprefixer = (await import('autoprefixer')).default;

export default {
  plugins: [
    tailwind(),
    autoprefixer()
  ]
};











// // postcss.config.js
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };
