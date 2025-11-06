// Mobile menu toggle and theme functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const themeCheckbox = document.getElementById('theme-checkbox');
    
    // Mobile menu functionality
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Theme switch functionality
    if (themeCheckbox) {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            themeCheckbox.checked = true;
            document.body.classList.add('dark-red-theme');
        }

        themeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-red-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-red-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after click
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !phone || !email || !message) {
                alert('Пожалуйста, заполните все поля формы.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email адрес.');
                return;
            }
            
            // Simulate form submission
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    // Create secret modal for forum
    const secretModal = document.createElement('div');
    secretModal.className = 'secret-modal';
    secretModal.innerHTML = `
        <div class="secret-modal-content">
            <button class="close-modal">&times;</button>
            <h2>🔞 ВНИМАНИЕ: NSFW КОНТЕНТ</h2>
            <p style="color: #FF6B6B; font-weight: bold; margin-bottom: 1rem;">
                ⚠️ Содержимое форума может содержать неподобающий контент
            </p>
            <p><small>Seven Inert Sins - место, где собирается самый настоящий треш всего колледжа. 
            Контент может быть неподобающим и содержать материалы для взрослых.</small></p>
            <div class="nsfw-warning">
                <label class="nsfw-checkbox">
                    <input type="checkbox" id="nsfw-agree">
                    <span class="checkmark"></span>
                    Я подтверждаю, что мне есть 18 лет и я соглашаюсь с просмотром NSFW контента
                </label>
            </div>
            <button class="btn forum-btn" id="enterForum" disabled>Войти на форум</button>
            <button class="btn btn-secondary" id="closeForum">Я передумал</button>
        </div>
    `;
    document.body.appendChild(secretModal);

    // Forum button functionality
    const forumBtn = document.querySelector('.forum-btn');
    const closeModalBtn = secretModal.querySelector('.close-modal');
    const closeForumBtn = secretModal.querySelector('#closeForum');
    const enterForumBtn = secretModal.querySelector('#enterForum');
    const nsfwCheckbox = secretModal.querySelector('#nsfw-agree');

    // Enable/disable enter button based on checkbox
    if (nsfwCheckbox) {
        nsfwCheckbox.addEventListener('change', function() {
            enterForumBtn.disabled = !this.checked;
        });
    }

    if (forumBtn) {
        forumBtn.addEventListener('click', function(e) {
            e.preventDefault();
            secretModal.style.display = 'flex';
        });
    }

    // Close modal functions
    const closeModal = function() {
        secretModal.style.display = 'none';
        if (nsfwCheckbox) {
            nsfwCheckbox.checked = false;
            enterForumBtn.disabled = true;
        }
    };

    closeModalBtn.addEventListener('click', closeModal);
    closeForumBtn.addEventListener('click', closeModal);

 // Enter forum with age confirmation - прямой переход на форум
    enterForumBtn.addEventListener('click', function() {
        if (nsfwCheckbox && nsfwCheckbox.checked) {
            closeModal();
            // Прямой переход на страницу форума
            window.location.href = 'forum/forum.html';
        } else {
            alert('❌ Для входа необходимо подтвердить, что вам есть 18 лет и вы согласны с просмотром NSFW контента');
        }
    });

    // Click outside modal to close
    secretModal.addEventListener('click', function(e) {
        if (e.target === secretModal) {
            closeModal();
        }
    });

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .specialty-card, .news-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .specialty-card, .news-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Check animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Stats counter animation
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

    window.addEventListener('scroll', animateStats);
});