/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'sidebar-item-color': '#878a92',
                'sidebar-item-active-color': '#7269ef',
                'sidebar-item-active-bg': '#f7f7ff',
                'popup-item-hover-bg': '#f8f9fa',
                'popup-item-active-bg': '#7269ef',
                separate: '#f0eff5',
            },
            screens: {
                dl: '992px',
            },
            boxShadow: {
                navbar: '0 2px 4px rgba(15,34,58,.12)',
                popup: '0 2px 4px rgba(15,34,58,.12)',
            },
            spacing: {
                2.5: '10px',
            },
            flex: {
                5: 5,
            },
            fontSize: {
                mm: ['0.9375rem', '1.125rem'],
                base: ['1rem', '1.2rem'],
            },
            textColor: {
                primary: '#343a40',
                secondary: '#7a7f9a',
            },
        },
    },
    plugins: [],
};
