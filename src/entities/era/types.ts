export type TimelineEntry = {
  year: string;
  title: string;
  artist: string;
  img: string;
};

export type Era = {
  id: string;
  label: string;
  period: string;
  defaultBg: string;
  defaultBgPosition?: string;
  music: string;
  entries: TimelineEntry[];
};
