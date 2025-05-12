document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const delay = isMobile ? 300 : 500;

        const hidePreloader = () => {
            preloader.style.transition = 'opacity 0.3s ease-out';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        };

        setTimeout(hidePreloader, delay);
        setTimeout(hidePreloader, isMobile ? 2000 : 4000);
    }

    initPreloader();

    // Cursor Follower
    const cursorFollower = document.querySelector('.cursor-follower');
    if (cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursorFollower.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        });

        const interactiveElements = document.querySelectorAll('a, button, .menu-toggle');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', function() {
                cursorFollower.classList.remove('active');
            });
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        document.querySelectorAll('.nav-link').forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out'
        });
    }

    // Counter Animation - Fixed Implementation
    function animateCounter(counter, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                counter.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }

    function setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-count');
                    animateCounter(counter, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counter.textContent = '0'; // Reset to 0 before animation
            observer.observe(counter);
        });
    }

    setupCounters();

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video Background Fallback
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            this.style.display = 'none';
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.backgroundImage = 'url(https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)';
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
            }
        });
    }
	
	// Проверка на мобильное устройство и замена видео на фоновое изображение
function handleMobileVideo() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigatorUserAgent);
    const heroSection = document.querySelector('.hero');
    
    if (isMobile && heroSection) {
        // Удаляем видео элемент
        const video = heroSection.querySelector('.hero-video');
        if (video) video.remove();
        
        // Добавляем фоновое изображение вместо видео
        heroSection.style.backgroundImage = 'url(assets/coffee-video-poster.jpg)';
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }
}

// Вызываем при загрузке и изменении размера окна
window.addEventListener('load', handleMobileVideo);
window.addEventListener('resize', handleMobileVideo);
});