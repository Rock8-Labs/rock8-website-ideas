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
    category: 'core'
  },
  {
    id: 'ai-systems',
    icon: '<i class="fas fa-network-wired"></i>',
    title: 'AI System Development',
    description: 'Build coordinated AI systems that collaborate, compete, and evolve to solve complex business challenges autonomously.',
    category: 'core'
  },
  {
    id: 'autonomous-ops',
    icon: '<i class="fas fa-cogs"></i>',
    title: 'Autonomous Operations Platform',
    description: 'Transform legacy systems into self-healing, self-scaling platforms powered by intelligent agents that never sleep.',
    category: 'core'
  },
  {
    id: 'innovation-labs',
    icon: '<i class="fas fa-rocket"></i>',
    title: 'AI Innovation Labs',
    description: 'Explore the bleeding edge of autonomous intelligence. We prototype tomorrow\'s business models using today\'s AI capabilities.',
    category: 'core'
  },
  {
    id: 'website-reimagining',
    icon: '<i class="fas fa-palette"></i>',
    title: 'AI-Powered Website Re-Imagining',
    description: 'Transform your digital presence with AI-driven design. We create websites that adapt, evolve, and optimize themselves in real-time.',
    category: 'core'
  },
  {
    id: 'data-streaming',
    icon: '<i class="fas fa-stream"></i>',
    title: 'Real-time Event and Data Streaming',
    description: 'Process millions of events per second with zero-latency intelligence that reacts faster than human thought. Build streaming architectures that turn data chaos into competitive clarity.',
    category: 'core'
  },
  {
    id: 'subscription-management',
    icon: '<img src="images/payment_journey.svg" alt="Automated Subscription Journeys" />',
    title: 'Reinventing Subscription Management',
    description: 'Unify payment workflows, simplify billing complexity, and empower customers with seamless subscription control—all through a scalable, brandable platform built for modern businesses.',
    category: 'new'
  },
  {
    id: 'transaction-branding',
    icon: '<img src="images/branded_wallet_icon.svg" alt="Branding Every Transaction" />',
    title: 'Branding Every Transaction',
    description: 'Activate expressive wallet experiences with personalized visuals, haptics, and audio that turn everyday payments into moments of brand and identity.',
    category: 'new'
  },
  {
    id: 'intelligence-everywhere',
    icon: '<img src="images/intelligence_everywhere.svg" alt="Intelligence Everywhere" />',
    title: 'Intelligence Everywhere',
    description: 'Connect and orchestrate smart infrastructure across factories, buildings, cities, and logistics networks. Deploy resilient IoT systems that automate, monitor, and optimize operations in real time.',
    category: 'new'
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
 * Initialize service cards on page load
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the home page (has home-services-container)
  const homeContainer = document.getElementById('home-services-container');
  if (homeContainer) {
    renderServiceCards('home-services-container', 'home');
  }

  // Check if we're on the services page (has services-container)
  const servicesContainer = document.getElementById('services-container');
  if (servicesContainer) {
    renderServiceCards('services-container', 'services');
  }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SERVICES_DATA, generateServiceCard, renderServiceCards };
}