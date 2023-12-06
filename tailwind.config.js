/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./page-components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./gui-components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "0.75rem",
    },
    extend: {
      spacing: {
        0: "0",
        2: "2px",
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        56: "56px",
        64: "64px",
        88: "88px",
        104: "104px",
        144: "144px",
        160: "160px",
        216: "216px",
        248: "248px",
      },
      colors: {
        transparent: "transparent",
        black: {
          100: "rgba(7, 0, 14, 1)",
          80: "rgba(7, 0, 14, 0.8)",
          60: "rgba(7, 0, 14, 0.6)",
          40: "rgba(7, 0, 14, 0.4)",
          20: "rgba(7, 0, 14, 0.2)",
          10: "rgba(7, 0, 14, 0.1)",
          5: "rgba(7, 0, 14, 0.05)",
        },
        white: {
          100: "rgb(255, 255, 255, 1)",
          80: "rgb(255, 255, 255, 0.8)",
          60: "rgb(255, 255, 255, 0.6)",
          40: "rgb(255, 255, 255, 0.4)",
          20: "rgb(255, 255, 255, 0.2)",
          10: "rgb(255, 255, 255, 0.1)",
          5: "rgb(255, 255, 255, 0.05)",
        },
        "deep-purple": {
          100: "rgb(49, 17, 91, 1)",
          80: "rgb(49, 17, 91, 0.8)",
          60: "rgb(49, 17, 91, 0.6)",
          40: "rgb(49, 17, 91, 0.4)",
          20: "rgb(49, 17, 91, 0.2)",
          10: "rgb(49, 17, 91, 0.1)",
          5: "rgb(49, 17, 91, 0.05)",
        },
        purple: {
          100: "rgb(151, 71, 255, 1)",
          80: "rgb(151, 71, 255, 0.8)",
          60: "rgb(151, 71, 255, 0.6)",
          40: "rgb(151, 71, 255, 0.4)",
          20: "rgb(151, 71, 255, 0.2)",
          10: "rgb(151, 71, 255, 0.1)",
          5: "rgb(151, 71, 255, 0.05)",
        },
        supplementary: {
          "warm-gray": "rgb(243, 236, 238)",
        },
        signal: {
          red: "rgb(255, 54, 114)",
        },
      },
    },
    dropShadow: {
      "text-input": "0 0px 8px rgba(65, 28, 113, 1)",
    },
    flexGrow: {
      0: 0,
      1: 1,
      2: 2,
    },
    borderRadius: {
      40: "40px",
    },
    translate: {
      "neg-1/2": "-50%",
      "1/2": "50%",
    },
    plugins: [],
  },
};
