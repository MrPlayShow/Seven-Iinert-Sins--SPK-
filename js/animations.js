// Animations and scroll effects
function initAnimations() {
    // Animate elements on scroll
    setupScrollAnimations();
    
    // Animate stats counters
    setupStatsAnimation();
    
    // Add hover effects
    setupHoverEffects();
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .specialty-card, .news-card');
    
    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check animation on scroll
    const checkAnimation = Utils.debounce(function() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, 10);
    
    // Initial check and scroll listener
    checkAnimation();
    window.addEventListener('scroll', checkAnimation);
}

function setupStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let statsAnimated = false;
    
    const animateStats = function() {
        if (statsAnimated) return;
        
        const statsTop = statsSection.getBoundingClientRect().top;
        if (statsTop < window.innerHeight - 100) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
                }, 30);
            });
        }
    };
    
    // Check stats on scroll
    window.addEventListener('scroll', Utils.debounce(animateStats, 10));
    // Initial check
    animateStats();
}

function setupHoverEffects() {
    // Add subtle hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .category-card, .news-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform || 'translateY(0)';
        });
        
        element.addEventListener('mouseleave', function() {
            if (!this.classList.contains('feature-card')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}