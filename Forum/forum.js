// Forum functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize forum
    initForum();
});

function initForum() {
    // Animate category cards on load
    animateCategoryCards();
    
    // Add event listeners
    setupEventListeners();
    
    // Show development message
    showDevMessage();
}

function animateCategoryCards() {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function setupEventListeners() {
    // Category card clicks
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });

    // New thread button
    const newThreadBtn = document.querySelector('.new-thread-btn');
    if (newThreadBtn) {
        newThreadBtn.addEventListener('click', handleNewThreadClick);
    }

    // Thread link clicks
    document.querySelectorAll('.thread-content a').forEach(link => {
        link.addEventListener('click', handleThreadClick);
    });

    // Navigation menu clicks
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

function handleCategoryClick(event) {
    event.preventDefault();
    showAlert(
        '🚧 Раздел в разработке',
        'Это демо-версия форума. Реальный функционал появится позже.'
    );
}

function handleNewThreadClick(event) {
    event.preventDefault();
    showAlert(
        '🔒 Функция недоступна',
        'Создание новых тем временно заблокировано. Форум находится в разработке.'
    );
}

function handleThreadClick(event) {
    event.preventDefault();
    showAlert(
        '📝 Пример темы',
        'Это демонстрационная тема. Реальные темы появятся после завершения разработки форума.'
    );
}

function handleNavClick(event) {
    const link = event.currentTarget;
    if (!link.classList.contains('active')) {
        event.preventDefault();
        showAlert(
            '🔧 Навигация',
            'Раздел "' + link.textContent + '" находится в разработке.'
        );
    }
}

function showAlert(title, message) {
    // Create alert modal
    const alertModal = document.createElement('div');
    alertModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    alertModal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
            padding: 2rem;
            border-radius: 15px;
            border: 2px solid #FF4500;
            max-width: 400px;
            width: 90%;
            text-align: center;
            animation: slideIn 0.3s ease;
        ">
            <h3 style="color: #FF4500; margin-bottom: 1rem;">${title}</h3>
            <p style="margin-bottom: 1.5rem; color: #e0e0e0;">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #FF4500;
                color: white;
                border: none;
                padding: 0.5rem 1.5rem;
                border-radius: 20px;
                cursor: pointer;
                font-weight: bold;
            ">Понятно</button>
        </div>
    `;
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alertModal);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertModal.parentElement) {
            alertModal.remove();
        }
    }, 5000);
}

function showDevMessage() {
    console.log(`
    🎮 Seven Inert Sins Forum - Development Mode
    ==========================================
    📍 Status: Demo Version
    🛠️  Features: Basic UI/UX
    🔒 Functionality: Limited
    📱 Responsive: Yes
    🎨 Theme: Dark Red NSFW
    
    Note: This is a demonstration version.
    Real functionality will be implemented later.
    `);
}

// Make functions globally available for HTML onclick events
window.handleCategoryClick = handleCategoryClick;
window.handleNewThreadClick = handleNewThreadClick;
window.handleThreadClick = handleThreadClick;