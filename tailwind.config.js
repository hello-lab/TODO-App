const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // toggles with .dark class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(date-input|toggle|form).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
        hand: "var(--font-hand)", // 👈 Custom font variable
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",

        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },

        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },

        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },

        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },

        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },

        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },

        destructive: "var(--color-destructive)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",

        chart: {
          1: "var(--color-chart-1)",
          2: "var(--color-chart-2)",
          3: "var(--color-chart-3)",
          4: "var(--color-chart-4)",
          5: "var(--color-chart-5)",
        },

        sidebar: {
          DEFAULT: "var(--color-sidebar)",
          foreground: "var(--color-sidebar-foreground)",
          primary: "var(--color-sidebar-primary)",
          primaryForeground: "var(--color-sidebar-primary-foreground)",
          accent: "var(--color-sidebar-accent)",
          accentForeground: "var(--color-sidebar-accent-foreground)",
          border: "var(--color-sidebar-border)",
          ring: "var(--color-sidebar-ring)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),heroui()],
};
