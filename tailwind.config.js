/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'sidebar-item-color': '#878a92',
                'dark-sidebar-item-color': '#a6b0cf',
                'sidebar-item-active-color': '#7269ef',
                'sidebar-item-active-bg': '#f7f7ff',
                'dark-sidebar-item-active-bg': '#3e4a56',
                'popup-item-hover-bg': '#f8f9fa',
                'popup-item-active-bg': '#7269ef',
                separate: '#f0eff5',
                'dark-separate': '#36404a',
                'input-bg': '#e6ebf5',
                'dark-input-bg': 'rgb(54,64,74)',
                'sidebar-sub-bg': '#f5f7fb',
                'dark-sidebar-sub-bg': '#303841',
                'dark-sidebar-bg': '#36404a',
                light: '#e6ebf5',
                dark: '#262e35',
                'primary-color': '#7269ef',
                success: 'rgb(6,214,160)',
                danger: '#ef476f',
                'dark-popup-bg': '#313a43',
                'dark-tooltip-bg': '#f8f9fa',
                'dark-tooltip-color': '#303841',
                'tooltip-color': '#f7f7ff',
                input: '#495057',
                hoverPurple: '#554BDA',
                'pink-Purple': '#D8D9E1',
                primary: '#343a40',
                'dark-primary': '#eff2f7',
                secondary: '#7a7f9a',
                'dark-secondary': '#abb4d2',
            },
            screens: {
                ex: '480px',
                dl: '992px',
                gx: '1160px',
            },
            boxShadow: {
                navbar: '0 2px 4px rgba(15,34,58,.12)',
                popup: '0 2px 4px rgba(15,34,58,.12)',
                'phone-select': '0 2px 5px rgba(0,0,0,0.25)',
                reaction:
                    '0 12px 28px 0 rgba(0,0,0,0.2),0 2px 4px 0 rgba(0,0,0,0.1),inset 0 0 0 1px rgba(255,255,255,0.5)',
            },
            spacing: {
                2.5: '0.625rem',
            },
            flex: {
                5: 5,
            },
            fontSize: {
                ex: ['0.6875rem', 1.5],
                ss: ['0.8125rem', '0.9375rem'],
                mm: ['0.9375rem', '1.125rem'],
                base: ['1rem', '1.2rem'],
            },
            transitionDuration: {
                400: '400ms',
            },
            transitionProperty: {
                width: 'width',
            },
            transitionDelay: {
                400: '400ms',
            },
            width: {
                sidebar: '380px',
            },
            borderRadius: {
                0.75: '0.1875rem',
                1.6: '0.4rem',
            },
            zIndex: {
                1: 1,
                2: 2,
                3: 3,
                51: 51,
                9999999: 9999999,
            },
            keyframes: {
                wave: {
                    '0%, 60%, 100%': {
                        transform: 'none',
                    },
                    '30%': {
                        transform: 'translateY(-5px)',
                    },
                },
            },
            animation: {
                wave: 'wave 1.3s linear infinite',
            },
            animationDelay: {
                '-1100': '-1.1s',
                '-900': '-0.9s',
            },
            gridTemplateRows: {
                0: '0fr',
            },
            borderWidth: {
                5: '5px',
            },
        },
    },
    plugins: [require('tailwindcss-animation-delay')],
    variants: {
        animationDelay: ['responsive', 'hover'],
    },
};
