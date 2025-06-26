// Main JavaScript for Rock8.io

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all components
  initNavbar();
  initScrollReveal();
  initParticles();
  initMasonryGrid();
  initCarousels();
  initAnimatedCounters();
  initContactForm();
  initCustomCursor();
  
  // Remove page loader when everything is loaded
  window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  });
  
  // Navbar initialization
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuClose = document.querySelector('.menu-close');
    
    // Sticky navbar on scroll
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
    
    // Mobile menu toggle
    if (navbarToggle && navbarMenu && menuOverlay) {
      navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
      
      function closeMenu() {
        navbarMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      menuOverlay.addEventListener('click', closeMenu);
      if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
      }
      
      // Close menu when link is clicked
      const navLinks = document.querySelectorAll('.navbar-link');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          closeMenu();
        });
      });
    }
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      document.querySelectorAll('.navbar-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Scroll reveal animation
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length) {
      const revealOnScroll = function() {
        revealElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;
          
          if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
          }
        });
      };
      
      window.addEventListener('scroll', revealOnScroll);
      revealOnScroll(); // Trigger on page load
    }
  }
  
  // Particle background effect
  function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer && typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#6C63FF"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: {
            value: 0.3,
            random: false,
            anim: {
              enable: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#6C63FF",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    }
  }
  
  // Masonry grid for portfolio/blog items
  function initMasonryGrid() {
    const masonryGrid = document.querySelector('.masonry-grid');
    
    if (masonryGrid && typeof Masonry !== 'undefined') {
      const masonry = new Masonry(masonryGrid, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-sizer',
        percentPosition: true,
        gutter: 30
      });
      
      // Layout Masonry after images have loaded
      if (typeof imagesLoaded !== 'undefined') {
        imagesLoaded(masonryGrid).on('progress', function() {
          masonry.layout();
        });
      }
    }
  }
  
  // Initialize carousels
  function initCarousels() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && typeof Swiper !== 'undefined') {
      new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
    }
  }
  
  // Animated counters for stats
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length) {
      counters.forEach(counter => {
        counter.innerText = '0';
        
        const updateCounter = () => {
          const target = +counter.getAttribute('data-target');
          const c = +counter.innerText;
          
          const increment = target / 100;
          
          if (c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 20);
          } else {
            counter.innerText = target;
          }
        };
        
        const counterObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.5
        });
        
        counterObserver.observe(counter);
      });
    }
  }
  
  // Contact form validation and submission
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });
        
        // Email validation
        const emailField = contactForm.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
          }
        }
        
        if (isValid) {
          // Success handling - in a real app, would submit to server
          const successMessage = document.createElement('div');
          successMessage.className = 'form-success animate-fade-up';
          successMessage.innerHTML = '<p>Thanks for your message! We\'ll get back to you soon.</p>';
          
          contactForm.innerHTML = '';
          contactForm.appendChild(successMessage);
        }
      });
      
      // Remove error state on input
      contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', function() {
          this.classList.remove('error');
        });
      });
    }
  }
  
  // Custom cursor effect
  function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    if (cursorDot && cursorCircle) {
      window.addEventListener('mousemove', e => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
      });
      
      // Custom cursor interactions
      const cursorTargets = document.querySelectorAll('a, button, input, textarea, .card, .service-card, .btn, .navbar-link');
      
      cursorTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
          cursorCircle.classList.add('cursor-hover');
        });
        
        target.addEventListener('mouseleave', () => {
          cursorCircle.classList.remove('cursor-hover');
        });
      });
    }
  }
  
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Typing effect for hero titles
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    typingElement.style.width = '0';
    typingElement.style.animation = 'typing 3.5s steps(40, end) forwards, blink .75s step-end infinite';
  }
  
  // Mobile device detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Add mobile class to body if on mobile device
  if (isMobile) {
    document.body.classList.add('is-mobile');
  }
  
  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});