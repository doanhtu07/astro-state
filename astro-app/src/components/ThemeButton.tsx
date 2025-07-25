"use client";

import clsx from "clsx";
import { useCallback } from "react";
import { themeStore } from "../stores/zustand/themeStore";
import { useHydratedValues } from "../stores/zustand/useHydratedValues";

export const ThemeButton = () => {
  // MARK: Artifacts

  // const { ssrValue: $darkAtom } = useHydratedStore({
  //   inputAtom: themeStore.darkAtom,
  //   defaultValue: themeStore.defaultDark,
  // });

  const dark = themeStore.useStore.use.dark();
  const toggleTheme = themeStore.useStore.use.toggleTheme();

  const { ssrValues } = useHydratedValues({
    dark: {
      value: dark,
      defaultValue: themeStore.defaults.dark,
    },
  });

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // MARK: Renderers

  return (
    <button
      className={clsx(
        "cursor-pointer rounded px-2 py-1",
        "bg-slate-300 transition dark:bg-slate-500",
      )}
      onClick={handleToggleTheme}
    >
      {ssrValues.dark ? "Light" : "Dark"}
    </button>
  );
};
