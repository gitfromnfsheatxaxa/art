/* Codex Luminara – Timeline Data & Components */

const TIMELINE_ERAS = [
  {
    id: 'prehistoric',
    label: 'Prehistoric Art',
    period: 'Before Christ',
    defaultBg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/1280px-Lascaux_painting.jpg',
    entries: [
      { year: '~30,000 BC', title: 'Chauvet Cave Paintings', artist: 'Unknown', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Chauvet_cave%2C_bison.jpg/1280px-Chauvet_cave%2C_bison.jpg' },
      { year: '~15,000 BC', title: 'Hall of Bulls, Lascaux', artist: 'Unknown', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/1280px-Lascaux_painting.jpg' },
      { year: '~3,000 BC', title: 'Narmer Palette', artist: 'Ancient Egypt', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Narmer_Palette.jpg/800px-Narmer_Palette.jpg' },
    ],
  },
  {
    id: 'classical',
    label: 'Classical Antiquity',
    period: '0 – 500 AD',
    defaultBg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Meister_von_San_Vitale_in_Ravenna_004.jpg/1280px-Meister_von_San_Vitale_in_Ravenna_004.jpg',
    entries: [
      { year: '~79 AD', title: 'Pompeii Frescoes', artist: 'Roman', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pompeii_-_Casa_dei_Vettii_-_Ixion.jpg/1024px-Pompeii_-_Casa_dei_Vettii_-_Ixion.jpg' },
      { year: '~130 AD', title: 'Fayum Mummy Portraits', artist: 'Romano-Egyptian', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Fayum-34.jpg/800px-Fayum-34.jpg' },
      { year: '~547 AD', title: 'Mosaic of Justinian I', artist: 'Byzantine', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Meister_von_San_Vitale_in_Ravenna_004.jpg/1280px-Meister_von_San_Vitale_in_Ravenna_004.jpg' },
    ],
  },
  {
    id: 'early-medieval',
    label: 'Early Medieval',
    period: '500 – 1000 AD',
    defaultBg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/KellsFol034rChiRhoMonwordfixed.jpg/800px-KellsFol034rChiRhoMonwordfixed.jpg',
    entries: [
      { year: '~680 AD', title: 'Lindisfarne Gospels', artist: 'Eadfrith of Lindisfarne', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Lindisfarne_Gospels_folio_27r.jpg/800px-Lindisfarne_Gospels_folio_27r.jpg' },
      { year: '~800 AD', title: 'Book of Kells – Chi Rho', artist: 'Celtic Monks', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/KellsFol034rChiRhoMonwordfixed.jpg/800px-KellsFol034rChiRhoMonwordfixed.jpg' },
      { year: '~830 AD', title: 'Utrecht Psalter', artist: 'Carolingian', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Utrecht_Psalter_fol25.jpg/1280px-Utrecht_Psalter_fol25.jpg' },
    ],
  },
  {
    id: 'late-medieval',
    label: 'Late Medieval & Early Renaissance',
    period: '1000 – 1500 AD',
    defaultBg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/800px-Van_Eyck_-_Arnolfini_Portrait.jpg',
    entries: [
      { year: '1305', title: 'Scrovegni Chapel Frescoes', artist: 'Giotto di Bondone', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Giotto_di_Bondone_-_No._18_Scenes_from_the_Life_of_Christ_-_2._Adoration_of_the_Magi_-_WGA09195.jpg/1280px-Giotto_di_Bondone_-_No._18_Scenes_from_the_Life_of_Christ_-_2._Adoration_of_the_Magi_-_WGA09195.jpg' },
      { year: '1434', title: 'The Arnolfini Portrait', artist: 'Jan van Eyck', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/800px-Van_Eyck_-_Arnolfini_Portrait.jpg' },
      { year: '1485', title: 'The Birth of Venus', artist: 'Sandro Botticelli', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1920px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg' },
    ],
  },
  {
    id: 'renaissance',
    label: 'High Renaissance & Baroque',
    period: '1500 – 1700 AD',
    defaultBg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/800px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg',
    entries: [
      { year: '1503', title: 'Mona Lisa', artist: 'Leonardo da Vinci', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg' },
      { year: '1512', title: 'Sistine Chapel Ceiling', artist: 'Michelangelo', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Creation_of_Adam_%28Michelangelo%29_Detail.jpg/1280px-Creation_of_Adam_%28Michelangelo%29_Detail.jpg' },
      { year: '1642', title: 'The Night Watch', artist: 'Rembrandt', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1920px-The_Night_Watch_-_HD.jpg' },
      { year: '1665', title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg' },
    ],
  },
  {
    id: 'enlightenment',
    label: 'Enlightenment & Romanticism',
    period: '1700 – 1900 AD',
    defaultBg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vermeer-view-of-delft.jpg/1280px-Vermeer-view-of-delft.jpg',
    entries: [
      { year: '1814', title: 'The Third of May 1808', artist: 'Francisco Goya', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg/1280px-El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg' },
      { year: '1830', title: 'Liberty Leading the People', artist: 'Eugène Delacroix', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg' },
      { year: '1872', title: 'Impression, Sunrise', artist: 'Claude Monet', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg' },
      { year: '1889', title: 'The Starry Night', artist: 'Vincent van Gogh', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' },
    ],
  },
  {
    id: 'modern',
    label: 'Modern & Contemporary',
    period: '1900 – Present',
    defaultBg: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
    entries: [
      { year: '1907', title: "Les Demoiselles d'Avignon", artist: 'Pablo Picasso', img: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg' },
      { year: '1931', title: 'The Persistence of Memory', artist: 'Salvador Dalí', img: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg' },
      { year: '1962', title: "Campbell's Soup Cans", artist: 'Andy Warhol', img: 'https://upload.wikimedia.org/wikipedia/en/9/95/Campbell%27s_Soup_Cans_MOMA_reduced_80%25.jpg' },
    ],
  },
];

// ─── Ornate SVG Timeline Line ───
function TimelineSVG({ activeEra, totalEras }) {
  const progress = activeEra / Math.max(totalEras - 1, 1);
  return (
    <svg width="40" height="100%" viewBox="0 0 40 600" preserveAspectRatio="none"
      style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, transform: 'translateX(-50%)', height: '100%', zIndex: 5 }}>
      <defs>
        <linearGradient id="goldLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CODEX.gold} stopOpacity="0.1" />
          <stop offset="20%" stopColor={CODEX.gold} stopOpacity="0.8" />
          <stop offset="80%" stopColor={CODEX.gold} stopOpacity="0.8" />
          <stop offset="100%" stopColor={CODEX.gold} stopOpacity="0.1" />
        </linearGradient>
        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CODEX.glowGold} />
          <stop offset="100%" stopColor={CODEX.gold} />
        </linearGradient>
      </defs>
      {/* Main line */}
      <line x1="20" y1="40" x2="20" y2="560" stroke="url(#goldLine)" strokeWidth="1.5" filter="url(#goldGlow)" />
      {/* Progress fill */}
      <line x1="20" y1="40" x2="20" y2={40 + progress * 520} stroke="url(#goldFill)" strokeWidth="2" filter="url(#goldGlow)"
        style={{ transition: 'y2 0.8s cubic-bezier(0.4,0,0.2,1)' }}>
        <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </line>
      {/* Era dots */}
      {Array.from({ length: totalEras }).map((_, i) => {
        const y = 40 + (i / Math.max(totalEras - 1, 1)) * 520;
        const isActive = i === activeEra;
        return (
          <g key={i}>
            <circle cx="20" cy={y} r={isActive ? 6 : 3.5} fill={isActive ? CODEX.glowGold : CODEX.gold}
              opacity={isActive ? 1 : 0.5} filter={isActive ? 'url(#goldGlow)' : ''}
              style={{ transition: 'all 0.6s ease' }} />
            {isActive && (
              <circle cx="20" cy={y} r="10" fill="none" stroke={CODEX.glowGold} strokeWidth="1" opacity="0.4">
                <animate attributeName="r" from="8" to="16" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}
      {/* Ornamental caps */}
      <path d="M15,35 L20,25 L25,35" fill="none" stroke={CODEX.gold} strokeWidth="1" opacity="0.6" />
      <path d="M15,565 L20,575 L25,565" fill="none" stroke={CODEX.gold} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

// ─── Timeline Entry ───
function TimelineEntry({ entry, index, side, onHover, isActive }) {
  const [hovered, setHovered] = React.useState(false);
  const isLeft = side === 'left';
  const slug = typeof slugify === 'function' ? slugify(entry.title) : '';

  return (
    <a
      href={slug ? `Artwork Detail.html?slug=${slug}` : '#'}
      onMouseEnter={() => { setHovered(true); onHover(entry.img); }}
      onMouseLeave={() => { setHovered(false); onHover(null); }}
      onClick={(e) => { if (!slug) e.preventDefault(); }}
      style={{
        display: 'flex', flexDirection: isLeft ? 'row-reverse' : 'row',
        alignItems: 'center', gap: 16,
        cursor: 'pointer', outline: 'none', textDecoration: 'none',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : `translateY(20px)`,
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.15}s`,
      }}
    >
      <div style={{
        textAlign: isLeft ? 'right' : 'left',
        padding: '12px 20px',
        background: hovered ? 'rgba(28,24,20,0.3)' : 'rgba(28,24,20,0.12)',
        backdropFilter: 'blur(16px)',
        borderRadius: 2,
        border: hovered ? `1px solid ${CODEX.gold}44` : '1px solid transparent',
        transition: 'all 0.4s ease',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        maxWidth: 280,
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 13, color: CODEX.gold + 'aa',
          letterSpacing: '0.08em', marginBottom: 4,
        }}>{entry.year}</div>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 16, color: CODEX.parchment,
          lineHeight: 1.3, marginBottom: 3,
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}>{entry.title}</div>
        <div style={{
          fontFamily: "'EB Garamond', serif", fontSize: 14, color: CODEX.parchment + 'aa',
          fontStyle: 'italic',
        }}>{entry.artist}</div>
      </div>
    </a>
  );
}

Object.assign(window, { TIMELINE_ERAS, TimelineSVG, TimelineEntry });
