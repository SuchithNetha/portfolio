// ========================================
// Portfolio JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursorGlow();
    initNavbar();
    initTypingEffect();
    initCounterAnimation();
    initScrollAnimations();
    initMobileNav();
    initThemeToggle();
    initGitHubStats();
    initFAB();
    initBackToTop();
    loadPortfolioConfig(); // Load dynamic content from config.json
    renderProjects();
});

// ========================================
// Cursor Glow Effect
// ========================================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
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
}

// ========================================
// Typing Effect
// ========================================
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        'Voice AI Agents',
        'ML Pipelines',
        'Web Applications',
        'Full-Stack Solutions',
        'Intelligent Systems'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ========================================
// Counter Animation
// ========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    function update() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    update();
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .skill-category, .project-card, .about-content, .contact-content'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Mobile Navigation
// ========================================
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ========================================
// Projects Configuration
// ========================================
// Customize your projects here!
// - excludeRepos: Repos you don't want to show
// - featuredRepos: Repos to highlight as featured
// - customDescriptions: Override GitHub descriptions
// - customTech: Add technologies for specific repos

const GITHUB_USERNAME = 'SuchithNetha';

const projectConfig = {
    // Repos to exclude from portfolio
    excludeRepos: ['REcxse', 'java', 'NextRole', 'portfolio'],

    // Repos you are a collaborator on (format: 'owner/repo')
    collaboratorRepos: ['kjrgit-dev/SprintSensev1'],

    // Featured repos (will be larger and highlighted)
    featuredRepos: ['voiceagent'],

    // Custom descriptions (override GitHub description)
    customDescriptions: {
        'voiceagent': 'A cloud-first voice-enabled AI agent that handles real estate inquiries over phone calls. Features speech recognition, natural conversation with LLM, semantic property search, and persistent user memory.',
        'Ai_diagnostic_system': 'Production-grade ML pipeline for preliminary medical diagnosis based on patient symptoms. Features robust MLOps practices with experiment tracking and model deployment.',
        'expense_tracker': 'Full-stack expense tracking application with authentication, budgeting, category management, and AI-powered spending insights.',
        'TradeTrack': 'A trading portfolio tracker for monitoring investments and analyzing market performance.',
        'SprintSensev1': 'An AI-powered project management tool that helps teams track sprints, analyze productivity, and optimize workflows with intelligent insights.'
    },

    // Custom technologies for repos
    customTech: {
        'voiceagent': ['FastAPI', 'LangGraph', 'Groq', 'Twilio', 'Redis'],
        'Ai_diagnostic_system': ['ZenML', 'MLflow', 'Streamlit', 'Scikit-learn'],
        'expense_tracker': ['React', 'Express', 'MongoDB', 'Material UI'],
        'TradeTrack': ['Python', 'Data Analysis'],
        'SprintSensev1': ['React', 'Node.js', 'PostgreSQL', 'AI']
    },

    // Custom features for featured repos
    customFeatures: {
        'voiceagent': [
            'Twilio WebSocket Integration',
            'LangGraph Agent with Groq LLM',
            'Gemini Embeddings for Search',
            'Redis-backed Memory'
        ]
    },

    // Visual styles for repos (icon type)
    customVisuals: {
        'voiceagent': 'voice',
        'Ai_diagnostic_system': 'diagnostic',
        'expense_tracker': 'expense',
        'TradeTrack': 'trade'
    }
};

// ========================================
// Fetch Projects from GitHub API
// ========================================
async function fetchGitHubProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    // Show loading state
    grid.innerHTML = `
        <div class="loading-projects">
            <div class="loading-spinner"></div>
            <p>Loading projects from GitHub...</p>
        </div>
    `;

    try {
        const [reposResponse, ...extraResponses] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`),
            ...(projectConfig.collaboratorRepos || []).map(repo => fetch(`https://api.github.com/repos/${repo}`))
        ]);

        if (!reposResponse.ok) throw new Error('Failed to fetch user repos');

        const repos = await reposResponse.json();
        const extraRepos = await Promise.all(
            extraResponses.filter(r => r.ok).map(r => r.json())
        );

        // Combine and Filter
        const allRepos = [...repos, ...extraRepos];

        // Filter and transform repos
        const projects = allRepos
            .filter(repo => !projectConfig.excludeRepos.includes(repo.name))
            .filter(repo => !repo.fork) // Exclude forks
            .map(repo => ({
                id: repo.name,
                title: escapeHTML(formatRepoName(repo.name)),
                description: escapeHTML(projectConfig.customDescriptions[repo.name] || repo.description || 'No description available.'),
                tags: [repo.language].filter(Boolean).map(escapeHTML),
                tech: (projectConfig.customTech[repo.name] || [repo.language].filter(Boolean)).map(escapeHTML),
                date: formatDate(repo.pushed_at),
                featured: projectConfig.featuredRepos.includes(repo.name),
                link: repo.html_url,
                features: projectConfig.customFeatures[repo.name] || null,
                visual: projectConfig.customVisuals[repo.name] || getDefaultVisual(repo.language),
                stars: repo.stargazers_count,
                language: repo.language
            }))
            .sort((a, b) => {
                // Featured first, then by date
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });

        // Update project count in stats
        updateProjectCount(projects.length);

        // Render projects
        renderProjectCards(projects);

    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Fallback to static data
        grid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load projects. <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">View on GitHub</a></p>
            </div>
        `;
    }
}

function formatRepoName(name) {
    // Convert repo names like "voice_agent" or "VoiceAgent" to "Voice Agent"
    return name
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function getDefaultVisual(language) {
    const visuals = {
        'Python': 'python',
        'JavaScript': 'javascript',
        'TypeScript': 'javascript',
        'Java': 'java',
        'HTML': 'web',
        'CSS': 'web'
    };
    return visuals[language] || 'code';
}

function updateProjectCount(count) {
    const projectCountEl = document.querySelector('.stat-number[data-count]');
    if (projectCountEl && projectCountEl.dataset.count) {
        projectCountEl.dataset.count = count;
    }
}

function renderProjectCards(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = projects.map(project => `
        <article class="project-card ${project.featured ? 'featured' : ''}">
            <div class="project-image">
                <div class="project-visual ${project.visual}-visual">
                    ${getVisualContent(project.visual)}
                </div>
                <div class="project-overlay">
                    <a href="${project.link}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <div class="project-content">
                <div class="project-meta">
                    ${project.featured ? '<span class="project-tag featured-tag">Featured</span>' : ''}
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    ${project.stars > 0 ? `<span class="project-stars"><i class="fas fa-star"></i> ${project.stars}</span>` : ''}
                    <span class="project-date">${project.date}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                ${project.features ? `
                    <ul class="project-features">
                        ${project.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                    </ul>
                ` : ''}
                <div class="project-tech">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');

    // Re-apply scroll animations to new elements
    initProjectAnimations();
}

function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function getVisualContent(type) {
    switch (type) {
        case 'voice':
            return `
                <div class="voice-waves"><span></span><span></span><span></span><span></span><span></span></div>
                <i class="fas fa-phone-volume"></i>
            `;
        case 'diagnostic':
            return `
                <i class="fas fa-heartbeat"></i>
                <div class="pulse-ring"></div>
            `;
        case 'expense':
            return `<i class="fas fa-chart-pie"></i>`;
        case 'trade':
            return `
                <i class="fas fa-chart-line"></i>
                <svg class="chart-line" viewBox="0 0 100 50">
                    <polyline points="0,40 20,35 40,25 60,30 80,15 100,10" fill="none" stroke="currentColor" stroke-width="2"/>
                </svg>
            `;
        case 'python':
            return `<i class="fab fa-python"></i>`;
        case 'javascript':
            return `<i class="fab fa-js"></i>`;
        case 'java':
            return `<i class="fab fa-java"></i>`;
        case 'web':
            return `<i class="fas fa-globe"></i>`;
        default:
            return `<i class="fas fa-code"></i>`;
    }
}

// Replace renderProjects with fetchGitHubProjects
function renderProjects() {
    fetchGitHubProjects();
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// Interactive Particle Background
// ========================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = Math.min(80, window.innerWidth / 15);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();
}

// ========================================
// Theme Toggle (Dark/Light)
// ========================================
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    if (!toggle || !icon) return;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ========================================
// Live GitHub Stats
// ========================================
async function initGitHubStats() {
    try {
        const [userResponse, reposResponse] = await Promise.all([
            fetch('https://api.github.com/users/SuchithNetha'),
            fetch('https://api.github.com/users/SuchithNetha/repos?per_page=100')
        ]);

        const user = await userResponse.json();
        const repos = await reposResponse.json();

        // Update profile images dynamically
        const profileImages = document.querySelectorAll('.avatar-image, .card-avatar img');
        profileImages.forEach(img => {
            img.src = user.avatar_url;
        });

        // Calculate stats
        const totalRepos = user.public_repos;
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const memberSince = new Date(user.created_at).getFullYear();

        // Find top language
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        const topLanguage = Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        // Update DOM
        animateValue('totalRepos', totalRepos);
        animateValue('totalStars', totalStars);
        document.getElementById('topLanguage').textContent = topLanguage;
        document.getElementById('memberSince').textContent = memberSince;

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }
}

function animateValue(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    function update() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    update();
}

// ========================================
// Floating Action Button
// ========================================
function initFAB() {
    const fabContainer = document.querySelector('.fab-container');
    const fabMain = document.getElementById('fabMain');
    if (!fabContainer || !fabMain) return;

    fabMain.addEventListener('click', () => {
        fabContainer.classList.toggle('active');
        fabMain.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('active');
            fabMain.classList.remove('active');
        }
    });
}

// ========================================
// Back to Top Button
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// Load Portfolio Config (Dynamic Content)
// ========================================
async function loadPortfolioConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Config not found');

        const config = await response.json();

        // Render the timeline from config
        renderTimeline(config.experience);

        // You can also use config to update other sections dynamically
        console.log('Portfolio config loaded successfully');

    } catch (error) {
        console.log('Using default timeline content');
        // Timeline already has default content in HTML
    }
}

// ========================================
// Dynamic Timeline Rendering
// ========================================
function renderTimeline(experienceData) {
    const timeline = document.querySelector('.timeline');
    if (!timeline || !experienceData) return;

    timeline.innerHTML = experienceData.map(item => `
        <div class="timeline-item">
            <div class="timeline-marker">
                <i class="fas fa-${item.icon}"></i>
            </div>
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-subtitle">${item.subtitle}</p>
                <p class="timeline-description">${item.description}</p>
                <div class="timeline-tags">
                    ${item.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Re-apply scroll animations to new timeline items
    initTimelineAnimations();
}

function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(el);
    });
}
