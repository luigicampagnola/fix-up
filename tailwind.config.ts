import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-forestgreen': '-10px 10px 0px #539544',
        'custom-forestgreen-right': '10px 10px 0px #539544',
      },
      spacing: { "custom-width": "calc(300% + 1.3px)" },
      keyframes: {
        fill: {
          "0%": { background: "transparent" },
          // '25%': {background: 'linear-gradient(0deg, rgba(19,18,69,1) 25%, rgba(255,255,255,0) 25%)'},
          // '50%': {background: 'linear-gradient(0deg, rgba(19,18,69,1) 50%, rgba(255,255,255,0) 50%)'},
          "75%": {
            background:
              "linear-gradient(0deg, rgba(19,18,69,1) 75%, rgba(255,255,255,0) 75%)",
          },
          //'100%': {background: '#131245'}
        },
      },
      animation: {
        fill: "fill 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dimgray: "#54595F",
        forestgreen: "#539544",
        midnightblue: "#131245",
        brightgray: "#EEEEEE",
        platinum: "#E6E6E6",
        chinesesilver: '#CCCCCC',
        antiflaswhite: '#F2F1F2',
        internationOrange: '#C02B0A',
        snow: '#FFF9F9'
      },
    },
  },
  plugins: [],
} satisfies Config;
