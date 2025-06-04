module.exports = {
  content: [
    "./index.html",
    "./*.html",           // ← これを追加！
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}