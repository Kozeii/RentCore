import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                rc: {
                    orange: '#FF9E20',
                    orangeDark: '#E6850A',
                    teal: '#215E61',
                    tealLight: '#2A7A7E',
                    dark: '#1D2128',
                    light: '#F5F5F5',
                },
            },
        },
    },
    plugins: [forms],
};