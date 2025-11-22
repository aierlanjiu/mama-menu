/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 这行配置很重要，让Tailwind处理你的组件文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
