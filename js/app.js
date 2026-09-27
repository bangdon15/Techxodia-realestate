/**
 * VALENCE // DOMAIN Architectural Holdings
 * Application Core Controller
 * 
 * Demonstrates:
 * 1. Database-to-Component dynamic property injection
 * 2. Dynamic Hero rotation computed from the top 3 highest-value acquisitions
 * 3. Client-side query filter engine with pill toggles and real-time state management
 * 4. Staggered asymmetrical masonry grid rendering
 * 5. Native <dialog> Quick-View slide-out panel with extended specs & interactive gallery
 */

import { PropertyDatabaseClient, PROPERTIES_DATABASE } from './data.js';

class RealEstatePortfolioApp {
  constructor() {
    this.db = new PropertyDatabaseClient(PROPERTIES_DATABASE);
    
    // Application State
    this.state = {
      activeStyleFilter: 'All',
      activeStatusFilter: 'All',
      searchQuery: '',
      sortBy: 'curated',
      heroSlideIndex: 0,
      heroTimer: null,
      topProperties: [],
      currentModalProperty: null
    };

    // DOM Element References
    this.dom = {
      heroSlider: document.getElementById('heroSlider'),
      heroFeaturedCard: document.getElementById('heroFeaturedCard'),
      heroProgressBars: document.getElementById('heroProgressBars'),
      portfolioGrid: document.getElementById('portfolioGrid'),
      stylePillContainer: document.getElementById('stylePillContainer'),
      statusPillContainer: document.getElementById('statusPillContainer'),
      filterCountDisplay: document.getElementById('filterCountDisplay'),
      activeFilterName: document.getElementById('activeFilterName'),
      resetFiltersBtn: document.getElementById('resetFiltersBtn'),
      searchInput: document.getElementById('searchInput'),
      sortSelect: document.getElementById('sortSelect'),
      masthead: document.getElementById('masthead'),
      quickViewModal: document.getElementById('quickViewModal'),
      modalContent: document.getElementById('modalContent'),
      closeModalBtn: document.getElementById('closeModalBtn'),
      toastStack: document.getElementById('toastStack')
    };

    this.init();
  }

  async init() {
    this.setupScrollListener();
    this.setupHeroCarousel();
    this.setupFilterTaxonomies();
    this.setupEventListeners();
    await this.renderPortfolioGrid();
  }

  /* ------------------------------------------------------------------------
     1. Immersive Dynamic Hero Carousel
     Calculates top 3 highest-value acquisitions from mock database
     ------------------------------------------------------------------------ */
  setupHeroCarousel() {
    this.state.topProperties = this.db.getTopValuedProperties(3);
    
    if (!this.state.topProperties.length) return;

    // Render Hero Background Slides using top 3 database records
    this.dom.heroSlider.innerHTML = this.state.topProperties.map((prop, idx) => `
      <div 
        class="hero-slide ${idx === 0 ? 'active' : ''}" 
        style="background-image: url('${prop.main_image_url}');"
        data-index="${idx}"
        aria-hidden="${idx !== 0}"
      ></div>
    `).join('');

    // Render Progress Bar Indicators
    this.dom.heroProgressBars.innerHTML = this.state.topProperties.map((prop, idx) => `
      <div class="progress-bar-slot ${idx === 0 ? 'active' : ''}" data-index="${idx}" title="View ${prop.property_title}">
        <div class="progress-bar-fill"></div>
      </div>
    `).join('');

    // Bind click events on progress indicators
    this.dom.heroProgressBars.querySelectorAll('.progress-bar-slot').forEach(slot => {
      slot.addEventListener('click', (e) => {
        const targetIdx = parseInt(slot.dataset.index, 10);
        this.goToHeroSlide(targetIdx);
        this.resetHeroTimer();
      });
    });

    // Render first featured card state
    this.updateHeroFeaturedCard(0);

    // Start auto-rotation timer (6.5s interval)
    this.startHeroTimer();
  }

  startHeroTimer() {
    this.stopHeroTimer();
    this.state.heroTimer = setInterval(() => {
      const nextIndex = (this.state.heroSlideIndex + 1) % this.state.topProperties.length;
      this.goToHeroSlide(nextIndex);
    }, 6500);
  }

  stopHeroTimer() {
    if (this.state.heroTimer) {
      clearInterval(this.state.heroTimer);
      this.state.heroTimer = null;
    }
  }

  resetHeroTimer() {
    this.startHeroTimer();
  }

  goToHeroSlide(index) {
    this.state.heroSlideIndex = index;
    const slides = this.dom.heroSlider.querySelectorAll('.hero-slide');
    const slots = this.dom.heroProgressBars.querySelectorAll('.progress-bar-slot');

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
      slide.setAttribute('aria-hidden', idx !== index);
    });

    slots.forEach((slot, idx) => {
      slot.classList.toggle('active', idx === index);
    });

    this.updateHeroFeaturedCard(index);
  }

  updateHeroFeaturedCard(index) {
    const prop = this.state.topProperties[index];
    if (!prop) return;

    // Explicitly inject database fields {property_title}, {price_formatted}, etc.
    this.dom.heroFeaturedCard.innerHTML = `
      <div class="featured-card-header">
        <span class="featured-card-label">High-Value Portfolio Anchor</span>
        <span class="featured-index-tracker">0${index + 1} / 0${this.state.topProperties.length}</span>
      </div>
      <div class="featured-card-body">
        <div class="featured-style-tag">${prop.architectural_style}</div>
        <h3 class="featured-title" data-property-id="${prop.id}">${prop.property_title}</h3>
        <p class="featured-location">${prop.neighborhood}</p>
        <div class="featured-price-row">
          <span class="price-label">Valuation Datum</span>
          <span class="price-val">${prop.price_formatted}</span>
        </div>
      </div>
      <button class="btn-primary-explore" style="width: 100%; justify-content: center;" data-property-id="${prop.id}">
        <span>Examine Master Dossier</span>
        <span class="btn-arrow">→</span>
      </button>
    `;

    // Bind click to open quick-view modal
    this.dom.heroFeaturedCard.querySelectorAll('[data-property-id]').forEach(el => {
      el.addEventListener('click', () => {
        this.openQuickView(prop.id);
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Filter & Database Query Controller
     ------------------------------------------------------------------------ */
  setupFilterTaxonomies() {
    const taxonomies = this.db.getFilterTaxonomies();

    // Render Architectural Style Pill Toggles
    this.dom.stylePillContainer.innerHTML = taxonomies.architecturalStyles.map(style => `
      <button 
        type="button" 
        class="filter-pill ${style === this.state.activeStyleFilter ? 'active' : ''}" 
        data-filter-type="style" 
        data-filter-val="${style}"
      >
        <span>${style}</span>
      </button>
    `).join('');

    // Render Status Badge Pill Toggles
    this.dom.statusPillContainer.innerHTML = taxonomies.statusBadges.map(status => `
      <button 
        type="button" 
        class="filter-pill ${status === this.state.activeStatusFilter ? 'active' : ''}" 
        data-filter-type="status" 
        data-filter-val="${status}"
      >
        <span>${status}</span>
      </button>
    `).join('');
  }

  setupEventListeners() {
    // Style Filter Pill click delegation
    this.dom.stylePillContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('[data-filter-type="style"]');
      if (!pill) return;
      this.state.activeStyleFilter = pill.dataset.filterVal;
      this.updatePillActiveClass(this.dom.stylePillContainer, this.state.activeStyleFilter);
      this.renderPortfolioGrid();
    });

    // Status Filter Pill click delegation
    this.dom.statusPillContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('[data-filter-type="status"]');
      if (!pill) return;
      this.state.activeStatusFilter = pill.dataset.filterVal;
      this.updatePillActiveClass(this.dom.statusPillContainer, this.state.activeStatusFilter);
      this.renderPortfolioGrid();
    });

    // Search Query input listener with debouncing
    let searchDebounce;
    this.dom.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        this.state.searchQuery = e.target.value.trim();
        this.renderPortfolioGrid();
      }, 200);
    });

    // Sort order select
    this.dom.sortSelect.addEventListener('change', (e) => {
      this.state.sortBy = e.target.value;
      this.renderPortfolioGrid();
    });

    // Reset filters button
    this.dom.resetFiltersBtn?.addEventListener('click', () => {
      this.resetAllFilters();
    });

    // Modal Close button (if present in DOM)
    this.dom.closeModalBtn?.addEventListener('click', () => {
      this.closeQuickView();
    });

    // Native dialog close listener to guarantee body scroll is always restored
    this.dom.quickViewModal?.addEventListener('close', () => {
      document.body.style.overflow = '';
      this.state.currentModalProperty = null;
    });

    // Modal Backdrop click dismissal
    this.dom.quickViewModal?.addEventListener('click', (e) => {
      const rect = this.dom.quickViewModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        this.closeQuickView();
      }
    });

    // Escape Key listener for native dialog
    this.dom.quickViewModal?.addEventListener('cancel', (e) => {
      e.preventDefault();
      this.closeQuickView();
    });
  }

  updatePillActiveClass(container, activeVal) {
    container.querySelectorAll('.filter-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.filterVal === activeVal);
    });
  }

  resetAllFilters() {
    this.state.activeStyleFilter = 'All';
    this.state.activeStatusFilter = 'All';
    this.state.searchQuery = '';
    this.state.sortBy = 'curated';

    this.dom.searchInput.value = '';
    this.dom.sortSelect.value = 'curated';

    this.updatePillActiveClass(this.dom.stylePillContainer, 'All');
    this.updatePillActiveClass(this.dom.statusPillContainer, 'All');

    this.renderPortfolioGrid();
  }

  /* ------------------------------------------------------------------------
     3. The Portfolio Showcase (Data-Driven Staggered Masonry Grid)
     Incorporate varied layout classes and typographic editorial breather block
     ------------------------------------------------------------------------ */
  async renderPortfolioGrid() {
    const queryResponse = await this.db.query({
      style: this.state.activeStyleFilter,
      status: this.state.activeStatusFilter,
      searchQuery: this.state.searchQuery,
      sortBy: this.state.sortBy
    });

    const { results, totalCount, filteredCount } = queryResponse;

    // Update Filter Summary Bar
    this.dom.filterCountDisplay.textContent = `${filteredCount} of ${totalCount}`;
    this.dom.activeFilterName.textContent = this.state.activeStyleFilter === 'All' && this.state.activeStatusFilter === 'All'
      ? 'Entire Archive'
      : `${this.state.activeStyleFilter} • ${this.state.activeStatusFilter}`;

    if (results.length === 0) {
      this.dom.portfolioGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 6rem 2rem; text-align: center; border: 1px dashed var(--border-medium);">
          <p style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 1rem; color: var(--text-secondary);">
            No architectural assets correspond with your parameters.
          </p>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">
            Try clearing active filters or refining your query string.
          </p>
          <button class="btn-inquire-direct" id="emptyResetBtn">Reset Query Parameters</button>
        </div>
      `;
      document.getElementById('emptyResetBtn')?.addEventListener('click', () => this.resetAllFilters());
      return;
    }

    // Dynamic Asymmetrical Layout Assignment mapping
    // Irregular Rhythm: Lead, Tall, Breather Block, Panorama, Standard, Compact
    const layoutVariants = [
      'card-layout-lead',
      'card-layout-tall',
      'card-layout-standard',
      'card-layout-panorama',
      'card-layout-compact',
      'card-layout-standard',
      'card-layout-tall',
      'card-layout-lead'
    ];

    let gridHtml = '';

    results.forEach((property, index) => {
      // Insert an editorial typographic breather card at index 2 if not heavily filtered
      if (index === 2 && results.length >= 3) {
        gridHtml += `
          <article class="card-layout-breather" aria-label="Editorial Monograph Note">
            <div>
              <div class="breather-pre-title">ARCHITECTURAL STATEMENT // 026</div>
              <blockquote class="breather-quote">
                "We do not build to conquer nature, but to create the acoustic and visual lens through which light, shadow, and stone become contemplative art."
              </blockquote>
              <div class="breather-attribution">
                Curatorial Board & Architecture Council
              </div>
            </div>
            <div class="breather-metric-grid">
              <div>
                <div class="breather-metric-val">$132M+</div>
                <div class="breather-metric-label">Holdings Managed</div>
              </div>
              <div>
                <div class="breather-metric-val">100%</div>
                <div class="breather-metric-label">Private Provenance</div>
              </div>
            </div>
          </article>
        `;
      }

      const layoutClass = layoutVariants[index % layoutVariants.length];
      const statusSlug = property.status_badge.toLowerCase().replace(/\s+/g, '-');

      // EXPLICIT DATABASE DATA-MAPPING:
      // Injects {property_title}, {price_formatted}, {neighborhood}, {status_badge}, {main_image_url}, {architectural_style}
      gridHtml += `
        <article 
          class="property-card ${layoutClass}" 
          data-property-id="${property.id}"
          role="button"
          tabindex="0"
          aria-label="Inspect ${property.property_title}"
        >
          <!-- Full-Bleed Architectural Media -->
          <div class="card-media-viewport">
            <img 
              class="card-img" 
              src="${property.main_image_url}" 
              alt="${property.property_title} - ${property.architectural_style}" 
              loading="lazy"
            />
            <div class="card-media-scrim"></div>
          </div>

          <!-- Top Badge Row (Always Visible) -->
          <div class="card-badge-row">
            <span class="status-badge ${statusSlug}">
              <span class="pulse-dot" style="width: 5px; height: 5px;"></span>
              ${property.status_badge}
            </span>
            <div class="card-quickview-indicator" title="Open Quick-View">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>

          <!-- Micro-Animation Hover Slide-up Overlay -->
          <div class="card-data-overlay">
            <div class="card-taxonomy-meta">
              <span class="card-arch-style">${property.architectural_style}</span>
              <span class="card-id-code">${property.id.toUpperCase()}</span>
            </div>
            
            <h3 class="card-title">${property.property_title}</h3>
            <p class="card-location">${property.neighborhood}</p>

            <!-- Revealed Specs Grid -->
            <div class="card-specs-row">
              <div class="spec-item">
                <span class="spec-label">Area</span>
                <span class="spec-val">${property.sqft.toLocaleString()} sf</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Suites</span>
                <span class="spec-val">${property.beds} Bed / ${property.baths} Bath</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Completed</span>
                <span class="spec-val">${property.year_built}</span>
              </div>
            </div>

            <!-- Pricing & Action Footer -->
            <div class="card-pricing-footer">
              <div class="card-price">${property.price_formatted}</div>
              <div class="card-view-cta">
                Inspect <span>→</span>
              </div>
            </div>
          </div>
        </article>
      `;
    });

    this.dom.portfolioGrid.innerHTML = gridHtml;

    // Attach card click handlers for quick-view modal
    this.dom.portfolioGrid.querySelectorAll('.property-card').forEach(card => {
      card.addEventListener('click', () => {
        const propId = card.dataset.propertyId;
        if (propId) this.openQuickView(propId);
      });

      // Keyboard Accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const propId = card.dataset.propertyId;
          if (propId) this.openQuickView(propId);
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Quick-View Modal / Slide-Out Panel (<dialog>)
     ------------------------------------------------------------------------ */
  async openQuickView(propertyId) {
    const prop = await this.db.getById(propertyId);
    if (!prop) return;

    this.state.currentModalProperty = prop;
    const statusSlug = prop.status_badge.toLowerCase().replace(/\s+/g, '-');

    // Populate Modal with Extended Database Fields
    this.dom.modalContent.innerHTML = `
      <!-- Sticky Modal Navigation Bar -->
      <div class="modal-header-bar">
        <div class="modal-header-meta">
          <span class="status-badge ${statusSlug}">${prop.status_badge}</span>
          <span style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-muted);">${prop.id.toUpperCase()}</span>
        </div>
        <button class="btn-close-modal" id="modalInternalClose" aria-label="Close panel">✕</button>
      </div>

      <!-- Main High-Resolution Photo Canvas -->
      <div class="modal-gallery-viewport">
        <img class="modal-main-img" id="modalMainImg" src="${prop.gallery_images[0] || prop.main_image_url}" alt="${prop.property_title}" />
      </div>

      <!-- Interactive Gallery Thumbnail Strip -->
      <div class="modal-thumbnail-strip">
        ${prop.gallery_images.map((imgUrl, i) => `
          <div class="thumbnail-item ${i === 0 ? 'active' : ''}" data-full-src="${imgUrl}">
            <img src="${imgUrl}" alt="Gallery capture ${i + 1}" />
          </div>
        `).join('')}
      </div>

      <!-- Extended Database Information Body -->
      <div class="modal-body">
        <div class="modal-identity">
          <div class="modal-arch-badge">${prop.architectural_style} • ${prop.architect}</div>
          <h2 class="modal-title">${prop.property_title}</h2>
          <p class="modal-location">${prop.neighborhood}</p>
          <div class="modal-price-box">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted);">Current Asset Valuation</span>
            <span class="modal-price-val">${prop.price_formatted}</span>
          </div>
        </div>

        <!-- Extended Technical Specifications Grid -->
        <div class="spec-grid-extended">
          <div class="spec-cell">
            <span class="spec-cell-label">Interior Area</span>
            <span class="spec-cell-val">${prop.sqft.toLocaleString()} Sq Ft</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-label">Bedrooms</span>
            <span class="spec-cell-val">${prop.beds} Suites</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-label">Bathrooms</span>
            <span class="spec-cell-val">${prop.baths} Bath</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-label">Year Built</span>
            <span class="spec-cell-val">${prop.year_built}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-label">Land Parcel</span>
            <span class="spec-cell-val">${prop.lot_size}</span>
          </div>
          <div class="spec-cell">
            <span class="spec-cell-label">Lead Architect</span>
            <span class="spec-cell-val">${prop.architect}</span>
          </div>
          <div class="spec-cell" style="grid-column: span 2;">
            <span class="spec-cell-label">GPS Spatial Datum</span>
            <span class="spec-cell-val" style="font-family: var(--font-mono); font-size: 0.85rem;">${prop.coordinates}</span>
          </div>
        </div>

        <!-- Curatorial Statement -->
        <div class="modal-narrative-block">
          <h4>Curatorial Statement</h4>
          <p>${prop.curator_statement}</p>
        </div>

        <!-- Confidential Agent & Architectural Notes -->
        <div class="modal-narrative-block">
          <h4>Private Broker & Engineering Notes</h4>
          <div class="agent-notes-box">
            <p>${prop.agent_notes}</p>
          </div>
        </div>

        <!-- Salient Architectural Features -->
        <div class="modal-narrative-block">
          <h4>Signature Elements</h4>
          <ul class="features-tags-list">
            ${prop.features.map(f => `<li class="feature-tag">${f}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="modal-footer-actions">
        <button class="btn-dossier-request" id="btnRequestDossier">
          Request Confidential Dossier
        </button>
        <button class="btn-share-asset" id="btnCopyAssetLink">
          Share Record
        </button>
      </div>
    `;

    // Bind Gallery Thumbnail Switching
    const mainImg = document.getElementById('modalMainImg');
    const thumbnails = this.dom.modalContent.querySelectorAll('.thumbnail-item');
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.style.opacity = '0.4';
        setTimeout(() => {
          mainImg.src = thumb.dataset.fullSrc;
          mainImg.style.opacity = '1';
        }, 120);
      });
    });

    // Bind Internal Close Button
    document.getElementById('modalInternalClose')?.addEventListener('click', () => {
      this.closeQuickView();
    });

    // Bind Inquire / Request Dossier Button
    document.getElementById('btnRequestDossier')?.addEventListener('click', () => {
      this.triggerToast(
        "Private Dossier Dispatched",
        `Comprehensive architectural blueprints and ownership dossier for ${prop.property_title} have been queued for your secure email.`
      );
    });

    // Bind Share Record Button
    document.getElementById('btnCopyAssetLink')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href);
      this.triggerToast(
        "Direct Coordinate Copied",
        `Direct encrypted link to asset record ${prop.id.toUpperCase()} copied to clipboard.`
      );
    });

    // Open Native Dialog Modal
    this.dom.quickViewModal.showModal();
    document.body.style.overflow = 'hidden';
  }

  closeQuickView() {
    this.dom.quickViewModal.close();
    document.body.style.overflow = '';
    this.state.currentModalProperty = null;
  }

  /* ------------------------------------------------------------------------
     5. Interactive Toast Notification Feedback
     ------------------------------------------------------------------------ */
  triggerToast(title, message) {
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <div class="toast-content">
        <span class="toast-title">${title}</span>
        <span class="toast-message">${message}</span>
      </div>
    `;

    this.dom.toastStack.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  /* ------------------------------------------------------------------------
     6. Scroll & Atmospheric Listeners
     ------------------------------------------------------------------------ */
  setupScrollListener() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.dom.masthead.classList.add('scrolled');
      } else {
        this.dom.masthead.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}

// Instantiate on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.ValencePortfolio = new RealEstatePortfolioApp();
});
