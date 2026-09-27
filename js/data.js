/**
 * VALENCE // DOMAIN (Architectural Atelier & Private Register)
 * Mock Database Schema & Properties Table
 * 
 * SCHEMA DEFINITION:
 * - id: unique asset identifier [UUID / String]
 * - property_title: official architectural monograph title [String]
 * - price_formatted: human-readable currency representation [String]
 * - price_numeric: raw integer value for sorting and analytical operations [Number]
 * - neighborhood: geographic precinct and city [String]
 * - status_badge: transactional availability state ("Available" | "Off-Market" | "Private Treaty" | "Under Contract")
 * - main_image_url: primary high-resolution photography asset [URL]
 * - architectural_style: design movement and school [String]
 * 
 * EXTENDED SPECIFICATIONS (Quick-View Drawer):
 * - architect: lead architect or studio [String]
 * - year_built: completion year [Number]
 * - sqft: interior livable area in square feet [Number]
 * - beds: count of principal suites [Number]
 * - baths: count of bathrooms [Number]
 * - lot_size: land holding parcel [String]
 * - coordinates: exact GPS datum for mapping [String]
 * - curator_statement: high-level editorial narrative [String]
 * - agent_notes: private broker insights and material specifications [String]
 * - features: curated list of notable architectural elements [Array<String>]
 * - gallery_images: auxiliary photography collection [Array<URL>]
 */

export const PROPERTIES_DATABASE = [
  {
    id: "vlc-001",
    property_title: "The Kanso Monolith",
    price_formatted: "$18,500,000",
    price_numeric: 18500000,
    neighborhood: "Trousdale Estates, Beverly Hills",
    status_badge: "Off-Market",
    main_image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    architectural_style: "Brutalist Modernism",
    architect: "Tadao Ando & Studio Kanso",
    year_built: 2023,
    sqft: 9850,
    beds: 5,
    baths: 7,
    lot_size: "1.24 Acres",
    coordinates: "34.0900° N, 118.3965° W",
    curator_statement: "A masterwork of board-formed concrete and monolithic basalt, positioned at the crest of Trousdale with panoramic axis views across the Los Angeles basin.",
    agent_notes: "Constructed with imported Japanese cedar formwork and seismic-dampened post-tensioned slabs. Includes temperature-controlled 1,200-bottle subterranean vault and dual cantilevered infinity reflection ponds.",
    features: [
      "Board-formed structural concrete",
      "Cantilevered 65ft infinity lap pool",
      "Subterranean tasting salon & vault",
      "Full Lutron Homeworks QSX integration",
      "Private zen meditation atrium"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "vlc-002",
    property_title: "The Dune Pavilion",
    price_formatted: "$14,200,000",
    price_numeric: 14200000,
    neighborhood: "Amagansett Dunes, The Hamptons",
    status_badge: "Available",
    main_image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    architectural_style: "Organic Contemporary",
    architect: "Bates Masi + Architects",
    year_built: 2024,
    sqft: 7400,
    beds: 6,
    baths: 6.5,
    lot_size: "2.10 Oceanfront Acres",
    coordinates: "40.9782° N, 72.1429° W",
    curator_statement: "Sculpted directly into maritime coastal topography, featuring weathered Alaskan yellow cedar louvers that filter Atlantic ocean light into shifting geometric shadows.",
    agent_notes: "Direct private dune boardwalk deed with pristine beachfront access. Geothermal climate loop, triple-glazed acoustic curtain walling by Sky-Frame, and custom bronze hardware throughout.",
    features: [
      "Oceanfront private dune boardwalk",
      "Sky-Frame motorized glass facades",
      "Geothermal heating & passive cooling",
      "Weathered Alaskan cedar screening",
      "Custom Molteni&C Boffi kitchen suite"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "vlc-003",
    property_title: "Villa Solstice Ridge",
    price_formatted: "$26,800,000",
    price_numeric: 26800000,
    neighborhood: "Camelback Mountain, Paradise Valley",
    status_badge: "Private Treaty",
    main_image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    architectural_style: "Desert Minimalist",
    architect: "Wendell Burnette Architects",
    year_built: 2022,
    sqft: 12400,
    beds: 6,
    baths: 9,
    lot_size: "4.85 Desert Acres",
    coordinates: "33.5133° N, 111.9680° W",
    curator_statement: "An earth-anchored citadel crafted with rammed earth extracted directly from the excavation site, blending indistinguishably into the red sandstone cliffs.",
    agent_notes: "Rammed earth walls reach 24 inches in thermal mass thickness, yielding peerless thermal and acoustic isolation. Helipad easement on upper ridgeline; 8-vehicle showcase gallery.",
    features: [
      "24-inch rammed earth thermal envelope",
      "Private ridgeline helipad certification",
      "8-bay climate-controlled collector garage",
      "Negative-edge reflection canal",
      "Integrated astronomical observation terrace"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "vlc-004",
    property_title: "Haus am Waldrand",
    price_formatted: "$9,750,000",
    price_numeric: 9750000,
    neighborhood: "Grunewald Forest, Berlin",
    status_badge: "Available",
    main_image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    architectural_style: "Bauhaus Revival",
    architect: "David Chipperfield Architects",
    year_built: 2023,
    sqft: 6150,
    beds: 4,
    baths: 4.5,
    lot_size: "0.95 Acres",
    coordinates: "52.4833° N, 13.2500° E",
    curator_statement: "Clean geometry, pristine white stucco, and continuous horizontal steel ribbon fenestration honoring Walter Gropius and Mies van der Rohe in an ancient pine forest setting.",
    agent_notes: "Features restored vintage terrazzo flooring with brass dividing strips. Custom thermal break steel doors and certified Passivhaus energy efficiency rating.",
    features: [
      "Passivhaus ultra-low energy certification",
      "Hand-poured Venetian terrazzo flooring",
      "Floor-to-ceiling blackened bronze ribbons",
      "Bespoke Bulthaup b3 kitchen system",
      "Forest sauna and cold plunge grotto"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "vlc-005",
    property_title: "Fjord Lys Pavilion",
    price_formatted: "$11,900,000",
    price_numeric: 11900000,
    neighborhood: "Holmenkollen Ridge, Oslo",
    status_badge: "Under Contract",
    main_image_url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    architectural_style: "Nordic Biophilic",
    architect: "Snøhetta",
    year_built: 2024,
    sqft: 8100,
    beds: 5,
    baths: 5,
    lot_size: "3.20 Alpine Acres",
    coordinates: "59.9650° N, 10.6650° E",
    curator_statement: "A sculptural pine and green-roofed refuge hovering dramatically above the Oslofjord, designed to optimize Arctic sunlight capture during seasonal solstices.",
    agent_notes: "Cross-laminated timber (CLT) structural grid with zero-carbon footprint metrics. Natural moss insulation buffers winter temperatures and provides sound suppression.",
    features: [
      "Carbon-negative CLT structural engineering",
      "Living sedum-moss insulating roof system",
      "Panoramic views across the Oslofjord",
      "Nordic slate thermal storage hearth",
      "Direct private access to Holmenkollen trails"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "vlc-006",
    property_title: "Palazzo di Pietra",
    price_formatted: "$21,000,000",
    price_numeric: 21000000,
    neighborhood: "Val d'Orcia, Tuscany",
    status_badge: "Private Treaty",
    main_image_url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
    architectural_style: "Neo-Classical Pavilion",
    architect: "Studio Peregalli & Claudio Silvestrin",
    year_built: 2021,
    sqft: 11200,
    beds: 7,
    baths: 8.5,
    lot_size: "14.50 Vineyard Hectares",
    coordinates: "43.0642° N, 11.6033° E",
    curator_statement: "A dialogue between 17th-century Tuscan limestone masonry and purist Italian minimalism, overlooking rolling UNESCO World Heritage cypress hills.",
    agent_notes: "Restored using original lime mortar and Pietra Serena stone. Operates an active DOCG Sangiovese vineyard yielding 8,000 private reserve bottles annually.",
    features: [
      "14.5 hectares certified organic DOCG vineyard",
      "Hand-quarried Pietra Serena limestone loggia",
      "Vaulted subterranean wine aging cantina",
      "Heated stone colonnade pool sanctuary",
      "Separate 2-bedroom guest casita & olive grove"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "vlc-007",
    property_title: "The Glass Cantilever",
    price_formatted: "$16,750,000",
    price_numeric: 16750000,
    neighborhood: "Belvedere Island, San Francisco Bay",
    status_badge: "Available",
    main_image_url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
    architectural_style: "Organic Contemporary",
    architect: "Aidlin Darling Design",
    year_built: 2024,
    sqft: 8650,
    beds: 5,
    baths: 6,
    lot_size: "0.88 Cliffside Acres",
    coordinates: "37.8724° N, 122.4646° W",
    curator_statement: "Suspended 28 feet over coastal cliffs, framed in aeronautical carbon steel and ultra-clear low-iron glass capturing Golden Gate sunsets and the city skyline.",
    agent_notes: "Engineered with deep bedrock caissons. Includes a glass hydraulic elevator connecting the cliffside car port directly to all three living pavilions.",
    features: [
      "Aeronautical cantilever spanning 28 feet",
      "Private deep-water yacht dock berth",
      "Panoramic views of the Golden Gate Bridge",
      "Glass hydraulic vertical transport tube",
      "Integrated rooftop sculpture garden"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "vlc-008",
    property_title: "Casa de Sombra",
    price_formatted: "$13,500,000",
    price_numeric: 13500000,
    neighborhood: "Pedregal Cliffs, Cabo San Lucas",
    status_badge: "Off-Market",
    main_image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    architectural_style: "Desert Minimalist",
    architect: "Javier Senosiain & Sordo Madaleno",
    year_built: 2023,
    sqft: 9100,
    beds: 6,
    baths: 7.5,
    lot_size: "1.75 Pacific Acres",
    coordinates: "22.8833° N, 109.9167° W",
    curator_statement: "Carved into the granite spine where the Sea of Cortez meets the Pacific, employing heavy shade pergolas and flowing seawater channels for microclimate moderation.",
    agent_notes: "Subterranean oceanfront spa carved directly into living bedrock. Fully off-grid capable with bifacial solar canopy and dual desalination plant.",
    features: [
      "Granite bedrock oceanfront spa chamber",
      "Living seawater circulation water features",
      "Bifacial solar array + Tesla Powerwall 3 grid",
      "Private cliffside fire pit lounge",
      "Custom travertine and teak joinery"
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80"
    ]
  }
];

/**
 * Property Data Client Class
 * Simulates an asynchronous enterprise architectural repository query engine
 */
export class PropertyDatabaseClient {
  constructor(dataset = PROPERTIES_DATABASE) {
    this._data = [...dataset];
  }

  /**
   * Retrieves the top N highest-value acquisitions for hero rotation
   * @param {number} limit 
   * @returns {Array} Top properties sorted by price_numeric descending
   */
  getTopValuedProperties(limit = 3) {
    return [...this._data]
      .sort((a, b) => b.price_numeric - a.price_numeric)
      .slice(0, limit);
  }

  /**
   * Returns distinct filter options available in the database
   */
  getFilterTaxonomies() {
    const architecturalStyles = ["All", ...new Set(this._data.map(p => p.architectural_style))];
    const statusBadges = ["All", ...new Set(this._data.map(p => p.status_badge))];
    return { architecturalStyles, statusBadges };
  }

  /**
   * Query database with filtering, search, and sorting criteria
   * @param {Object} queryOptions 
   * @returns {Promise<{results: Array, totalCount: number, filteredCount: number}>}
   */
  async query({ style = "All", status = "All", sortBy = "curated", searchQuery = "" } = {}) {
    // Simulate lightweight network latency for realism
    await new Promise(resolve => setTimeout(resolve, 80));

    let filtered = this._data.filter(property => {
      const matchStyle = style === "All" || property.architectural_style === style;
      const matchStatus = status === "All" || property.status_badge === status;
      const matchSearch = !searchQuery || 
        property.property_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.architect.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchStyle && matchStatus && matchSearch;
    });

    if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price_numeric - a.price_numeric);
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price_numeric - b.price_numeric);
    } else if (sortBy === "sqft-desc") {
      filtered.sort((a, b) => b.sqft - a.sqft);
    }

    return {
      results: filtered,
      totalCount: this._data.length,
      filteredCount: filtered.length
    };
  }

  /**
   * Fetch a single property record by ID
   * @param {string} id 
   * @returns {Object|null}
   */
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 40));
    return this._data.find(p => p.id === id) || null;
  }
}
