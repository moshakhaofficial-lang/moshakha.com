document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with fallback
    (function() {
        try {
            emailjs.init("QNxBDwyqV0x4Udyrq"); // Your actual Public Key
        } catch (error) {
            console.log('EmailJS not configured yet. Using fallback.');
        }
    })();
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 90; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler with EmailJS
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Check if EmailJS is configured
            if (typeof emailjs !== 'undefined' && emailjs.send) {
                // Send email using EmailJS
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    phone: phone,
                    message: message,
                    to_email: 'moshakhaofficial@gmail.com'
                };
                
                emailjs.send('service_gjpklr8', 'template_n0p3rdr', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        showNotification('Thank you for your inquiry! We\'ll contact you soon.');
                        contactForm.reset();
                    }, function(error) {
                        console.log('FAILED...', error);
                        showNotification('Please complete EmailJS setup or contact us directly at moshakhaofficial@gmail.com');
                    });
            } else {
                // Fallback: Show message with contact info
                console.log('Form submitted:', { name, email, phone, message });
                showNotification('Thank you! Please complete EmailJS setup or email us directly at moshakhaofficial@gmail.com');
                contactForm.reset();
                
                // Optional: Open email client
                const subject = encodeURIComponent('Contact Form Submission from OraeSkin Website');
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);
                window.location.href = `mailto:moshakhaofficial@gmail.com?subject=${subject}&body=${body}`;
            }
        });
    }
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--warm-terracotta);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: 'Montserrat', sans-serif;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.ingredient-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.backgroundColor = 'rgba(245, 242, 237, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(245, 242, 237, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Luxury product data
    const products = [
        {
            name: 'Opulent Glow Serum',
            description: 'An indulgent 24K gold-infused serum delivering opulent nourishment and radiant luminosity.',
            image: 'images/serum.jpg'
        },
        {
            name: 'Radiant Renewal Moisturizer',
            description: 'A rich, ageless formulation that deeply hydrates while revealing your most radiant complexion.',
            image: 'images/moisturizer.jpg'
        },
        {
            name: 'Enriched Ageless Cleanser',
            description: 'A luxurious cleansing experience enriched with precious oils for timeless, pampered skin.',
            image: 'images/cleanser.jpg'
        }
    ];

    const productGrid = document.querySelector('.product-grid');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;

        productGrid.appendChild(productItem);
    });
});
