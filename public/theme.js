// public/js/theme.js
const darkModePreference = localStorage.getItem('darkMode') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.getElementById('toggle').checked = true;
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('toggle').checked = false;
    }
    localStorage.setItem('darkMode', theme);
}

setTheme(darkModePreference);

document.getElementById('toggle').addEventListener('change', function() {
    setTheme(this.checked ? 'dark' : 'light');
});
