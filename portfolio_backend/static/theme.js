// Global Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update all theme toggle buttons on the page
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(btn => {
        btn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update all theme toggle buttons
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(btn => {
        btn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
        btn.onclick = toggleTheme;
    });
}

// Run on DOM load
document.addEventListener('DOMContentLoaded', initTheme);