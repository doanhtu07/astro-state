import { createStore } from "zustand";
import { createSelectors } from "./createSelectors";

type ThemeStore = {
  dark: boolean;
  toggleTheme: () => void;
};

const ThemeDefaults = {
  dark: false,
} as const;

const store = createStore<ThemeStore>()((set) => ({
  dark: ThemeDefaults.dark,
  toggleTheme: () => set((state) => ({ dark: !state.dark })),
}));

export const themeStore = {
  defaults: ThemeDefaults,
  useStore: createSelectors(store),
};
