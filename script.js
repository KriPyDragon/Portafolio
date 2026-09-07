/* ============================================
   PORTAFOLIO - SCRIPT MEJORADO
   ============================================ */

// ============================================
// TYPING EFFECT
// ============================================
const typingTexts = [
    "Ingeniero de Sistemas",
    "Desarrollador de Software",
    "Optimizador de Procesos",
    "Apasionado por la Tecnología"
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[typingIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pausa antes de borrar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pausa antes de escribir siguiente
    }

    setTimeout(typeEffect, typingSpeed);
}

// ============================================
// AJUSTE EXACTO DEL OFFSET DE SCROLL
// Se mide el navbar en su estado CONTRAIDO (el que queda
// despues de saltar a una seccion) y se usa esa altura como
// offset exacto: ni se asoma la seccion anterior ni queda hueco.
// ============================================
function adjustScrollOffset() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.add('scrolled');        // medir contraido
    const h = navbar.offsetHeight;
    navbar.classList.remove('scrolled');
    document.documentElement.style.setProperty('--nav-h', h + 'px');
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// MENÚ MÓVIL TOGGLE
// ============================================
function setupMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer click en un link
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SCROLL SPY (navegación activa)
// ============================================
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ============================================
// BOTÓN VOLVER ARRIBA
// ============================================
function setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// ANIMACIONES CON INTERSECTION OBSERVER
// ============================================
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.section-header, .skill-card, .project-card, .contact-card, .about-text, .about-photo-secondary, .contact-info, .contact-form-wrapper'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Añadir delay escalonado a elementos en grid
        const parent = el.closest('.skills-grid, .projects-grid, .contact-cards');
        if (parent) {
            const siblings = Array.from(parent.children);
            const delayIndex = siblings.indexOf(el) % 4;
            el.classList.add(`reveal-delay-${delayIndex + 1}`);
        }
        revealObserver.observe(el);
    });
}

// ============================================
// HABILIDADES
// ============================================
const skillsData = [
    { name: "JavaScript", level: 90, icon: "devicon-javascript-plain", color: "#f7df1e", category: "Lenguaje" },
    { name: "Python", level: 85, icon: "devicon-python-plain", color: "#3776ab", category: "Lenguaje" },
    { name: "Java", level: 80, icon: "devicon-java-plain", color: "#007396", category: "Lenguaje" },
    { name: "HTML5", level: 95, icon: "devicon-html5-plain", color: "#e34f26", category: "Frontend" },
    { name: "CSS3", level: 90, icon: "devicon-css3-plain", color: "#1572b6", category: "Frontend" },
    { name: "React", level: 75, icon: "devicon-react-original", color: "#61dafb", category: "Frontend" },
    { name: "SQL", level: 80, icon: "devicon-mysql-plain", color: "#4479a1", category: "Datos" },
    { name: "Git", level: 85, icon: "devicon-git-plain", color: "#f05032", category: "Herramientas" }
];

function loadSkills() {
    const container = document.getElementById('skills-grid');
    if (!container) return;

    container.innerHTML = skillsData.map(skill => `
        <div class="skill-card reveal" style="--skill-color: ${skill.color}">
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-info">
                    <h4>${skill.name}</h4>
                    <span class="skill-category">${skill.category}</span>
                </div>
                <span class="skill-percent" data-target="${skill.level}">0%</span>
            </div>
            <div class="skill-bar-bg">
                <div class="skill-bar-fill" data-width="${skill.level}"></div>
            </div>
        </div>
    `).join('');

    // Observador propio: anima barras, contador y hace visible cada tarjeta
    // (setupRevealAnimations ya corrio antes de que estas tarjetas existieran)
    const cards = container.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;

            card.classList.add('active');

            const bar = card.querySelector('.skill-bar-fill');
            setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, 200);

            const percent = card.querySelector('.skill-percent');
            animateCounter(percent, parseInt(percent.getAttribute('data-target'), 10));

            skillObserver.unobserve(card);
        });
    }, { threshold: 0.4 });

    cards.forEach(card => skillObserver.observe(card));
}

// Contador animado 0% -> nivel%
function animateCounter(el, target, duration = 1200) {
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = Math.round(eased * target) + '%';
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// ============================================
// PROYECTOS DESDE GITHUB
// ============================================
const fallbackProjects = [
    {
        name: "Portafolio Personal",
        description: "Mi portafolio web personal desarrollado con HTML, CSS y JavaScript vanilla. Diseño responsive y moderno.",
        html_url: "https://github.com/KriPyDragon/Portafolio",
        language: "HTML",
        topics: ["portfolio", "responsive", "css3"]
    },
    {
        name: "Proyectos Académicos",
        description: "Repositorio con diversos proyectos desarrollados durante mi formación universitaria en Ingeniería de Sistemas.",
        html_url: "https://github.com/KriPyDragon",
        language: "Python",
        topics: ["university", "learning", "practice"]
    }
];

function getLanguageColor(lang) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'TypeScript': '#3178c6',
        'React': '#61dafb',
        'SQL': '#e38c00'
    };
    return colors[lang] || '#8b949e';
}

function getProjectIcon(name) {
    const icons = {
        'portfolio': '💼',
        'web': '🌐',
        'app': '📱',
        'api': '⚡',
        'game': '🎮',
        'data': '📊',
        'bot': '🤖',
        'default': '📁'
    };
    const lower = name.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
        if (lower.includes(key)) return icon;
    }
    return icons.default;
}

async function loadGitHubProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    try {
        const response = await fetch('https://api.github.com/users/KriPyDragon/repos?sort=updated&per_page=6');

        if (!response.ok) throw new Error('Error al obtener repositorios');

        const repos = await response.json();

        // Filtrar forks y repos sin descripción si hay pocos
        let projects = repos.filter(repo => !repo.fork);

        if (projects.length === 0) {
            projects = fallbackProjects;
        }

        renderProjects(projects.slice(0, 6));
    } catch (error) {
        console.warn('No se pudieron cargar los proyectos de GitHub:', error);
        renderProjects(fallbackProjects);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = projects.map((project, index) => {
        const lang = project.language || 'Varios';
        const langColor = getLanguageColor(lang);
        const icon = getProjectIcon(project.name);
        const topics = project.topics || [];

        return `
            <article class="project-card reveal reveal-delay-${(index % 4) + 1}">
                <div class="project-header">
                    <div class="project-icon">${icon}</div>
                    <div class="project-links">
                        <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Ver código en GitHub" title="Ver en GitHub">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        </a>
                    </div>
                </div>
                <div class="project-body">
                    <h3>${project.name}</h3>
                    <p>${project.description || "Proyecto en desarrollo. Explora el código fuente para más detalles."}</p>
                </div>
                <div class="project-footer">
                    <span class="project-tag language" style="border-color: ${langColor}33; color: ${langColor}; background: ${langColor}11;">
                        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${langColor};margin-right:6px;"></span>
                        ${lang}
                    </span>
                    ${topics.slice(0, 2).map(topic => `<span class="project-tag">${topic}</span>`).join('')}
                </div>
            </article>
        `;
    }).join('');

    // Re-observar los nuevos elementos
    const newCards = container.querySelectorAll('.project-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    newCards.forEach(card => revealObserver.observe(card));
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');

        // Mostrar loader
        btn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.style.display = 'none';
                successMsg.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Error al enviar');
            }
        } catch (error) {
            alert('Hubo un error al enviar el mensaje. Por favor, intenta contactarme directamente por email o LinkedIn.');
            btn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });
}

// ============================================
// AÑO ACTUAL EN FOOTER
// ============================================
function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar typing effect
    setTimeout(typeEffect, 1000);

    // Navbar scroll
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // Altura del navbar para las secciones
    adjustScrollOffset();
    window.addEventListener('resize', adjustScrollOffset);

    // Menú móvil
    setupMobileMenu();

    // Scroll spy
    setupScrollSpy();

    // Botón volver arriba
    setupBackToTop();

    // Animaciones
    setupRevealAnimations();

    // Cargar habilidades
    loadSkills();

    // Cargar proyectos
    loadGitHubProjects();

    // Formulario
    setupContactForm();

    // Año actual
    setCurrentYear();
});