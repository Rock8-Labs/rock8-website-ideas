// Universal Cursor Behavior for Rock8.io
// This script ensures EVERY page on the site has consistent cursor behavior
// regardless of page type, template, or other scripts

(function() {
  'use strict';
  
  // Initialize cursor immediately when script loads
  function initUniversalCursor() {
    // Check if we're on mobile (where cursor should be disabled)
    if (window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
    
    // Create cursor elements if they don't exist
    let cursorDot = document.querySelector('.cursor-dot');
    let cursorCircle = document.querySelector('.cursor-circle');
    
    if (!cursorDot) {
      cursorDot = document.createElement('div');
      cursorDot.className = 'cursor-dot';
      document.body.appendChild(cursorDot);
    }
    
    if (!cursorCircle) {
      cursorCircle = document.createElement('div');
      cursorCircle.className = 'cursor-circle';
      document.body.appendChild(cursorCircle);
    }
    
    // Mouse movement tracking
    document.addEventListener('mousemove', function(e) {
      if (cursorDot && cursorCircle) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
      }
    });
    
    // Universal hover effects - use event delegation for maximum compatibility
    document.addEventListener('mouseenter', function(e) {
      const target = e.target;
      // Check if the element is clickable (comprehensive list)
      if (target.matches('a, button, input, textarea, select, .btn, .navbar-link, .service-card, .card[onclick], [href], [onclick], .footer-link, .social-link, .metric-card, .blog-card, [data-service-id], .testimonial-card, .approach-item, .work-step, .feature-card, .spotlight') || 
          target.closest('a, button, .btn, .navbar-link, .service-card, .card[onclick], [href], [onclick], .footer-link, .social-link, .metric-card, .blog-card, [data-service-id], .testimonial-card, .approach-item, .work-step, .feature-card, .spotlight')) {
        if (cursorCircle) {
          cursorCircle.classList.add('cursor-hover');
        }
      }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
      const target = e.target;
      // Check if the element is clickable (comprehensive list)
      if (target.matches('a, button, input, textarea, select, .btn, .navbar-link, .service-card, .card[onclick], [href], [onclick], .footer-link, .social-link, .metric-card, .blog-card, [data-service-id], .testimonial-card, .approach-item, .work-step, .feature-card, .spotlight') || 
          target.closest('a, button, .btn, .navbar-link, .service-card, .card[onclick], [href], [onclick], .footer-link, .social-link, .metric-card, .blog-card, [data-service-id], .testimonial-card, .approach-item, .work-step, .feature-card, .spotlight')) {
        if (cursorCircle) {
          cursorCircle.classList.remove('cursor-hover');
        }
      }
    }, true);
  }
  
  // Initialize as soon as DOM is ready, or immediately if already ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUniversalCursor);
  } else {
    initUniversalCursor();
  }
  
  // Also initialize after a short delay to catch any late-loading content
  setTimeout(initUniversalCursor, 100);
  
})();