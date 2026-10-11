// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        line1.style.transform = 'rotate(45deg) translateY(11px)';
        line2.style.opacity = '0';
        line3.style.transform = 'rotate(-45deg) translateY(-11px)';
    } else {
        mobileMenu.classList.add('hidden');
        line1.style.transform = 'none';
        line2.style.opacity = '1';
        line3.style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        line1.style.transform = 'none';
        line2.style.opacity = '1';
        line3.style.transform = 'none';
    });
});

// Active Navigation Link Highlight
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    let currentSection = 'home';

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                currentSection = section;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Email Copy Functionality
const copyEmailBtn = document.getElementById('copy-email-btn');
const toast = document.getElementById('toast');
const email = 'yousung608@gmail.com';

copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
        // Show toast
        toast.classList.remove('hidden');

        // Change button state
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = '✓ 복사됨';
        copyEmailBtn.classList.add('bg-emerald-600', 'text-white');
        copyEmailBtn.classList.remove('bg-gray-200', 'text-gray-800');

        // Hide toast after 2 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
            copyEmailBtn.textContent = originalText;
            copyEmailBtn.classList.remove('bg-emerald-600', 'text-white');
            copyEmailBtn.classList.add('bg-gray-200', 'text-gray-800');
        }, 2000);
    }).catch(err => {
        console.error('복사 실패:', err);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
