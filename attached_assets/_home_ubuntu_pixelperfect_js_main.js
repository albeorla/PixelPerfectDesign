// Pixel Perfect Website JavaScript - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animation classes to elements
    const addAnimationClasses = function() {
        // Add staggered animations to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });
        
        // Add animations to feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });
        
        // Add animations to brand cards
        const brandCards = document.querySelectorAll('.brand-card');
        brandCards.forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });
        
        // Add animations to sections
        document.querySelector('.about-content')?.classList.add('fade-in-up');
        document.querySelector('.mission-content')?.classList.add('fade-in-up');
        document.querySelector('.contact-info')?.classList.add('fade-in-left');
        document.querySelector('.contact-form')?.classList.add('fade-in-right');
    };
    
    // Initialize animations
    addAnimationClasses();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
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
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        
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
        if (!field) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#e53935';
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
