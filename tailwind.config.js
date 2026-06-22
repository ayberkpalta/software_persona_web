/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brew-dark': '#2B1B15',
                'brew-cream': '#FAF8F6',
                'brew-accent': '#C67C4E',
                'brew-light': '#E3D7D3',
            }
        },
    },
    plugins: [],
}