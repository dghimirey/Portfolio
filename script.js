// Theme Toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '🌙';
themeToggle.setAttribute('aria-label', 'Toggle theme');

// Add theme toggle to navigation
const navList = document.querySelector('.nav-list');
const themeToggleLi = document.createElement('li');
themeToggleLi.appendChild(themeToggle);
navList.appendChild(themeToggleLi);

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
});

// Mobile Menu Toggle
const mobileToggle = document.createElement('button');
mobileToggle.className = 'mobile-toggle';
mobileToggle.innerHTML = '☰';
mobileToggle.setAttribute('aria-label', 'Toggle menu');

const navContainer = document.querySelector('.nav-container');
navContainer.insertBefore(mobileToggle, document.querySelector('.nav'));

const nav = document.querySelector('.nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.innerHTML = '☰';
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Scroll animations for sections
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    observer.observe(section);
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add stagger animation to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add stagger animation to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Add cursor effect
// 1. Create the cursor elements (Inner Dot and Outer Ring)
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');

cursorDot.className = 'cursor-dot';
cursorOutline.className = 'cursor-outline';

// 2. Add Styles Programmatically
const styleSheet = document.createElement('style');
styleSheet.innerText = `
    .cursor-dot,
    .cursor-outline {
        position: fixed;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
    }

    .cursor-dot {
        width: 8px;
        height: 8px;
        background-color: var(--accent, #000); /* Fallback to black if var missing */
    }

    .cursor-outline {
        width: 40px;
        height: 40px;
        border: 1px solid var(--accent, #000);
    }
    
    /* Hide default cursor to make this effective */
    body {
        cursor: none; 
    }
    
    /* On mobile, we usually want to hide custom cursors */
    @media (max-width: 768px) {
        .cursor-dot, .cursor-outline { display: none; }
        body { cursor: auto; }
    }
`;
document.head.appendChild(styleSheet);
document.body.append(cursorDot, cursorOutline);

// 3. Logic for Smooth Movement
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Track mouse position instantly
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    
    // Show cursor if it was hidden (optional logic)
    cursorDot.style.opacity = 1;
    cursorOutline.style.opacity = 1;
});

// Animate the outline with a delay (The "Smooth" part)
function animate() {
    // This math creates the smooth 'trailing' effect
    // 0.15 is the speed factor. Lower = slower/floatier, Higher = faster
    const speed = 0.15;
    
    outlineX += (mouseX - outlineX) * speed;
    outlineY += (mouseY - outlineY) * speed;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animate);
}
animate();

// 4. Hover Interactions
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'var(--accent-transparent, rgba(0,0,0,0.1))'; // Optional fill
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)'; // Dot shrinks
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console message for curious developers
console.log('%c👋 Hey there, fellow developer!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cI see you\'re checking out the code. Feel free to reach out if you want to collaborate!', 'color: #a0a0a0; font-size: 14px;');
console.log('%c📧 diamondghimire4141@gmail.com', 'color: #00d9ff; font-size: 14px;');