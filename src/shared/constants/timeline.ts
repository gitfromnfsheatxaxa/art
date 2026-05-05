import type { Era } from "@/entities/era/types";
import { timelineEraMusic } from "@/shared/constants/media";

export const TIMELINE_ERAS: Era[] = [
  {
    id: "prehistoric",
    label: "Prehistoric Art",
    period: "Before Christ",
    defaultBg: "/images/backgrounds/1-prehistoric.webp",
    music: timelineEraMusic[0],
    entries: [
      {
        year: "~30,000 BC",
        title: "Chauvet Cave Paintings",
        artist: "Unknown",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rhinoc%C3%A9ros_grotte_Chauvet.jpg/1920px-Rhinoc%C3%A9ros_grotte_Chauvet.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
      {
        year: "~15,000 BC",
        title: "Hall of Bulls, Lascaux",
        artist: "Unknown",
        img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Lascaux_painting.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20071002154413",
      },
      {
        year: "~3,000 BC",
        title: "Narmer Palette",
        artist: "Ancient Egypt",
        img: "https://upload.wikimedia.org/wikipedia/commons/d/da/Narmer_palette_%28obverse%29_%28cropped%29.jpg",
      },
    ],
  },
  {
    id: "classical",
    label: "Classical Antiquity",
    period: "0 - 500 AD",
    defaultBg: "/images/backgrounds/2-lady-with-ermine.webp",
    defaultBgPosition: "50% 15%",
    music: timelineEraMusic[1],
    entries: [
      {
        year: "~79 AD",
        title: "Pompeii Frescoes",
        artist: "Roman",
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Roman_fresco_Villa_dei_Misteri_Pompeii_001.jpg",
      },
      {
        year: "~547 AD",
        title: "Mosaic of Justinian I",
        artist: "Byzantine",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Mosaic_of_Justinianus_I_-_Basilica_San_Vitale_%28Ravenna%29.jpg/960px-Mosaic_of_Justinianus_I_-_Basilica_San_Vitale_%28Ravenna%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20230717203138",
      },
    ],
  },
  {
    id: "early-medieval",
    label: "Early Medieval",
    period: "500 - 1000 AD",
    defaultBg: "/images/backgrounds/3-girl-with-pearl-earring.webp",
    defaultBgPosition: "50% 15%",
    music: timelineEraMusic[2],
    entries: [
      {
        year: "~680 AD",
        title: "Lindisfarne Gospels",
        artist: "Eadfrith of Lindisfarne",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/LindisfarneFol27rIncipitMatt.jpg/500px-LindisfarneFol27rIncipitMatt.jpg",
      },
      {
        year: "~800 AD",
        title: "Book of Kells - Chi Rho",
        artist: "Celtic Monks",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/KellsFol292rIncipJohn.jpg",
      },
      {
        year: "~830 AD",
        title: "Utrecht Psalter",
        artist: "Carolingian",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Utrecht_Psalter.jpg/960px-Utrecht_Psalter.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
    ],
  },
  {
    id: "late-medieval",
    label: "Late Medieval & Early Renaissance",
    period: "1000 - 1500 AD",
    defaultBg: "/images/backgrounds/4-castiglione.webp",
    defaultBgPosition: "50% 15%",
    music: timelineEraMusic[3],
    entries: [
      {
        year: "1305",
        title: "Scrovegni Chapel Frescoes",
        artist: "Giotto di Bondone",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Uffizi_Giotto.jpg/500px-Uffizi_Giotto.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
      {
        year: "1434",
        title: "The Arnolfini Portrait",
        artist: "Jan van Eyck",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/960px-Van_Eyck_-_Arnolfini_Portrait.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240213150901",
      },
      {
        year: "1485",
        title: "The Birth of Venus",
        artist: "Sandro Botticelli",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1920px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20230521013713",
      },
    ],
  },
  {
    id: "renaissance",
    label: "High Renaissance & Baroque",
    period: "1500 - 1700 AD",
    defaultBg: "/images/backgrounds/5-lady-with-ermine.webp",
    defaultBgPosition: "50% 15%",
    music: timelineEraMusic[4],
    entries: [
      {
        year: "1503",
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
      {
        year: "1512",
        title: "Sistine Chapel Ceiling",
        artist: "Michelangelo",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/CAPPELLA_SISTINA_Ceiling.jpg/1920px-CAPPELLA_SISTINA_Ceiling.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
      {
        year: "1642",
        title: "The Night Watch",
        artist: "Rembrandt",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Nightwatch_by_Rembrandt_-_Rijksmuseum.jpg/1280px-The_Nightwatch_by_Rembrandt_-_Rijksmuseum.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20190209175403",
      },
      {
        year: "1665",
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
    ],
  },
  {
    id: "enlightenment",
    label: "Enlightenment & Romanticism",
    period: "1700 - 1900 AD",
    // Changed from 7-the-kiss (was duplicate with modern era) to Starry Night
    defaultBg: "/images/backgrounds/4-starry-night.webp",
    music: timelineEraMusic[5],
    entries: [
      {
        year: "1767",
        title: "The Swing",
        artist: "Jean-Honoré Fragonard",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Fragonard%2C_The_Swing.jpg/960px-Fragonard%2C_The_Swing.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20210407060306",
      },
      {
        year: "1814",
        title: "The Third of May 1808",
        artist: "Francisco Goya",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/El_tres_de_mayo_de_1808_en_Madrid.jpg/1280px-El_tres_de_mayo_de_1808_en_Madrid.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20120623142726",
      },
      {
        year: "1818",
        title: "Wanderer above the Sea of Fog",
        artist: "Caspar David Friedrich",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/800px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
      },
      {
        year: "1819",
        title: "The Raft of the Medusa",
        artist: "Théodore Géricault",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/960px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20110615184255",
      },
      {
        year: "~1820",
        title: "Saturn Devouring His Son",
        artist: "Francisco Goya",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg/500px-Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20210112010118",
      },
      {
        year: "1830",
        title: "Liberty Leading the People",
        artist: "Eugène Delacroix",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20170411185051",
      },
      {
        year: "1872",
        title: "Impression, Sunrise",
        artist: "Claude Monet",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20131023155032",
      },
      {
        year: "1889",
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20260302172601",
      },
    ],
  },
  {
    id: "modern",
    label: "Modern & Contemporary",
    period: "1900 - Present",
    defaultBg: "/images/backgrounds/7-the-kiss.webp",
    defaultBgPosition: "50% 35%",
    music: timelineEraMusic[6],
    entries: [
      {
        year: "1893",
        title: "The Scream",
        artist: "Edvard Munch",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/The_Scream.jpg/960px-The_Scream.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160501101333",
      },
      {
        year: "1907",
        title: "Les Demoiselles d'Avignon",
        artist: "Pablo Picasso",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Les_Demoiselles_d%27Avignon_%287925004644%29.jpg/960px-Les_Demoiselles_d%27Avignon_%287925004644%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20220826193356",
      },
      {
        year: "1908",
        title: "The Kiss",
        artist: "Gustav Klimt",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1280px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20150310064134",
      },
      {
        year: "1937",
        title: "Guernica",
        artist: "Pablo Picasso",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mural_del_%22Guernica%22_de_Picasso.jpg/1920px-Mural_del_%22Guernica%22_de_Picasso.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
      {
        year: "1942",
        title: "Nighthawks",
        artist: "Edward Hopper",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1920px-Nighthawks_by_Edward_Hopper_1942.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20130504182004",
      },
      {
        year: "1962",
        title: "Campbell's Soup Cans",
        artist: "Andy Warhol",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Campbell%27s_Soup_Cans_by_Andy_Warhol.jpg/1920px-Campbell%27s_Soup_Cans_by_Andy_Warhol.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
      {
        year: "1906",
        title: "Water Lilies",
        artist: "Claude Monet",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Claude_Monet_Seerosen_um_1915_Neue_Pinakothek-4.jpg/500px-Claude_Monet_Seerosen_um_1915_Neue_Pinakothek-4.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail",
      },
    ],
  },
];
