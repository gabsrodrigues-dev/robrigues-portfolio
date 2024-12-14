import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'random-scale': 'scale-variation 5s ease-in-out infinite',
      },
      keyframes: {
        'scale-variation': {
          '0%, 100%': { transform: 'scale(0.92)' },
          '50%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
