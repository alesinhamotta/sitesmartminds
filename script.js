// ========================================
// SMART MINDS - MARKETING DIGITAL
// JavaScript para Interatividade
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. Animação de Scroll Suave
    // ========================================
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#top') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 2. Efeito de Parallax no Scroll
    // ========================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.carousel-inner');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ========================================
    // 3. Animação de Entrada dos Cards
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.service-card, .feature-box');
    cards.forEach(card => {
        observer.observe(card);
    });

    // ========================================
    // 4. Efeito de Partículas no Background
    // ========================================
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: rgba(36, 177, 208, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            box-shadow: 0 0 10px rgba(36, 177, 208, 0.8);
        `;
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const duration = 3000 + Math.random() * 2000;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0)',
                opacity: 0
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`,
                opacity: 1,
                offset: 0.5
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-in-out'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }

    // Criar partículas periodicamente
    setInterval(createParticle, 300);

    // ========================================
    // 5. Efeito de Hover nos Botões
    // ========================================
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Adicionar animação de ripple ao CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // 6. Contador Animado (se houver números)
    // ========================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ========================================
    // 7. Efeito de Digitação nos Títulos
    // ========================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ========================================
    // 8. Navbar com Efeito de Transparência no Scroll
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'linear-gradient(90deg, rgba(4, 49, 84, 0.95) 0%, rgba(18, 104, 151, 0.95) 100%)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'linear-gradient(90deg, #043154 0%, #126897 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Esconder/mostrar navbar ao scrollar
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // 9. Carrossel com Auto-play Pausável
    // ========================================
    const carousel = document.querySelector('#demo');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel) {
                bsCarousel.pause();
            }
        });
        
        carousel.addEventListener('mouseleave', function() {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel) {
                bsCarousel.cycle();
            }
        });
    }

    // ========================================
    // 10. Efeito de Cursor Personalizado
    // ========================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(36, 177, 208, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px rgba(36, 177, 208, 0.6);
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Aumentar cursor ao passar sobre elementos clicáveis
    const clickableElements = document.querySelectorAll('a, button, .card');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'rgba(180, 91, 176, 0.8)';
            cursor.style.boxShadow = '0 0 30px rgba(180, 91, 176, 0.8)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'rgba(36, 177, 208, 0.8)';
            cursor.style.boxShadow = '0 0 20px rgba(36, 177, 208, 0.6)';
        });
    });

    // ========================================
    // 11. Loading Screen (Opcional)
    // ========================================
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // ========================================
    // 12. Efeito de Glitch nos Títulos (Opcional)
    // ========================================
    function glitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        let iterations = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= maxIterations) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 30);
    }

    // Aplicar efeito glitch aos títulos ao passar o mouse
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            glitchEffect(this);
        });
    });

    // ========================================
    // Console Log de Boas-vindas
    // ========================================
    console.log('%c🚀 Smart Minds Marketing Digital', 'color: #24B1D0; font-size: 20px; font-weight: bold;');
    console.log('%cSite desenvolvido com tecnologias modernas e design futurístico', 'color: #126897; font-size: 12px;');
    
});




