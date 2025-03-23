// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Form validation
        function validateForm() {
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Reset previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (name === '') {
                displayError('name', 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                displayError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                displayError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                displayError('message', 'Please enter your message');
                isValid = false;
            }
            
            return isValid;
        }
        
        // Helper function to display error messages
        function displayError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '14px';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
            field.style.borderColor = 'red';
        }
        
        // Helper function to validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // In a real implementation, you would send the form data to a server
                // For now, we'll just show a success message
                const formData = new FormData(contactForm);
                let formValues = {};
                
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                console.log('Form submitted:', formValues);
                
                // Show success message
                const formContainer = contactForm.parentNode;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.backgroundColor = '#e8f5e9';
                successMessage.style.padding = '20px';
                successMessage.style.borderRadius = '4px';
                successMessage.style.marginTop = '20px';
                successMessage.style.textAlign = 'center';
                
                const successIcon = document.createElement('div');
                successIcon.innerHTML = '<i class="fas fa-check-circle" style="font-size: 48px; color: #4caf50; margin-bottom: 15px;"></i>';
                
                const successTitle = document.createElement('h3');
                successTitle.textContent = 'Message Sent!';
                successTitle.style.marginBottom = '10px';
                
                const successText = document.createElement('p');
                successText.textContent = 'Thank you for contacting Pixel Perfect. We will get back to you as soon as possible.';
                
                successMessage.appendChild(successIcon);
                successMessage.appendChild(successTitle);
                successMessage.appendChild(successText);
                
                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);
            }
        });
    }
});
