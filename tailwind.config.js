/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'min-h-screen', 'bg-white', 'bg-slate-50', 'bg-slate-900',
    'flex', 'flex-col', 'flex-grow', 'items-center', 'justify-center',
    'justify-between', 'gap-2', 'gap-4', 'gap-8',
    'p-4', 'p-8', 'px-4', 'px-8', 'py-2', 'py-12', 'py-20',
    'sm:px-6', 'lg:px-8', 'md:py-32',
    'w-full', 'max-w-md', 'max-w-2xl', 'max-w-4xl', 'max-w-7xl',
    'rounded-xl', 'rounded-lg', 'rounded-md',
    'shadow-lg', 'shadow',
    'border', 'border-b', 'border-slate-300', 'border-slate-800',
    'sticky', 'top-0', 'z-50',
    'h-16', 'h-12', 'h-6', 'h-5', 'h-12', 'w-12', 'w-6', 'w-5',
    'text-xl', 'text-2xl', 'text-4xl', 'text-6xl', 'text-lg', 'text-sm',
    'font-bold', 'font-extrabold', 'font-medium',
    'text-slate-900', 'text-slate-600', 'text-slate-500', 'text-slate-400',
    'text-slate-700', 'text-blue-600', 'text-white', 'text-red-500',
    'bg-blue-600', 'bg-blue-100', 'bg-purple-100', 'bg-green-100',
    'hover:bg-blue-700', 'hover:bg-slate-100', 'hover:text-slate-900',
    'disabled:opacity-50',
    'mb-1', 'mb-4', 'mb-6', 'mb-8', 'mb-10', 'mt-2', 'mt-6',
    'space-y-4', 'text-center',
    'backdrop-blur-md', 'bg-white/80',
    'tracking-tight', 'leading-tight',
    'grid', 'md:grid-cols-3',
    'transition-colors', 'border-none',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
    'inline-flex', 'items-center', 'whitespace-nowrap',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
