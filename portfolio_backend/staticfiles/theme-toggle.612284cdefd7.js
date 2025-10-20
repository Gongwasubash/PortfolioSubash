function toggleTheme() {
    const body = document.body;
    const themeSwitch = document.querySelector('.theme-switch');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeSwitch.innerHTML = '☀️ Light';
        localStorage.setItem('theme', 'dark');
    } else {
        themeSwitch.innerHTML = '🌙 Dark';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeSwitch = document.querySelector('.theme-switch');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.innerHTML = '☀️ Light';
    } else {
        themeSwitch.innerHTML = '🌙 Dark';
    }
    
    // Add smooth transition after page load
    setTimeout(() => {
        document.body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 100);
});