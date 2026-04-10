document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    const contactForm = document.getElementById('contactForm');
    const statNumbers = document.querySelectorAll('.stat-number');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        observer.observe(aboutStats);
    }

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert(`Thank you ${name}! Your message has been sent.`);
            contactForm.reset();
        }
    });

    const typedName = document.getElementById('typedName');
    const name = 'Jerome Gordon-Bock';
    let index = 0;

    function typeWriter() {
        if (index < name.length) {
            typedName.textContent += name.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'var(--white)';
        }
    });
});
