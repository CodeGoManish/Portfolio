// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button if not exists
    if (!document.querySelector('.mobile-menu-btn')) {
        const nav = document.querySelector('nav');
        const menuBtn = document.createElement('div');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.onclick = toggleMobileMenu;
        nav.querySelector('.nav-container').appendChild(menuBtn);
    }

    // Create mobile menu if not exists
    if (!document.getElementById('mobileMenu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.id = 'mobileMenu';
        
        const links = document.querySelectorAll('.nav-container .links .link a');
        links.forEach(link => {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'link';
            const newLink = document.createElement('a');
            newLink.href = link.getAttribute('href');
            newLink.textContent = link.textContent;
            newLink.onclick = toggleMobileMenu;
            linkDiv.appendChild(newLink);
            mobileMenu.appendChild(linkDiv);
        });
        
        document.body.appendChild(mobileMenu);
    }
});

// Neon text hover effect
document.querySelectorAll('.neon-text').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.textShadow = "0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff";
    });
    item.addEventListener('mouseout', () => {
        item.style.textShadow = "0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff";
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button functionality
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const service = document.getElementById('service')?.value;
        const message = document.getElementById('message')?.value;
        
        // Basic validation
        if (!name || !email || !service || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        const messageEl = document.getElementById('formMessage');
        if (messageEl) {
            messageEl.style.color = '#00ff00';
            messageEl.textContent = 'Message sent successfully! I will get back to you soon.';
        }
        
        // Reset form
        this.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            if (messageEl) messageEl.textContent = '';
        }, 5000);
    });
}

// Three.js background animation (if canvas exists)
const canvas = document.getElementById('3d-background');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        vertices.push(x, y, z);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x667eea,
        size: 0.5,
        transparent: true
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 1000;
    
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Typewriter effect for home page
const typewriterElement = document.querySelector('.typewriter span');
if (typewriterElement) {
    const words = ['Software Java Developer', 'Editor', 'Freelancer', 'Web & App Developer', 'Content Creator', 'Programmer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, isDeleting ? 100 : 200);
        }
    }

    typeWriter();
}

// GSAP Animations for floating elements
gsap.from('.logo', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power2.out'
});

gsap.from('.link', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.5
});

// Image floating animation (already in HTML)
// This is handled by the inline GSAP code

// Mobile menu toggle function (global)
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
};

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu .link a').forEach(link => {
    link.addEventListener('click', function() {
        const menu = document.getElementById('mobileMenu');
        if (menu) {
            menu.classList.remove('active');
        }
    });
});

// Progress bar animation on scroll
const progressBars = document.querySelectorAll('.progress');
if (progressBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Skill card animation
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Download resume functionality
document.getElementById('downloadResume')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create a dummy PDF download (replace with actual file)
    const link = document.createElement('a');
    link.href = 'Software Java Developer .pdf'; // Add your actual resume file path
    link.download = 'Software Java Developer .pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download message
    alert('Resume download started!');
});

// Service selection enhancement
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            const otherInput = document.createElement('input');
            otherInput.type = 'text';
            otherInput.placeholder = 'Please specify';
            otherInput.className = 'other-service';
            otherInput.style.marginTop = '10px';
            
            // Remove existing other input
            const existingOther = document.querySelector('.other-service');
            if (existingOther) existingOther.remove();
            
            this.parentNode.appendChild(otherInput);
        } else {
            const existingOther = document.querySelector('.other-service');
            if (existingOther) existingOther.remove();
        }
    });
}

// Initialize tooltips if needed
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: #667eea;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 1000;
        `;
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = rect.top - 30 + 'px';
        tooltip.style.left = rect.left + 'px';
        
        document.body.appendChild(tooltip);
        
        this.addEventListener('mouseleave', function() {
            tooltip.remove();
        });
    });
});