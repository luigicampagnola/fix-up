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
        "custom-forestgreen": "-10px 10px 0px #539544",
        "custom-forestgreen-right": "10px 10px 0px #539544",
      },
      spacing: {
        "custom-width": "calc(300% + 1.3px)",
      },
      keyframes: {
        fill: {
          "0%": { background: "transparent" },
          "75%": {
            background:
              "linear-gradient(0deg, rgba(19,18,69,1) 75%, rgba(255,255,255,0) 75%)",
          },
        },
        slideInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(96px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        fill: "fill 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "slide-up": "slideInUp 1s ease-out forwards",
        "slide-left": "slideInLeft 1s ease-out forwards",
        "slide-right": "slideInRight 1s ease-out forwards",
        "fade-up": "fadeInUp 1s ease-out forwards",
        "fade-left": "fadeInLeft 1s ease-out forwards",
        "fade-right": "fadeInRight 1s ease-out forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dimgray: "#54595F",
        forestgreen: "#539544",
        midnightblue: "#131245",
        brightgray: "#EEEEEE",
        platinum: "#e6e6e6",
        chinesesilver: "#CCCCCC",
        antiflaswhite: "#F2F1F2",
        internationOrange: "#C02B0A",
        snow: "#FFF9F9",
        metalSilver: "#9DA5AE",
      },
    },
  },
  plugins: [],
} satisfies Config;
