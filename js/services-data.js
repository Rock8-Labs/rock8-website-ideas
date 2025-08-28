/**
 * Service Cards Data - Central source for all service offerings
 * Used by both index.html and services.html to maintain consistency
 */

const SERVICES_DATA = [
  {
    id: 'ai-strategy',
    icon: '<i class="fas fa-brain"></i>',
    title: 'AI Strategy & Architecture',
    description: 'Design intelligent ecosystems that autonomously execute your business strategy with superhuman efficiency.',
    category: 'core',
    url: 'services/ai-strategy-architecture.html',
    heroImage: 'images/ai-strategy_1_816x816.png'
  },
  {
    id: 'ai-systems',
    icon: '<i class="fas fa-network-wired"></i>',
    title: 'AI System Development',
    description: 'Build coordinated AI systems that collaborate, compete, and evolve to solve complex business challenges autonomously.',
    category: 'core',
    url: 'services/ai-systems-development.html',
    heroImage: 'images/AI-systems-dev_1.png'
  },
  {
    id: 'autonomous-ops',
    icon: '<i class="fas fa-cogs"></i>',
    title: 'Autonomous Operations Platform',
    description: 'Transform legacy systems into self-healing, self-scaling platforms powered by intelligent agents that never sleep.',
    category: 'core',
    url: 'services/self-healing-legacy-systems.html',
    heroImage: 'images/visualize_legacy.png'
  },
  {
    id: 'innovation-labs',
    icon: '<i class="fas fa-rocket"></i>',
    title: 'AI Innovation Labs',
    description: 'Explore the bleeding edge of autonomous intelligence. We prototype tomorrow\'s business models using today\'s AI capabilities.',
    category: 'core',
    url: 'services/ai-innovation-labs.html',
    heroImage: 'images/hardware_meets_synops_1.png'
  },
  {
    id: 'website-reimagining',
    icon: '<i class="fas fa-palette"></i>',
    title: 'AI-Powered Website Re-Imagining',
    description: 'Transform your digital presence with AI-driven design. We create websites that adapt, evolve, and optimize themselves in real-time.',
    category: 'core',
    url: 'services/website-transformation.html',
    heroImage: 'images/websites_reimagined_1.png'
  },
  {
    id: 'data-streaming',
    icon: '<i class="fas fa-stream"></i>',
    title: 'Real-time Event and Data Streaming',
    description: 'Process millions of events per second with zero-latency intelligence that reacts faster than human thought. Build streaming architectures that turn data chaos into competitive clarity.',
    category: 'core',
    url: 'services/data-streaming.html',
    heroImage: 'images/data_streaming_1.png'
  },
  {
    id: 'subscription-management',
    icon: '<img src="images/payment_journey.svg" alt="Automated Subscription Journeys" />',
    title: 'Reinventing Subscription Management',
    description: 'Unify payment workflows, simplify billing complexity, and empower customers with seamless subscription control—all through a scalable, brandable platform built for modern businesses.',
    category: 'new',
    url: 'services/subscription-management.html',
    heroImage: 'images/reinventing_sub_mgmt_(midjourney)_1.png'
  },
  {
    id: 'transaction-branding',
    icon: '<img src="images/branded_wallet_icon.svg" alt="Branding Every Transaction" />',
    title: 'Branding Every Transaction',
    description: 'Activate expressive wallet experiences with personalized visuals, haptics, and audio that turn everyday payments into moments of brand and identity.',
    category: 'new',
    url: 'services/transaction-branding.html',
    heroImage: 'images/rock8_branded_card_1.png'
  },
  {
    id: 'intelligence-everywhere',
    icon: '<img src="images/intelligence_everywhere.svg" alt="Intelligence Everywhere" />',
    title: 'Intelligence Everywhere',
    description: 'Connect and orchestrate smart infrastructure across factories, buildings, cities, and logistics networks. Deploy resilient IoT systems that automate, monitor, and optimize operations in real time.',
    category: 'new',
    url: 'services/intelligence-everywhere.html',
    heroImage: 'images/intelligence_everywhere_7.png'
  }
];

/**
 * Generate HTML for a service card
 * @param {Object} service - Service data object
 * @param {number} index - Card index for animation delays
 * @param {string} context - 'home' or 'services' for context-specific styling
 * @returns {string} HTML string for the service card
 */
function generateServiceCard(service, index, context = 'services') {
  const delayClass = context === 'home' ? `reveal reveal-delay-${index + 1}` : '';
  
  return `
    <div class="card service-card spotlight ${delayClass}" data-service-id="${service.id}">
      <div class="card-icon">${service.icon}</div>
      <h3 class="service-card-title gradient-text-hover">${service.title}</h3>
      <p>${service.description}</p>
    </div>
  `;
}

/**
 * Render service cards to a container
 * @param {string} containerId - ID of the container element
 * @param {string} context - 'home' or 'services'
 * @param {Array} services - Array of services to render (optional, defaults to all)
 */
function renderServiceCards(containerId, context = 'services', services = SERVICES_DATA) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with ID '${containerId}' not found`);
    return;
  }

  const cardsHTML = services.map((service, index) => 
    generateServiceCard(service, index, context)
  ).join('');

  container.innerHTML = cardsHTML;
}

/**
 * Add click handlers to service cards
 */
function addServiceCardClickHandlers() {
  const serviceCards = document.querySelectorAll('.service-card[data-service-id]');
  
  serviceCards.forEach(card => {
    const serviceId = card.getAttribute('data-service-id');
    const service = SERVICES_DATA.find(s => s.id === serviceId);
    
    if (service && service.url) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        window.location.href = service.url;
      });
    }
  });
}

/**
 * Generate HTML for a carousel slide
 * @param {Object} service - Service data object
 * @param {number} index - Slide index
 * @returns {string} HTML string for the carousel slide
 */
function generateCarouselSlide(service, index) {
  const heroImage = service.heroImage || 'images/ai-business-transformation.svg';
  
  return `
    <div class="solution-slide" data-service-id="${service.id}">
      <div class="solution-slide-bg" style="background-image: url('${heroImage}');"></div>
      <div class="solution-slide-overlay">
        <h3 class="solution-slide-title">${service.title}</h3>
        <p class="solution-slide-description">${service.description}</p>
        <a href="${service.url}" class="solution-slide-cta">
          Learn More <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

/**
 * Initialize Solutions Carousel
 */
function initializeSolutionsCarousel() {
  const carouselContainer = document.getElementById('solutions-carousel');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  if (!carouselContainer) return;
  
  let currentSlide = 0;
  const slidesPerView = {
    desktop: 3,
    tablet: 2,
    mobile: 1
  };
  
  // Generate carousel slides
  const slidesHTML = SERVICES_DATA.map((service, index) => 
    generateCarouselSlide(service, index)
  ).join('');
  
  carouselContainer.innerHTML = slidesHTML;
  
  // Generate dots based on number of possible slide positions
  if (dotsContainer) {
    const currentSlidesPerView = getSlidesPerView();
    const maxSlidePositions = Math.max(1, SERVICES_DATA.length - currentSlidesPerView + 1);
    
    const dotsHTML = Array.from({length: maxSlidePositions}, (_, index) => 
      `<button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>`
    ).join('');
    dotsContainer.innerHTML = dotsHTML;
  }
  
  // Get current slides per view based on screen size
  function getSlidesPerView() {
    if (window.innerWidth <= 768) return slidesPerView.mobile;
    if (window.innerWidth <= 1024) return slidesPerView.tablet;
    return slidesPerView.desktop;
  }
  
  // Update carousel position
  function updateCarousel() {
    const currentSlidesPerView = getSlidesPerView();
    const maxSlide = Math.max(0, SERVICES_DATA.length - currentSlidesPerView);
    
    // Ensure currentSlide is within bounds
    if (currentSlide > maxSlide) {
      currentSlide = maxSlide;
    }
    
    const translateX = -(currentSlide * (100 / currentSlidesPerView));
    carouselContainer.style.transform = `translateX(${translateX}%)`;
    
    // Update button states
    if (prevBtn) {
      prevBtn.disabled = currentSlide <= 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide >= maxSlide;
    }
    
    // Update dots
    const dots = dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  // Navigation event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxSlide = Math.max(0, SERVICES_DATA.length - getSlidesPerView());
      if (currentSlide < maxSlide) {
        currentSlide++;
        updateCarousel();
      }
    });
  }
  
  // Dots navigation
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('carousel-dot')) {
        currentSlide = parseInt(e.target.dataset.slide);
        updateCarousel();
      }
    });
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Regenerate dots for new screen size
    if (dotsContainer) {
      const currentSlidesPerView = getSlidesPerView();
      const maxSlidePositions = Math.max(1, SERVICES_DATA.length - currentSlidesPerView + 1);
      
      const dotsHTML = Array.from({length: maxSlidePositions}, (_, index) => 
        `<button class="carousel-dot ${index === currentSlide ? 'active' : ''}" data-slide="${index}"></button>`
      ).join('');
      dotsContainer.innerHTML = dotsHTML;
    }
    updateCarousel();
  });
  
  // Auto-play functionality with pendulum motion
  let autoPlayDirection = 1; // 1 for forward, -1 for backward
  let autoPlayTimer = null;
  let isPaused = false;
  
  function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    
    autoPlayTimer = setInterval(() => {
      if (isPaused) return;
      
      const maxSlide = Math.max(0, SERVICES_DATA.length - getSlidesPerView());
      
      // Check if we've reached the end in current direction
      if (autoPlayDirection === 1 && currentSlide >= maxSlide) {
        // Reached the end, pause and reverse direction
        isPaused = true;
        setTimeout(() => {
          autoPlayDirection = -1;
          isPaused = false;
        }, 3000); // 3 second pause
      } else if (autoPlayDirection === -1 && currentSlide <= 0) {
        // Reached the beginning, pause and reverse direction
        isPaused = true;
        setTimeout(() => {
          autoPlayDirection = 1;
          isPaused = false;
        }, 3000); // 3 second pause
      } else {
        // Move in current direction
        currentSlide += autoPlayDirection;
        updateCarousel();
      }
    }, 10000); // Move every 10 seconds
  }
  
  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }
  
  // Pause auto-play on user interaction
  const pauseAutoPlay = () => {
    stopAutoPlay();
    // Restart after 30 seconds of no interaction
    setTimeout(startAutoPlay, 30000);
  };
  
  // Add pause on interaction listeners
  if (prevBtn) prevBtn.addEventListener('click', pauseAutoPlay);
  if (nextBtn) nextBtn.addEventListener('click', pauseAutoPlay);
  if (dotsContainer) dotsContainer.addEventListener('click', pauseAutoPlay);
  
  // Pause on hover
  carouselContainer.addEventListener('mouseenter', stopAutoPlay);
  carouselContainer.addEventListener('mouseleave', startAutoPlay);
  
  // Initialize
  updateCarousel();
  startAutoPlay();
  
  // Add click handlers to slides
  setTimeout(() => {
    const slides = carouselContainer.querySelectorAll('.solution-slide');
    slides.forEach(slide => {
      slide.addEventListener('click', (e) => {
        // If clicking on CTA link, let it handle navigation
        if (e.target.closest('.solution-slide-cta')) return;
        
        // Otherwise, navigate to the service page
        const serviceId = slide.dataset.serviceId;
        const service = SERVICES_DATA.find(s => s.id === serviceId);
        if (service?.url) {
          window.location.href = service.url;
        }
      });
    });
  }, 100);
}

/**
 * Initialize service cards on page load
 */
function initializeServices() {
  console.log('Initializing services...');
  
  // Check if we're on the home page (has solutions-carousel)
  const carouselContainer = document.getElementById('solutions-carousel');
  if (carouselContainer) {
    console.log('Found carousel container, initializing carousel');
    initializeSolutionsCarousel();
    return;
  }

  // Check if we're on the home page (has home-services-container) - fallback
  const homeContainer = document.getElementById('home-services-container');
  if (homeContainer) {
    console.log('Found home container, rendering services');
    renderServiceCards('home-services-container', 'home');
  }

  // Check if we're on the services page (has services-container)
  const servicesContainer = document.getElementById('services-container');
  if (servicesContainer) {
    console.log('Found services container, rendering services');
    renderServiceCards('services-container', 'services');
  }

  // Add click handlers after cards are rendered
  setTimeout(addServiceCardClickHandlers, 100);
}

// Try multiple ways to ensure initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeServices);
} else {
  // DOM is already ready
  initializeServices();
}

// Fallback - try again after a short delay
setTimeout(function() {
  if (document.getElementById('home-services-container') && 
      document.getElementById('home-services-container').innerHTML.includes('Loading services')) {
    console.log('Fallback initialization triggered');
    initializeServices();
  }
}, 100);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SERVICES_DATA, generateServiceCard, renderServiceCards };
}