module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}', // Adjust paths as needed
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/fonts.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                orbitron: ['var(--font-orbitron)', 'sans-serif'],
            }
        },
    },
    plugins: [],
};
