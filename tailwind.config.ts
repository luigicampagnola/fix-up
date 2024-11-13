import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fill: {
          '0%': {background: 'transparent'},
          // '25%': {background: 'linear-gradient(0deg, rgba(19,18,69,1) 25%, rgba(255,255,255,0) 25%)'},
          // '50%': {background: 'linear-gradient(0deg, rgba(19,18,69,1) 50%, rgba(255,255,255,0) 50%)'},
          '75%': {background: 'linear-gradient(0deg, rgba(19,18,69,1) 75%, rgba(255,255,255,0) 75%)'},
          //'100%': {background: '#131245'}
        }
      },
      animation: {
        fill: 'fill 1s cubic-bezier(0.4, 0, 0.2, 1) forwards'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dimgray: "#54595f",
        forestgreen: "#539544",
        midnightblue: "#131245",
      },
    },
  },
  plugins: [],
} satisfies Config;
