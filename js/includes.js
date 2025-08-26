// Header and Footer Include System
// Works with local file:// protocol

const HEADER_HTML = `
<!-- Header / Navbar -->
<header class="navbar">
  <div class="container">
    <div class="navbar-container">
      <a href="index.html" class="navbar-logo">
        <img src="images/logo/logor8_white.png" alt="Rock8.io">
      </a>
      
      <nav class="navbar-menu">
        <button class="menu-close">
          <i class="fas fa-times"></i>
        </button>
        <a href="index.html" class="navbar-link">Home</a>
        <a href="services.html" class="navbar-link">Services</a>
        <a href="approach.html" class="navbar-link">Approach</a>
        <a href="about.html" class="navbar-link">About</a>
        <a href="contact.html" class="navbar-link">Contact</a>
        <a href="contact.html" class="btn btn-primary navbar-cta">Get in Touch</a>
      </nav>
      
      <button class="navbar-toggle">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>
</header>
<div class="menu-overlay"></div>
`;

const FOOTER_HTML = `
<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div style="display: grid; grid-template-columns: 1fr auto 1fr; justify-items: center; gap: var(--space-lg);">
        <div style="justify-self: start;">
          <div class="footer-logo">
            <img src="images/logo/logor8_white.png" alt="Rock8.io">
          </div>
          <p class="footer-description">
            Architecting Autonomous Intelligence. Rock8.io pioneers AI systems that think, evolve, and deliver exponential business value autonomously.
          </p>
          <div class="social-links">
            <a href="https://www.linkedin.com/company/14853263/" target="_blank" class="social-link">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="footer-heading" style="text-align: center;">Our Services</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); width: 100%;">
            <ul class="footer-links" style="white-space: nowrap;">
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> AI Strategy & Architecture</a></li>
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> AI System Development</a></li>
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> Autonomous Operations</a></li>
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> AI Innovation Labs</a></li>
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> Website Re-Imagining</a></li>
            </ul>
            <ul class="footer-links" style="white-space: nowrap;">
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> Real-time Data Streaming</a></li>
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> Subscription Management</a></li>
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> Transaction Branding</a></li>
              <li><a href="services.html" class="footer-link" style="text-overflow: ellipsis; overflow: hidden;"><i class="fas fa-chevron-right"></i> Intelligence Everywhere</a></li>
            </ul>
          </div>
          
          <style>
            .footer-heading[style*="text-align: center"]::after,
            div[style*="text-align: center"] .footer-heading::after {
              left: 50% !important;
              transform: translateX(-50%) !important;
            }

            @media (max-width: 768px) {
              .footer-links {
                white-space: normal !important;
              }
              .footer-link {
                text-overflow: unset !important;
                overflow: visible !important;
              }
            }
          </style>
        </div>
        
        <div style="justify-self: end; text-align: center;">
          <h3 class="footer-heading">Quick Links</h3>
          <ul class="footer-links" style="display: inline-block; text-align: left;">
            <li style="margin-bottom: 0.75rem;"><a href="index.html" class="footer-link"><i class="fas fa-chevron-right"></i> Home</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="about.html" class="footer-link"><i class="fas fa-chevron-right"></i> About Us</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="contact.html" class="footer-link"><i class="fas fa-chevron-right"></i> Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="copyright">
        &copy; 2025 Rock8.io. All Rights Reserved.
      </div>
    </div>
  </div>
</footer>
`;

// Function to load includes - works with file:// protocol
function loadIncludes() {
  // Load header
  const headerElement = document.getElementById('header');
  if (headerElement) {
    headerElement.innerHTML = HEADER_HTML;
  }
  
  // Load footer
  const footerElement = document.getElementById('footer');
  if (footerElement) {
    footerElement.innerHTML = FOOTER_HTML;
  }
  
  // Set active nav link for current page
  setTimeout(() => {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, 100);
}

// Load includes when DOM is ready
document.addEventListener('DOMContentLoaded', loadIncludes);