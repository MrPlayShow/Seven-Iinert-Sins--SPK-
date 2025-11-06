// Modal window functionality for forum access
function initModal() {
    createSecretModal();
    setupForumButton();
}

function createSecretModal() {
    // Check if modal already exists
    if (document.querySelector('.secret-modal')) return;
    
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
    
    setupModalEvents();
}

function setupModalEvents() {
    const secretModal = document.querySelector('.secret-modal');
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
    
    // Enter forum with age confirmation
    enterForumBtn.addEventListener('click', function() {
        if (nsfwCheckbox && nsfwCheckbox.checked) {
            closeModal();
            // Redirect to forum
            window.location.href = 'forum/forum.html';
        } else {
            showNotification('❌ Подтвердите, что вам есть 18 лет', 'error');
        }
    });
    
    // Click outside modal to close
    secretModal.addEventListener('click', function(e) {
        if (e.target === secretModal) {
            closeModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && secretModal.style.display === 'flex') {
            closeModal();
        }
    });
}

function setupForumButton() {
    const forumBtn = document.querySelector('.forum-btn');
    
    if (forumBtn) {
        forumBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const secretModal = document.querySelector('.secret-modal');
            secretModal.style.display = 'flex';
        });
    }
}

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .secret-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        align-items: center;
        justify-content: center;
    }
    
    .secret-modal-content {
        background: linear-gradient(135deg, #1f2937, #111827);
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid #dc2626;
        max-width: 500px;
        width: 90%;
        text-align: center;
        color: white;
        position: relative;
        animation: modalAppear 0.5s ease-out;
    }
    
    @keyframes modalAppear {
        from {
            opacity: 0;
            transform: scale(0.7) translateY(-50px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        color: #9ca3af;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .close-modal:hover {
        color: #dc2626;
    }
    
    .nsfw-warning {
        margin: 1.5rem 0;
        padding: 1rem;
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid #FF6B6B;
        border-radius: 8px;
    }
    
    .nsfw-checkbox {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        cursor: pointer;
        font-size: 0.9rem;
        color: #e0e0e0;
    }
    
    .nsfw-checkbox input {
        display: none;
    }
    
    .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid #FF6B6B;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.3s ease;
    }
    
    .nsfw-checkbox input:checked + .checkmark {
        background: #FF6B6B;
        border-color: #FF6B6B;
    }
    
    .nsfw-checkbox input:checked + .checkmark:after {
        content: '✓';
        color: white;
        font-weight: bold;
    }
    
    .btn:disabled {
        background: #666 !important;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
    }
`;
document.head.appendChild(modalStyles);