// Form handling functionality
function initForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            submitForm(this);
        }
    });
    
    // Add real-time validation
    setupRealTimeValidation();
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    // Clear previous errors
    clearErrors();
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
            showError(input, getErrorMessage(input));
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch (field.type) {
        case 'text':
            return value.length >= 2;
        case 'tel':
            return validatePhone(value);
        case 'email':
            return validateEmail(value);
        case 'textarea':
            return value.length >= 10;
        default:
            return true;
    }
}

function validatePhone(phone) {
    const phoneRegex = /^(\+7|8)[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getErrorMessage(field) {
    switch (field.type) {
        case 'text':
            return 'Имя должно содержать минимум 2 символа';
        case 'tel':
            return 'Введите корректный номер телефона';
        case 'email':
            return 'Введите корректный email адрес';
        case 'textarea':
            return 'Сообщение должно содержать минимум 10 символов';
        default:
            return 'Заполните это поле';
    }
}

function showError(field, message) {
    field.style.borderColor = '#dc2626';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        color: #dc2626;
        font-size: 0.8rem;
        margin-top: 0.3rem;
        display: block;
    `;
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearErrors() {
    // Remove error messages
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    
    // Reset border colors
    document.querySelectorAll('.form-control').forEach(field => {
        field.style.borderColor = '';
    });
}

function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!validateField(this)) {
                showError(this, getErrorMessage(this));
            }
        });
        
        input.addEventListener('input', function() {
            clearErrors();
            this.style.borderColor = '';
        });
    });
}

function submitForm(form) {
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('✅ Сообщение отправлено!', 'success');
        
        // Reset form
        form.reset();
        clearErrors();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        console.log('📧 Форма успешно отправлена');
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}