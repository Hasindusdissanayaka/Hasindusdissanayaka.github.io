const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove", function (e) {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        const interactable = e.target.closest('a, button, .magnetic-btn, .glass-panel, input, textarea');
        if (interactable) {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'rgba(138, 43, 226, 0.8)';
            cursorOutline.style.backgroundColor = 'rgba(138, 43, 226, 0.1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'rgba(0, 240, 255, 0.5)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }
});

function animateCursor() {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    outlineX = outlineX + (distX * 0.15);
    outlineY = outlineY + (distY * 0.15);
    
    if (cursorOutline) {
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Typewriter Effect
const phrases = ["Crafting Seamless Code.", "Designing Intuitive Interfaces.", "Building Digital Experiences."];
const typewriterEl = document.querySelector('.typewriter');
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
    if (!typewriterEl) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }
    
    let typeSpeed = 80;
    
    if (isDeleting) {
        typeSpeed /= 2; 
    }
    
    if (!isDeleting && letterIndex === currentPhrase.length) {
        typeSpeed = 2500; 
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; 
    }
    
    setTimeout(type, typeSpeed);
}
setTimeout(type, 1000);

// Mesh background reaction to mouse
const meshBg = document.querySelector('.mesh-bg');
window.addEventListener('mousemove', (e) => {
    if (meshBg) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        meshBg.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    }
});

// Kinetic hover effect for 3D card
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(tiltElement => {
    const glassPanel = tiltElement.classList.contains('glass-panel') ? tiltElement : tiltElement.querySelector('.glass-panel');
    
    if(glassPanel) {
        tiltElement.addEventListener('mousemove', (e) => {
            const rect = tiltElement.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            
            glassPanel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        tiltElement.addEventListener('mouseleave', () => {
            glassPanel.style.transform = `rotateX(0deg) rotateY(0deg)`;
            glassPanel.style.transition = `transform 0.5s ease`;
        });
        
        tiltElement.addEventListener('mouseenter', () => {
            glassPanel.style.transition = `transform 0.1s ease`;
        });
    }
});

// Scroll Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(el => observer.observe(el));
    
    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;
            const v = rect.height / 2;
            
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksList = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinksList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }
});
