module.exports = {
  content: [
    "./index.html",
    "./*.html",           // ← これを追加！
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        georgia: ['Georgia', 'Times New Roman', 'Times', 'serif'],
      }
    },
  },
  plugins: [],
}