import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			mobile: '430px',
			tablet: '768px',
			desktop: '1280px',
			desktopL: '1440px'
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				mobile: '1rem',
				tablet: '2rem',
				desktop: '5rem'
			}
		},
		extend: {
			boxShadow: {
				'custom-forestgreen': '-10px 10px 0px #539544',
				'custom-forestgreen-right': '10px 10px 0px #539544'
			},
			spacing: {
				'custom-width': 'calc(300% + 1.3px)'
			},
			keyframes: {
				fill: {
					'0%': {
						background: 'transparent'
					},
					'75%': {
						background: 'linear-gradient(0deg, rgba(19,18,69,1) 75%, rgba(255,255,255,0) 75%)'
					}
				},
				slideInUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(24px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				slideInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-100px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				slideInRight: {
					'0%': {
						opacity: '0',
						transform: 'translateX(96px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(24px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				fadeInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				fadeInRight: {
					'0%': {
						opacity: '0',
						transform: 'translateX(50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				marquee: {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(calc(-100% - var(--gap)))'
					}
				},
				'marquee-vertical': {
					from: {
						transform: 'translateY(0)'
					},
					to: {
						transform: 'translateY(calc(-100% - var(--gap)))'
					}
				}
			},
			animation: {
				fill: 'fill 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'slide-up': 'slideInUp 1s ease-out forwards',
				'slide-left': 'slideInLeft 1s ease-out forwards',
				'slide-right': 'slideInRight 1s ease-out forwards',
				'fade-up': 'fadeInUp 1s ease-out forwards',
				'fade-left': 'fadeInLeft 1s ease-out forwards',
				'fade-right': 'fadeInRight 1s ease-out forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				marquee: 'marquee var(--duration) infinite linear',
				'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				dimgray: '#54595F',
				forestgreen: '#539544',
				midnightblue: '#131245',
				brightgray: '#EEEEEE',
				platinum: '#e6e6e6',
				chinesesilver: '#CCCCCC',
				antiflaswhite: '#F2F1F2',
				internationOrange: '#C02B0A',
				snow: '#FFF9F9',
				metalSilver: '#9DA5AE',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography'),],
} satisfies Config;
