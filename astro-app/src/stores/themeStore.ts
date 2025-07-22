import { atom } from "nanostores";

const defaultDark = false;
const darkAtom = atom<boolean>(defaultDark);

const toggleTheme = () => {
  darkAtom.set(!darkAtom.get());
};

export const themeStore = {
  defaultDark,
  darkAtom,
  toggleTheme,
};
