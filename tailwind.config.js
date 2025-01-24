// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                cambria: [
                    'Cambria',
                    'Cochin',
                    'Georgia',
                    'Times',
                    '"Times New Roman"',
                    'serif',
                ],
            },
        },
    },
    plugins: [],
}
