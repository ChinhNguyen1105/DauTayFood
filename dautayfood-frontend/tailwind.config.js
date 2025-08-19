/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.2s ease-out',
            },
            keyframes: {
                keyframes: {
                    slideInLeft: {
                        '0%': { opacity: '0', transform: 'translateX(-20px)' },
                        '100%': { opacity: '1', transform: 'translateX(0)' },
                    }
                },
                animation: {
                    slideInLeft: 'slideInLeft 0.3s ease forwards',
                },
                fadeIn: {
                    from: { opacity: '0', transform: 'translateY(-10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
