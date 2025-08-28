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
    url: 'services/ai-strategy-architecture.html'
  },
  {
    id: 'ai-systems',
    icon: '<i class="fas fa-network-wired"></i>',
    title: 'AI System Development',
    description: 'Build coordinated AI systems that collaborate, compete, and evolve to solve complex business challenges autonomously.',
    category: 'core',
    url: 'services/ai-systems.html'
  },
  {
    id: 'autonomous-ops',
    icon: '<i class="fas fa-cogs"></i>',
    title: 'Autonomous Operations Platform',
    description: 'Transform legacy systems into self-healing, self-scaling platforms powered by intelligent agents that never sleep.',
    category: 'core',
    url: 'services/self-healing-legacy-systems.html'
  },
  {
    id: 'innovation-labs',
    icon: '<i class="fas fa-rocket"></i>',
    title: 'AI Innovation Labs',
    description: 'Explore the bleeding edge of autonomous intelligence. We prototype tomorrow\'s business models using today\'s AI capabilities.',
    category: 'core',
    url: 'services/innovation-labs.html'
  },
  {
    id: 'website-reimagining',
    icon: '<i class="fas fa-palette"></i>',
    title: 'AI-Powered Website Re-Imagining',
    description: 'Transform your digital presence with AI-driven design. We create websites that adapt, evolve, and optimize themselves in real-time.',
    category: 'core',
    url: 'services/website-reimagining.html'
  },
  {
    id: 'data-streaming',
    icon: '<i class="fas fa-stream"></i>',
    title: 'Real-time Event and Data Streaming',
    description: 'Process millions of events per second with zero-latency intelligence that reacts faster than human thought. Build streaming architectures that turn data chaos into competitive clarity.',
    category: 'core',
    url: 'services/data-streaming.html'
  },
  {
    id: 'subscription-management',
    icon: '<img src="images/payment_journey.svg" alt="Automated Subscription Journeys" />',
    title: 'Reinventing Subscription Management',
    description: 'Unify payment workflows, simplify billing complexity, and empower customers with seamless subscription control—all through a scalable, brandable platform built for modern businesses.',
    category: 'new',
    url: 'services/subscription-management.html'
  },
  {
    id: 'transaction-branding',
    icon: '<img src="images/branded_wallet_icon.svg" alt="Branding Every Transaction" />',
    title: 'Branding Every Transaction',
    description: 'Activate expressive wallet experiences with personalized visuals, haptics, and audio that turn everyday payments into moments of brand and identity.',
    category: 'new',
    url: 'services/transaction-branding.html'
  },
  {
    id: 'intelligence-everywhere',
    icon: '<img src="images/intelligence_everywhere.svg" alt="Intelligence Everywhere" />',
    title: 'Intelligence Everywhere',
    description: 'Connect and orchestrate smart infrastructure across factories, buildings, cities, and logistics networks. Deploy resilient IoT systems that automate, monitor, and optimize operations in real time.',
    category: 'new',
    url: 'services/intelligence-everywhere.html'
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
 * Initialize service cards on page load
 */
function initializeServices() {
  console.log('Initializing services...');
  
  // Check if we're on the home page (has home-services-container)
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