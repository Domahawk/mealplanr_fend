import {ref} from "vue";

export default function useTheme() {

    const theme = ref('light');

    const toggleTheme = (newTheme: 'light' | 'dark' | 'neon') => {
        console.log(newTheme);

        theme.value = newTheme;
        let htmlElement = document.getElementById('root');
        htmlElement?.setAttribute('color-mode', theme.value);
        localStorage.setItem('theme', theme.value);
    }

    // Initialize theme from local storage or system preference
    function initTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            theme.value = storedTheme;
        }

        document.documentElement.setAttribute('color-mode', theme.value);
    }

    return { theme, toggleTheme, initTheme };
}