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
				// Malika's custom colors with blue emphasis and new accents
				'malika-purple': '#A08BA0',
				'malika-peach': '#E6B89C',
				'malika-gold': '#D4A94C',
				'malika-light-gold': '#F1C87C',
				'malika-accent-purple': '#D2B8F2',
				'malika-dark': '#1B1B1B',
				'malika-gray': '#494949',
				'malika-green': '#627954',
				'malika-cream': '#F2EFE5',
				'malika-beige': '#C8B29B',
				'malika-light-beige': '#E3D3C4',
				'malika-burgundy': '#7E1E1E',
				'malika-pink': '#F6CFE1',
				'malika-light-pink': '#FADDEA',
				'malika-lavender': '#D2B8F2',
				'malika-light-yellow': '#F9F4BA',
				// Blue tones (her favorites) - now primary
				'malika-sky-blue': '#A7C7E7',
				'malika-light-blue': '#D6EAF8',
				'malika-powder-blue': '#AECFE8',
				'malika-soft-blue': '#C3DFF3',
				'malika-blue': '#7495BA',
				'malika-navy': '#152D5C',
				'malika-ocean': '#2E6EA6',
				'malika-cyan': '#BCE1F1',
				'malika-bright-blue': '#3C91C4',
				'malika-pale-blue': '#B9DDF3',
				'malika-off-white': '#F4F1EE',
				'malika-dusty-blue': '#ACBCD7'
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'dancing': ['Dancing Script', 'cursive'],
				'crimson': ['Crimson Text', 'serif'],
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
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'fadeInUp': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'heartbeat': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.1)'
					}
				},
				'sparkle': {
					'0%, 100%': {
						opacity: '0',
						transform: 'scale(0)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'confetti-fall': {
					'0%': {
						transform: 'translateY(-100vh) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh) rotate(720deg)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'fadeInUp': 'fadeInUp 0.8s ease-out',
				'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'confetti-fall': 'confetti-fall 3s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
