// ── Raw Met Museum Open Access API response ───────────────────────────────
export type MetApiObject = {
  objectID: number;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  department: string;
  objectName: string;
  title: string;
  culture: string;
  period: string;
  artistDisplayName: string;
  artistNationality: string;
  objectDate: string;
  objectBeginDate: number;
  objectEndDate: number;
  medium: string;
  dimensions: string;
  creditLine: string;
  classification: string;
  GalleryNumber: string;
  repository: string;
  objectURL: string;
};

export type MetSearchResult = {
  total: number;
  objectIDs: number[] | null;
};

// ── Raw Rijksmuseum API response ──────────────────────────────────────────
export type RijksmuseumArtObject = {
  links: {
    self: string;
    web: string;
  };
  id: string;
  objectNumber: string;
  title: string;
  hasImage: boolean;
  principalOrFirstMaker: string;
  longTitle: string;
  showImage: boolean;
  permitDownload: boolean;
  webImage?: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  headerImage?: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  productionPlaces: string[];
};

export type RijksmuseumSearchResult = {
  elapsedMilliseconds: number;
  count: number;
  artObjects: RijksmuseumArtObject[];
};

export type RijksmuseumDetailResult = {
  elapsedMilliseconds: number;
  artObject: RijksmuseumArtObject & {
    scLabelLine?: string;
    label?: {
      title?: string;
      makerLine?: string;
      description?: string;
      notes?: string;
      date?: string;
    };
    objectTypes: string[];
    objectCollection: string[];
    makers: Array<{
      name: string;
      unFixedName: string;
      placeOfBirth: string;
      dateOfBirth: string;
      dateOfDeath: string;
      placeOfDeath: string;
      occupation: string[];
      roles: string[];
      nationality: string;
    }>;
    historicalPersons: string[];
    inscriptions: string[];
    documentation: string[];
    catRefRPK: string[];
    principalMakers: Array<{
      name: string;
      unFixedName: string;
      placeOfBirth: string;
      dateOfBirth: string;
      dateOfDeath: string;
      placeOfDeath: string;
      occupation: string[];
      roles: string[];
      nationality: string;
    }>;
    plaqueDescriptionDutch?: string;
    plaqueDescriptionEnglish?: string;
    principalMaker: string;
    artistRole?: string;
    associations: string[];
    acquisition: {
      method: string;
      date: string;
      creditLine: string;
    };
    exhibitions: string[];
    materials: string[];
    techniques: string[];
    productionPlaces: string[];
    dating: {
      presentingDate: string;
      sortingDate: number;
      period: number;
      yearEarly: number;
      yearLate: number;
    };
    classification: {
      iconClassIdentifier: string[];
      iconClassDescription: string[];
      motifs: string[];
      events: string[];
      periods: string[];
      places: string[];
      people: string[];
      objectNames: string[];
    };
    hasImage: boolean;
    historicalContext: string[];
    otherContent: string[];
    colors: Array<{
      percentage: number;
      hex: string;
    }>;
    colorsWithNormalization: Array<{
      originalHex: string;
      normalizedHex: string;
    }>;
    normalizedColors: Array<{
      percentage: number;
      hex: string;
    }>;
    normalized32Colors: Array<{
      percentage: number;
      hex: string;
    }>;
    titles: string[];
    description: string;
    labelText?: string;
    objectType: string;
    location: string;
    dimensions: Array<{
      unit: string;
      type: string;
      part: string;
      value: string;
    }>;
    materialsThesaurus: string[];
    techniquesThesaurus: string[];
    productionPlacesThesaurus: string[];
    titlesThesaurus: string[];
    notesThesaurus: string[];
    objectCollectionThesaurus: string[];
    plaqueDescription: string;
    artist: string;
    url: string;
  };
};

// ── App-level unified gallery slide item ─────────────────────────────────
// Works for both static (GALLERY_ARTWORKS) and Met API artworks.
export type GalleryItem = {
  /** Unique slug — either "the-starry-night" or "met-436535" */
  slug: string;
  /** Internal href — "/artwork/the-starry-night" or "/artwork/met-436535" */
  detailHref: string;
  /** Whether this came from the Met API */
  isMet: boolean;

  title: string;
  artist: string;
  year: string;
  img: string;

  description: string;
  period?: string;
  era?: string;
  medium?: string;
  dimensions?: string;
  location?: string;
  creditLine?: string;
  metUrl?: string;
};
