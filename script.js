// ===== NAVIGATION MENU (Mobile Hamburger) =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== STICKY NAVIGATION & ACTIVE LINK =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Active link highlight
    let fromTop = window.scrollY + 80;
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Initial theme
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PROJECTS DATA & FILTERING =====
const projects = [
    {
        title: 'NativeCode - Hindi Code Playground',
        description: 'Designed and deployed a Hindi-syntax programming language and real-time coding platform, featuring a custom Python transpiler, secure control flow, and an interactive playground built with React, FastAPI, WebSockets, and CodeMirror 6.',
        image: 'images/nativecode-logo.png',
        tags: ['web', 'react', 'fastapi', 'CodeMirror', 'hindi', 'vercel', 'python'],
        type: 'web',
        repo: 'https://github.com/Abhiboss07/NativeCode',
        details: `<ul>
<li><b>Created a Hindi-syntax programming language</b> with a custom transpiler to Python, supporting string interpolation, control flow, and safety features.</li>
<li><b>Developed a full-stack web playground</b> with React, FastAPI, and WebSockets for real-time code execution and transpiled output display.</li>
<li><b>Integrated CodeMirror 6 editor</b> with custom Hindi syntax highlighting, smart auto-completion, and built-in code examples.</li>
<li><b>Deployed scalable production app</b> on Vercel and Render with responsive UI, optimized performance, and robust error handling.</li>
<li><b>Designed an accessible coding platform</b> enabling Hindi-speaking users to learn programming concepts through natural-language coding.</li>
<li><b>Open Source:</b> <a href='https://github.com/Abhiboss07/NativeCode' target='_blank'>View on GitHub</a></li>
<li><b>Live Demo:</b> <a href='https://native-code.vercel.app/' target='_blank'>native-code.vercel.app</a></li>
</ul>`
    },
    {
        title: 'Java Login System',
        description: 'Developed a Java-based command-line authentication system using OOP principles, HashMap for in-memory storage, and modular architecture separating data models, business logic, and CLI layers.',
        image: 'images/Java-LoginSystem.png',
        tags: ['java', 'cli', 'oop', 'hashmap', 'authentication'],
        type: 'web',
        repo: 'https://github.com/Abhiboss07/LoginSystem',
        details: `<ul>
<li><b>Developed a command-line authentication system</b> in Java with user registration and login functionality using object-oriented programming principles.</li>
<li><b>Implemented in-memory data management</b> using HashMap for efficient user storage and retrieval with duplicate username validation.</li>
<li><b>Created modular architecture</b> with separate classes for User data model, UserManager business logic, and Main application interface.</li>
<li><b>Built interactive CLI interface</b> using Scanner class for user input handling and menu-driven navigation with error handling.</li>
<li><b>Applied software development best practices</b> including proper code documentation, .gitignore configuration, and version control with Git.</li>
<li><b>Open Source:</b> <a href='https://github.com/Abhiboss07/LoginSystem' target='_blank'>View on GitHub</a></li>
</ul>`
    },
    {
        title: 'Market Price Prediction (AgriPrice Pro)',
        description: 'Developed AgriPrice Pro, a full-stack agricultural price prediction platform using Java 17, Spring Boot, MongoDB, and RESTful APIs for real-time forecasts and data analysis.',
        image: 'images/AgriPrice Pro.png',
        tags: ['java', 'spring-boot', 'mongodb', 'rest-apis', 'docker', 'chart.js', 'ci-cd'],
        type: 'web',
        repo: 'https://github.com/Abhiboss07/AgriPricePro',
        details: `<ul>
<li><b>Developed AgriPrice Pro</b>, a full-stack agricultural price prediction platform using Java 17, Spring Boot, MongoDB, and RESTful APIs for real-time forecasts and data analysis.</li>
<li><b>Built responsive dashboards</b> with JavaScript and Chart.js, containerized with Docker, and integrated CI pipelines, Swagger docs, and automated testing for scalable, production-ready deployment.</li>
<li><b>Implemented machine learning models</b> for accurate price predictions and trend analysis in agricultural markets.</li>
<li><b>Designed RESTful API endpoints</b> for seamless data integration and third-party service connectivity.</li>
<li><b>Open Source:</b> <a href='https://github.com/Abhiboss07/AgriPricePro' target='_blank'>View on GitHub</a></li>
</ul>`
    }
];

const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);
    filtered.forEach((project, idx) => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in-up';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', project.title);
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay"><i class="fas fa-search-plus"></i></div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click', () => openProjectModal(project));
        card.addEventListener('keypress', (e) => { if (e.key === 'Enter') openProjectModal(project); });
        projectsGrid.appendChild(card);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

renderProjects();

// ===== PROJECT MODAL =====
const projectModal = document.getElementById('project-modal');
const modalBody = projectModal.querySelector('.modal-body');
const modalClose = projectModal.querySelector('.modal-close');

function openProjectModal(project) {
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" style="width:100%;border-radius:1rem;margin-bottom:1rem;">
        <p>${project.details}</p>
        <div class="project-tags" style="margin-top:1rem;">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
    `;
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
});
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) closeProjectModal();
});

// ===== CONTACT FORM (No backend, just demo) =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create mailto link with form data
        const mailtoLink = `mailto:soft.vibe@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Optional: Show success message
        setTimeout(() => {
            alert('Email client opened! Please send the email to complete your message.');
        }, 100);
    });
}

// ===== BLOG POSTS (Optional, placeholder) =====
const blogPosts = [
    // {
    //     title: 'How to Build a Modern Portfolio',
    //     excerpt: 'Tips and tricks for creating a stunning, responsive portfolio website.',
    //     image: 'https://via.placeholder.com/600x400/6366f1/fff?text=Blog+1',
    //     date: '2024-05-01',
    //     link: '#'
    // },
    // {
    //     title: 'My Favorite Web Tools',
    //     excerpt: 'A rundown of the best tools and libraries for web development in 2024.',
    //     image: 'https://via.placeholder.com/600x400/10b981/fff?text=Blog+2',
    //     date: '2024-04-15',
    //     link: '#'
    // },
    {
        title: 'Building My Portfolio Website',
        excerpt: 'A behind-the-scenes look at how I designed and developed my personal portfolio website, including features, challenges, and best practices.',
        image: 'images/photo.png',
        date: '2025-06-25',
        link: '#'
    },
];
const blogGrid = document.getElementById('blog-grid');
if (blogGrid) {
    blogPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card fade-in-up';
        card.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span>${new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.link}" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        blogGrid.appendChild(card);
    });
}

// ===== SMOOTH PAGE TRANSITIONS & ANIMATIONS (GSAP) =====
window.addEventListener('DOMContentLoaded', () => {
    if (window.gsap) {
        gsap.from('.navbar', { y: -60, opacity: 0, duration: 0.8, ease: 'power2.out' });
        gsap.from('.hero-title', { x: -60, opacity: 0, duration: 1, delay: 0.2, ease: 'power2.out' });
        gsap.from('.hero-subtitle', { x: 60, opacity: 0, duration: 1, delay: 0.4, ease: 'power2.out' });
        gsap.from('.hero-description', { y: 40, opacity: 0, duration: 1, delay: 0.6, ease: 'power2.out' });
        gsap.from('.hero-buttons', { y: 40, opacity: 0, duration: 1, delay: 0.8, ease: 'power2.out' });
        gsap.from('.profile-card', { scale: 0.8, opacity: 0, duration: 1, delay: 1, ease: 'power2.out' });
    }
});

// ===== ACCESSIBILITY: Keyboard Navigation for Modal =====
projectModal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusable = projectModal.querySelectorAll('a, button, textarea, input, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }
});
