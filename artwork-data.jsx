/* Codex Luminara – Artwork Detail Data (slugs + descriptions) */

function slugify(str) {
  return str.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Extended artwork info for detail pages
const ARTWORK_DETAILS = {
  'chauvet-cave-paintings': { medium: 'Charcoal and ochre on limestone', dimensions: 'Various', location: 'Chauvet Cave, Ardèche, France', description: 'Among the earliest known figurative drawings in the world, these paintings depict animals with astonishing dynamism and anatomical precision, rendered by firelight deep within a limestone cavern.' },
  'hall-of-bulls-lascaux': { medium: 'Mineral pigments on limestone', dimensions: 'Wall spans ~5.5m', location: 'Lascaux Cave, Dordogne, France', description: 'The great hall presents a processional panorama of aurochs, horses, and deer, painted with a sophistication that belies their ancient origins — a testament to the artistic impulse at the dawn of human culture.' },
  'narmer-palette': { medium: 'Carved siltstone', dimensions: '64 cm × 42 cm', location: 'Egyptian Museum, Cairo', description: 'This ceremonial palette commemorates the unification of Upper and Lower Egypt, its relief carvings establishing the visual conventions that would endure for three thousand years of pharaonic art.' },
  'pompeii-frescoes': { medium: 'Fresco on plaster', dimensions: 'Various', location: 'Pompeii Archaeological Site, Italy', description: 'Preserved beneath volcanic ash, these vibrant wall paintings reveal the sophistication of Roman domestic art — mythological scenes rendered with illusionistic depth and luminous color.' },
  'fayum-mummy-portraits': { medium: 'Encaustic on wood', dimensions: 'Various, typically 40 × 20 cm', location: 'Various museums worldwide', description: 'Hauntingly lifelike, these funerary portraits bridge the gap between ancient and modern portraiture, their naturalistic gaze speaking across two millennia with startling intimacy.' },
  'mosaic-of-justinian-i': { medium: 'Glass and stone tesserae', dimensions: 'Wall mosaic', location: 'Basilica of San Vitale, Ravenna, Italy', description: 'Resplendent in imperial purple and gold, Justinian stands flanked by clergy and soldiers — a shimmering declaration of divine authority rendered in thousands of tiny glass cubes.' },
  'lindisfarne-gospels': { medium: 'Ink and pigment on vellum', dimensions: '34 cm × 25 cm', location: 'British Library, London', description: 'A masterwork of Insular art, its carpet pages weave Celtic knots, Germanic interlace, and Mediterranean motifs into dizzying harmony — each page a meditation in patience and devotion.' },
  'book-of-kells-chi-rho': { medium: 'Ink and pigment on vellum', dimensions: '33 cm × 24 cm', location: 'Trinity College, Dublin', description: 'The Chi Rho page transforms two Greek letters into an explosion of ornamental wonder — spirals, animals, and human figures hidden within an inexhaustible labyrinth of color and line.' },
  'utrecht-psalter': { medium: 'Ink on vellum', dimensions: '33 cm × 26 cm', location: 'Utrecht University Library', description: 'Drawn with urgent, flickering pen strokes, its illustrations bring the Psalms to vivid life — figures gesture, battle, and worship with an expressiveness centuries ahead of its time.' },
  'scrovegni-chapel-frescoes': { medium: 'Fresco', dimensions: 'Full chapel interior', location: 'Scrovegni Chapel, Padua, Italy', description: 'Giotto shattered Byzantine convention, giving his figures weight, emotion, and spatial presence. These frescoes mark the dawn of Western painting as we understand it.' },
  'the-arnolfini-portrait': { medium: 'Oil on oak panel', dimensions: '82 cm × 60 cm', location: 'National Gallery, London', description: 'Van Eyck\'s meticulous realism transforms a domestic scene into a mirror of the visible world — every surface gleams, every texture speaks, every symbol invites interpretation.' },
  'the-birth-of-venus': { medium: 'Tempera on canvas', dimensions: '172.5 cm × 278.9 cm', location: 'Uffizi Gallery, Florence', description: 'Venus emerges from the sea foam in a gentle cascade of golden hair, her modest pose borrowed from classical sculpture yet animated by Botticelli\'s flowing, lyrical line.' },
  'mona-lisa': { medium: 'Oil on poplar panel', dimensions: '77 cm × 53 cm', location: 'Musée du Louvre, Paris', description: 'Her enigmatic smile has captivated the world for five centuries. Leonardo\'s sfumato technique dissolves edges into atmospheric haze, creating an image that seems to breathe and shift before our eyes.' },
  'sistine-chapel-ceiling': { medium: 'Fresco', dimensions: '40 m × 14 m', location: 'Sistine Chapel, Vatican City', description: 'Michelangelo\'s titanic achievement — over three hundred figures spanning the Book of Genesis, painted lying on his back on scaffolding. The Creation of Adam remains humanity\'s most iconic image of divine spark.' },
  'the-night-watch': { medium: 'Oil on canvas', dimensions: '363 cm × 437 cm', location: 'Rijksmuseum, Amsterdam', description: 'Rembrandt shattered the conventions of group portraiture, animating his militia company with dramatic chiaroscuro and implied movement — a frozen instant of martial theater.' },
  'girl-with-a-pearl-earring': { medium: 'Oil on canvas', dimensions: '44.5 cm × 39 cm', location: 'Mauritshuis, The Hague', description: 'Vermeer distills portraiture to its luminous essence — a girl turning, lips parted, the pearl at her ear catching light like a captured star against the infinite dark.' },
  'the-third-of-may-1808': { medium: 'Oil on canvas', dimensions: '268 cm × 347 cm', location: 'Museo del Prado, Madrid', description: 'Goya\'s searing protest against war — the white-shirted martyr flings his arms wide before the firing squad, his face a mask of terror illuminated by a single lantern in the surrounding darkness.' },
  'liberty-leading-the-people': { medium: 'Oil on canvas', dimensions: '260 cm × 325 cm', location: 'Musée du Louvre, Paris', description: 'Delacroix fuses allegory and reportage in a surging pyramid of smoke, bodies, and revolutionary fervor — Liberty herself strides barefoot over the barricades, tricolor aloft.' },
  'impression-sunrise': { medium: 'Oil on canvas', dimensions: '48 cm × 63 cm', location: 'Musée Marmottan Monet, Paris', description: 'The painting that named a movement — Monet\'s harbor dissolves into dabs of orange, blue, and grey, capturing not the scene itself but the fleeting sensation of light on water at dawn.' },
  'the-starry-night': { medium: 'Oil on canvas', dimensions: '73.7 cm × 92.1 cm', location: 'Museum of Modern Art, New York', description: 'Van Gogh\'s turbulent night sky swirls with cosmic energy above a sleeping village — each brushstroke a visible pulse of emotion, transforming observation into ecstatic vision.' },
  'les-demoiselles-davignon': { medium: 'Oil on canvas', dimensions: '243.9 cm × 233.7 cm', location: 'Museum of Modern Art, New York', description: 'Picasso detonated the conventions of Western art — five angular figures confront the viewer with mask-like faces, their fractured forms announcing the arrival of Cubism and the modern era.' },
  'the-persistence-of-memory': { medium: 'Oil on canvas', dimensions: '24.1 cm × 33 cm', location: 'Museum of Modern Art, New York', description: 'Dalí\'s melting watches drape across a dreamscape of uncanny clarity — time itself becomes soft, pliant, and absurd in this iconic manifesto of Surrealist painting.' },
  'campbells-soup-cans': { medium: 'Synthetic polymer paint on canvas', dimensions: '32 canvases, each 50.8 cm × 40.6 cm', location: 'Museum of Modern Art, New York', description: 'Warhol\'s deadpan repetition of a supermarket staple collapsed the boundary between commerce and art, high and low — every can identical yet each subtly different, like mass production itself.' },
  'view-of-delft': { medium: 'Oil on canvas', dimensions: '96.5 cm × 115.7 cm', location: 'Mauritshuis, The Hague', description: 'Vermeer captures his hometown under a luminous sky with an almost photographic precision — yet the light itself is the true subject, glowing on rooftops and shimmering across still water.' },
};

// Build a flat artwork list from TIMELINE_ERAS with slugs
function buildArtworkIndex() {
  const index = [];
  TIMELINE_ERAS.forEach(era => {
    era.entries.forEach(entry => {
      const slug = slugify(entry.title);
      const details = ARTWORK_DETAILS[slug] || {};
      index.push({
        slug,
        ...entry,
        era: era.label,
        eraId: era.id,
        period: era.period,
        ...details,
      });
    });
  });
  return index;
}

function getArtworkBySlug(slug) {
  return buildArtworkIndex().find(a => a.slug === slug);
}

Object.assign(window, { slugify, ARTWORK_DETAILS, buildArtworkIndex, getArtworkBySlug });
