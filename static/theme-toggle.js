function toggleTheme() {
    const body = document.body;
    const themeSwitch = document.querySelector('.theme-switch');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeSwitch.innerHTML = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeSwitch.innerHTML = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeSwitch = document.querySelector('.theme-switch');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.innerHTML = 'Light Mode';
    }
});