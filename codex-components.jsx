/* Codex Luminara – Shared Components */

// ─── Design Tokens ───
const CODEX = {
  gold: '#D4AF77',
  burgundy: '#5C2C2C',
  parchment: '#F5E8C7',
  dark: '#1C1814',
  ink: '#3C2F2F',
  glowGold: '#E8C77F',
  overlay: 'rgba(28, 24, 20, 0.65)',
};

// ─── Artwork URLs (Wikimedia Commons, high-res) ───
const ARTWORKS = {
  lastSupper: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/1920px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg',
  schoolAthens: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1920px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
  weddingCana: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Paolo_Veronese_008.jpg/1920px-Paolo_Veronese_008.jpg',
  lasMeninas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/1280px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg',
  nightWatch: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1920px-The_Night_Watch_-_HD.jpg',
  viewDelft: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vermeer-view-of-delft.jpg/1280px-Vermeer-view-of-delft.jpg',
  monaLisa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  ladyErmine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/800px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg',
  girlPearl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
  castiglione: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Portrait_de_Baldassare_Castiglione.jpg/800px-Portrait_de_Baldassare_Castiglione.jpg',
  durerSelf: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Albrecht_D%C3%BCrer_-_1500_self-portrait_%28High_resolution_and_detail%29.jpg/800px-Albrecht_D%C3%BCrer_-_1500_self-portrait_%28High_resolution_and_detail%29.jpg',
  lacemaker: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Johannes_Vermeer_-_The_lacemaker_%28c.1669-1671%29.jpg/800px-Johannes_Vermeer_-_The_lacemaker_%28c.1669-1671%29.jpg',
};

const DESKTOP_SECTIONS = [
  { id: 'hero', art: ARTWORKS.lastSupper, title: 'The Last Supper', artist: 'Leonardo da Vinci' },
  { id: 'school', art: ARTWORKS.schoolAthens, title: 'The School of Athens', artist: 'Raphael' },
  { id: 'wedding', art: ARTWORKS.weddingCana, title: 'The Wedding at Cana', artist: 'Paolo Veronese' },
  { id: 'meninas', art: ARTWORKS.lasMeninas, title: 'Las Meninas', artist: 'Diego Velázquez' },
  { id: 'nightwatch', art: ARTWORKS.nightWatch, title: 'The Night Watch', artist: 'Rembrandt' },
  { id: 'delft', art: ARTWORKS.viewDelft, title: 'View of Delft', artist: 'Johannes Vermeer' },
];

const MOBILE_SECTIONS = [
  { id: 'hero', art: ARTWORKS.monaLisa, title: 'Mona Lisa', artist: 'Leonardo da Vinci' },
  { id: 'lady', art: ARTWORKS.ladyErmine, title: 'Lady with an Ermine', artist: 'Leonardo da Vinci' },
  { id: 'girl', art: ARTWORKS.girlPearl, title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer' },
  { id: 'castiglione', art: ARTWORKS.castiglione, title: 'Portrait of Baldassare Castiglione', artist: 'Raphael' },
  { id: 'durer', art: ARTWORKS.durerSelf, title: 'Self-Portrait', artist: 'Albrecht Dürer' },
  { id: 'lacemaker', art: ARTWORKS.lacemaker, title: 'The Lacemaker', artist: 'Johannes Vermeer' },
];

// ── Famous Renaissance gallery artworks for final section ──
const GALLERY_ARTWORKS = [
  { art: ARTWORKS.monaLisa, title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: '1503' },
  { art: ARTWORKS.lastSupper, title: 'The Last Supper', artist: 'Leonardo da Vinci', year: '1498' },
  { art: ARTWORKS.schoolAthens, title: 'The School of Athens', artist: 'Raphael', year: '1511' },
  { art: ARTWORKS.girlPearl, title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: '1665' },
  { art: ARTWORKS.nightWatch, title: 'The Night Watch', artist: 'Rembrandt', year: '1642' },
  { art: ARTWORKS.ladyErmine, title: 'Lady with an Ermine', artist: 'Leonardo da Vinci', year: '1490' },
  { art: ARTWORKS.lasMeninas, title: 'Las Meninas', artist: 'Diego Velázquez', year: '1656' },
  { art: ARTWORKS.weddingCana, title: 'The Wedding at Cana', artist: 'Paolo Veronese', year: '1563' },
  { art: ARTWORKS.viewDelft, title: 'View of Delft', artist: 'Johannes Vermeer', year: '1661' },
  { art: ARTWORKS.durerSelf, title: 'Self-Portrait', artist: 'Albrecht Dürer', year: '1500' },
];

// ─── Loading Screen ───
function LoadingScreen({ progress, visible }) {
  const loadingStyles = {
    container: {
      position: 'fixed', inset: 0, zIndex: 9999,
      background: CODEX.dark,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'all' : 'none',
    },
    ornament: {
      width: 120, height: 2, background: `linear-gradient(90deg, transparent, ${CODEX.gold}, transparent)`,
      margin: '24px 0',
    },
    title: {
      fontFamily: "'Cinzel', serif", fontSize: 18, letterSpacing: '0.25em',
      color: CODEX.gold, textTransform: 'uppercase', marginBottom: 8,
      textShadow: `0 0 20px ${CODEX.glowGold}44`,
    },
    subtitle: {
      fontFamily: "'EB Garamond', serif", fontSize: 16, color: CODEX.parchment + 'aa',
      fontStyle: 'italic',
    },
    bar: {
      width: 200, height: 2, background: CODEX.ink, borderRadius: 1,
      marginTop: 32, overflow: 'hidden',
    },
    fill: {
      height: '100%', background: `linear-gradient(90deg, ${CODEX.gold}, ${CODEX.glowGold})`,
      transition: 'width 0.4s ease', width: `${progress}%`,
    },
    initial: {
      fontFamily: "'Cinzel', serif", fontSize: 72, color: CODEX.gold,
      textShadow: `0 0 40px ${CODEX.glowGold}66, 0 0 80px ${CODEX.glowGold}22`,
      lineHeight: 1, marginBottom: 8,
      animation: 'pulseGlow 2.5s ease-in-out infinite',
    },
  };

  return (
    <div style={loadingStyles.container}>
      <div style={loadingStyles.initial}>C</div>
      <div style={loadingStyles.ornament}></div>
      <div style={loadingStyles.title}>Codex Luminara</div>
      <div style={loadingStyles.subtitle}>Illuminating the Codex…</div>
      <div style={loadingStyles.bar}><div style={loadingStyles.fill}></div></div>
    </div>
  );
}

// ─── Ken Burns Background ───
function KenBurnsBackground({ src, active, index }) {
  const [loaded, setLoaded] = React.useState(false);
  const directions = ['topLeft', 'topRight', 'bottomLeft', 'center'];
  const dir = directions[index % directions.length];
  const origins = { topLeft: '20% 20%', topRight: '80% 20%', bottomLeft: '20% 80%', center: '50% 50%' };

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      opacity: active && loaded ? 1 : 0,
      transition: 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <img
        src={src}
        alt=""
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: '-10%',
          width: '120%', height: '120%',
          objectFit: 'cover',
          transformOrigin: origins[dir],
          animation: active ? `kenBurns${index % 2 === 0 ? 'In' : 'Out'} 25s ease-in-out infinite alternate` : 'none',
        }}
      />
      {/* Golden overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at center, transparent 30%, ${CODEX.dark}cc 100%)`,
      }}></div>
    </div>
  );
}

// ─── Ornate Frame Border (CSS) ───
function OrnateFrame({ children, style = {} }) {
  return (
    <div style={{
      border: `3px solid ${CODEX.gold}`,
      boxShadow: `inset 0 0 20px ${CODEX.gold}33, 0 0 30px ${CODEX.dark}88, inset 0 0 60px ${CODEX.dark}44`,
      background: CODEX.overlay,
      backdropFilter: 'blur(8px)',
      padding: 32,
      ...style,
    }}>
      {/* Inner gold line */}
      <div style={{
        position: 'absolute', inset: 8,
        border: `1px solid ${CODEX.gold}44`,
        pointerEvents: 'none',
      }}></div>
      {children}
    </div>
  );
}

// ─── Gold Ornament Divider ───
function GoldDivider({ width = 200 }) {
  return (
    <svg width={width} height="20" viewBox={`0 0 ${width} 20`} style={{ display: 'block', margin: '0 auto' }}>
      <line x1="0" y1="10" x2={width} y2="10" stroke={CODEX.gold} strokeWidth="0.5" opacity="0.6" />
      <circle cx={width / 2} cy="10" r="3" fill={CODEX.gold} opacity="0.8" />
      <circle cx={width / 2 - 20} cy="10" r="1.5" fill={CODEX.gold} opacity="0.5" />
      <circle cx={width / 2 + 20} cy="10" r="1.5" fill={CODEX.gold} opacity="0.5" />
      <line x1={width / 2 - 40} y1="10" x2={width / 2 - 25} y2="10" stroke={CODEX.gold} strokeWidth="1" opacity="0.4" />
      <line x1={width / 2 + 25} y1="10" x2={width / 2 + 40} y2="10" stroke={CODEX.gold} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

// ─── Drop Cap ───
function DropCap({ letter }) {
  return (
    <span style={{
      fontFamily: "'Cinzel', serif",
      fontSize: '3.2em', lineHeight: 0.85,
      float: 'left', marginRight: 8, marginTop: 4,
      color: CODEX.gold,
      textShadow: `0 0 15px ${CODEX.glowGold}44`,
    }}>{letter}</span>
  );
}

// ─── Gallery Card ───
function GalleryCard({ art, title, artist, year }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '0 0 280px', height: 380,
        position: 'relative', cursor: 'pointer',
        border: `2px solid ${CODEX.gold}`,
        boxShadow: hover
          ? `0 0 30px ${CODEX.glowGold}44, inset 0 0 20px ${CODEX.gold}22`
          : `0 8px 32px ${CODEX.dark}88`,
        transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
        transform: hover ? 'scale(1.03)' : 'scale(1)',
        overflow: 'hidden',
      }}
    >
      <img src={art} alt={title} style={{
        width: '100%', height: '70%', objectFit: 'cover',
        transition: 'transform 0.8s ease',
        transform: hover ? 'scale(1.08)' : 'scale(1)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: `linear-gradient(transparent, ${CODEX.dark}ee)`,
        padding: '40px 16px 16px',
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 14, color: CODEX.gold,
          marginBottom: 4, textShadow: `0 1px 4px ${CODEX.dark}`,
        }}>{title}</div>
        <div style={{
          fontFamily: "'EB Garamond', serif", fontSize: 13, color: CODEX.parchment + 'cc',
          fontStyle: 'italic',
        }}>{artist}, {year}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  CODEX, ARTWORKS, DESKTOP_SECTIONS, MOBILE_SECTIONS, GALLERY_ARTWORKS,
  LoadingScreen, KenBurnsBackground, OrnateFrame, GoldDivider, DropCap, GalleryCard,
});
