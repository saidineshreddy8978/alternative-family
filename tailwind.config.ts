
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom cosmic theme colors
				cosmic: {
					50: '#f0f4ff',
					100: '#e5edff',
					200: '#cddbfe',
					300: '#b4c6fc',
					400: '#8fa2f8',
					500: '#6366f1',
					600: '#4f46e5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
				},
				aurora: {
					purple: '#8b5cf6',
					pink: '#ec4899',
					blue: '#3b82f6',
					cyan: '#06b6d4',
				},
				warm: {
					orange: '#f97316',
					yellow: '#eab308',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'aurora': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'33%': { transform: 'rotate(120deg) scale(1.1)' },
					'66%': { transform: 'rotate(240deg) scale(0.9)' },
					'100%': { transform: 'rotate(360deg) scale(1)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)' },
					'50%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'aurora': 'aurora 20s linear infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			},
			backgroundImage: {
				'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'aurora-gradient': 'linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6, #06b6d4)',
				'warm-gradient': 'linear-gradient(135deg, #f97316, #eab308)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
