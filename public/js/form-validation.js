// Modern form validation functions for Pixel Perfect website - 2025 UI/UX standards

// Create a form status container for screen readers
function createFormStatusContainer() {
    let statusContainer = document.getElementById('form-status-container');
    if (!statusContainer) {
        statusContainer = document.createElement('div');
        statusContainer.id = 'form-status-container';
        statusContainer.setAttribute('aria-live', 'polite');
        statusContainer.classList.add('sr-only'); // Screen reader only
        document.body.appendChild(statusContainer);
    }
    return statusContainer;
}

// Update status for screen readers
function updateFormStatus(message) {
    const statusContainer = createFormStatusContainer();
    statusContainer.textContent = message;
}

// Validate the entire form
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    
    // Reset previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Reset field styles
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.style.borderColor = '#eee';
        field.setAttribute('aria-invalid', 'false');
    });
    
    // Validate name
    if (!name) {
        displayError('name', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        displayError('name', 'Name should be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        displayError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        displayError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone (optional)
    if (phone && !isValidPhone(phone)) {
        displayError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        displayError('message', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        displayError('message', 'Please provide a more detailed message (at least 10 characters)');
        isValid = false;
    }
    
    // Update status for screen readers
    if (!isValid) {
        updateFormStatus('There are errors in the form. Please correct them and try again.');
    }
    
    return isValid;
}

// Display error with enhanced feedback
function displayError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Create error message with icon
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.setAttribute('role', 'alert'); // For accessibility
    
    // Add the error message after the input
    field.parentNode.appendChild(errorDiv);
    
    // Highlight the field with validation state
    field.style.borderColor = '#e53935';
    field.setAttribute('aria-invalid', 'true');
    
    // Add shake animation
    field.classList.add('shake-animation');
    setTimeout(() => {
        field.classList.remove('shake-animation');
    }, 500);
    
    // Focus on the first field with an error
    if (document.querySelectorAll('.error-message').length === 1) {
        field.focus();
    }
}

// Show success state for a field
function displaySuccess(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.style.borderColor = '#4caf50';
    
    // Add a subtle checkmark or visual indicator
    const parentNode = field.parentNode;
    let successIndicator = parentNode.querySelector('.success-indicator');
    
    if (!successIndicator) {
        successIndicator = document.createElement('span');
        successIndicator.className = 'success-indicator';
        successIndicator.innerHTML = '<i class="fas fa-check"></i>';
        successIndicator.style.position = 'absolute';
        successIndicator.style.right = '10px';
        successIndicator.style.top = '50%';
        successIndicator.style.transform = 'translateY(-50%)';
        successIndicator.style.color = '#4caf50';
        successIndicator.style.fontSize = '16px';
        
        // Make sure parent has relative positioning
        if (window.getComputedStyle(parentNode).position === 'static') {
            parentNode.style.position = 'relative';
        }
        
        parentNode.appendChild(successIndicator);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone number validation with international support
function isValidPhone(phone) {
    // Supports various formats: (123) 456-7890, 123-456-7890, 123.456.7890, etc.
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Initialize 2025 form features with enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    // Create container for screen reader announcements
    createFormStatusContainer();
    
    // Add styles for validation animations
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .shake-animation {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
            40%, 60% { transform: translate3d(3px, 0, 0); }
        }
        .form-group {
            position: relative;
            margin-bottom: 20px;
        }
        .error-message {
            color: #e53935;
            font-size: 0.85rem;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .success-fade {
            animation: successFade 0.3s ease-in-out;
        }
        @keyframes successFade {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Add event listeners to form fields for real-time validation
    const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    // Add form validation and real-time feedback
    formFields.forEach(field => {
        // Validate on blur (when user leaves the field)
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear error on input
        field.addEventListener('input', function() {
            // Remove existing error
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
                field.setAttribute('aria-invalid', 'false');
            }
            
            // Reset border color
            field.style.borderColor = '#eee';
            
            // Remove success indicator
            const successIndicator = field.parentNode.querySelector('.success-indicator');
            if (successIndicator) {
                successIndicator.remove();
            }
        });
    });
    
    // Add form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form validation is handled in main.js
        });
    }
});

// Validate a single field
function validateField(field) {
    // Clear previous error
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove success indicator
    const successIndicator = field.parentNode.querySelector('.success-indicator');
    if (successIndicator) {
        successIndicator.remove();
    }
    
    // Reset styling
    field.style.borderColor = '#eee';
    field.setAttribute('aria-invalid', 'false');
    
    // Get field value
    const fieldId = field.id;
    const value = field.value.trim();
    
    // Skip validation if field is empty but not required
    if (!value && !field.hasAttribute('required')) {
        return true;
    }
    
    // Validate based on field type
    let isValid = true;
    
    switch(fieldId) {
        case 'name':
            if (!value) {
                displayError(fieldId, 'Please enter your name');
                isValid = false;
            } else if (value.length < 2) {
                displayError(fieldId, 'Name should be at least 2 characters');
                isValid = false;
            }
            break;
            
        case 'email':
            if (!value) {
                displayError(fieldId, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(value)) {
                displayError(fieldId, 'Please enter a valid email address');
                isValid = false;
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                displayError(fieldId, 'Please enter a valid phone number');
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                displayError(fieldId, 'Please enter your message');
                isValid = false;
            } else if (value.length < 10) {
                displayError(fieldId, 'Please provide a more detailed message');
                isValid = false;
            }
            break;
    }
    
    // Show success state if valid and has value
    if (isValid && value) {
        displaySuccess(fieldId);
    }
    
    return isValid;
}