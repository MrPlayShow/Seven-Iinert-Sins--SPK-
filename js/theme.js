// Theme switching functionality
function initTheme() {
    const themeCheckbox = document.getElementById('theme-checkbox');
    
    if (!themeCheckbox) return;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        themeCheckbox.checked = true;
        document.body.classList.add('dark-red-theme');
    }
    
    // Theme switch event listener
    themeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-red-theme');
            localStorage.setItem('theme', 'dark');
            console.log('🎨 Темная тема активирована');
        } else {
            document.body.classList.remove('dark-red-theme');
            localStorage.setItem('theme', 'light');
            console.log('🎨 Светлая тема активирована');
        }
    });
    
    // Add theme change animation
    const style = document.createElement('style');
    style.textContent = `
        body {
            transition: background-color 0.5s ease, color 0.5s ease;
        }
        .dark-red-theme {
            transition: background-color 0.5s ease, color 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}