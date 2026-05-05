import { create } from "zustand";

type NavigationState = {
  homeSection: number;
  timelineEra: number;
  setHomeSection: (index: number) => void;
  setTimelineEra: (index: number) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  homeSection: 0,
  timelineEra: 0,
  setHomeSection: (homeSection) => set({ homeSection }),
  setTimelineEra: (timelineEra) => set({ timelineEra }),
}));
