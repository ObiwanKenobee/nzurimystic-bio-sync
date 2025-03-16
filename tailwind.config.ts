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
			padding: '1.5rem',
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
				nzuri: {
					green: {
						light: '#2d5d2a',
						DEFAULT: '#1a3a1a',
						dark: '#142814',
					},
					blue: {
						light: '#0ea5e9',
						DEFAULT: '#0284c7',
						dark: '#1e40af',
					},
					gold: {
						light: '#fbbf24',
						DEFAULT: '#d97706',
						dark: '#92400e',
					},
					earth: {
						light: '#f3f4f6',
						DEFAULT: '#e5e7eb',
						dark: '#d1d5db',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'inherit': 'inherit',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'glow': {
					'0%, 100%': { 
						'box-shadow': '0 0 10px 2px rgba(14, 165, 233, 0.3)',
						'border-color': 'rgba(14, 165, 233, 0.5)'
					},
					'50%': { 
						'box-shadow': '0 0 20px 5px rgba(14, 165, 233, 0.6)',
						'border-color': 'rgba(14, 165, 233, 0.8)'
					}
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'expand': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'shimmer': {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' }
				},
				'morph': {
					'0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
					'25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
					'50%': { borderRadius: '50% 60% 30% 60% / 40% 30% 70% 50%' },
					'75%': { borderRadius: '60% 40% 60% 30% / 60% 40% 60% 40%' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						'box-shadow': '0 0 10px 2px rgba(14, 165, 233, 0.3)'
					},
					'50%': { 
						'box-shadow': '0 0 25px 10px rgba(14, 165, 233, 0.5)'
					}
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'neural-pulse': {
					'0%, 100%': { 
						transform: 'scale(1)',
						opacity: '0.8'
					},
					'50%': { 
						transform: 'scale(1.05)',
						opacity: '1'
					}
				},
				'organic-flow': {
					'0%': { 
						backgroundPosition: '0% 50%',
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
					},
					'50%': { 
						backgroundPosition: '100% 50%',
						borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%'
					},
					'100%': { 
						backgroundPosition: '0% 50%',
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
					}
				},
				'node-activation': {
					'0%': { 
						boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)'
					},
					'70%': { 
						boxShadow: '0 0 0 15px rgba(34, 197, 94, 0)'
					},
					'100%': { 
						boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)'
					}
				},
				'text-breathing': {
					'0%, 100%': {
						backgroundSize: '100% 100%'
					},
					'50%': {
						backgroundSize: '200% 100%'
					}
				},
				// New keyframes
				'scrollIndicator': {
					'0%, 100%': { transform: 'translateY(-100%)' },
					'50%': { transform: 'translateY(100%)' }
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'subtle-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 12s linear infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'expand': 'expand 0.5s ease-out',
				'shimmer': 'shimmer 2s infinite linear',
				'morph': 'morph 8s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'neural-pulse': 'neural-pulse 4s ease-in-out infinite',
				'organic-flow': 'organic-flow 15s ease-in-out infinite',
				'node-activation': 'node-activation 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'text-breathing': 'text-breathing 8s ease-in-out infinite',
				// New animations
				'scroll-indicator': 'scrollIndicator 2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'subtle-bounce': 'subtle-bounce 2s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'circuit-pattern': "url('/circuit-pattern.svg')",
				'hero-texture': "url('/hero-texture.svg')",
				'neural-gradient': 'linear-gradient(90deg, rgba(42, 93, 42, 0.2) 0%, rgba(14, 165, 233, 0.2) 50%, rgba(42, 93, 42, 0.2) 100%)',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Poppins', 'sans-serif'],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						color: 'var(--foreground)',
						lineHeight: '1.75',
						'> p': {
							marginTop: '1.5em',
							marginBottom: '1.5em',
						},
					},
				},
			},
			letterSpacing: {
				tighter: '-0.05em',
				tight: '-0.025em',
				normal: '0',
				wide: '0.025em',
				wider: '0.05em',
				widest: '0.1em',
			},
			lineHeight: {
				tighter: '1.1',
				tight: '1.25',
				snug: '1.375',
				normal: '1.5',
				relaxed: '1.625',
				loose: '2',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
