import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        customRed: {
          DEFAULT: '#FC5B3F',
          light: '#f3816d',
          lighter: '#F5B2A6',
        },
        customGrey: '#8C897D',
        customBlue: '#1A4F63',
        customGreen: '#6FB07F',
      },
      borderColor: {
        customRed: '#FC5B3F',
      },
      fontSize: {
        larger: '2rem',
        smaller: '1rem',
      },
    },
  },
  plugins: [],
};
export default config;
