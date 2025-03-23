// Form validation functions for Pixel Perfect website

function validateForm() {
    let isValid = true;
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    
    // Reset previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Reset field styles
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.style.borderColor = '#eee';
    });
    
    // Validate name
    if (!name) {
        displayError('name', 'Please enter your name');
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
    
    // Validate message
    if (!message) {
        displayError('message', 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

function displayError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Add the error message after the input
    field.parentNode.appendChild(errorDiv);
    
    // Highlight the field
    field.style.borderColor = '#e53935';
    
    // Focus on the first field with an error
    if (document.querySelectorAll('.error-message').length === 1) {
        field.focus();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced field validation with real-time feedback
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to form fields for real-time validation
    const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            // Remove existing error for this field
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Reset field style
            field.style.borderColor = '#eee';
            
            // Validate field based on its type
            const fieldId = field.id;
            const value = field.value.trim();
            
            if (fieldId === 'name' && !value) {
                displayError(fieldId, 'Please enter your name');
            } else if (fieldId === 'email') {
                if (!value) {
                    displayError(fieldId, 'Please enter your email');
                } else if (!isValidEmail(value)) {
                    displayError(fieldId, 'Please enter a valid email address');
                }
            } else if (fieldId === 'message' && !value) {
                displayError(fieldId, 'Please enter your message');
            }
        });
        
        // Remove error message when user starts typing
        field.addEventListener('input', function() {
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
                field.style.borderColor = '#eee';
            }
        });
    });
});