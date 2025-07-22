"use client";

import { themeStore } from "../stores/themeStore";
import clsx from "clsx";
import { useCallback } from "react";
import { useHydratedStore } from "../stores/useHydratedStore";

export const ThemeButton = () => {
  // MARK: Artifacts

  const { ssrValue: $darkAtom } = useHydratedStore({
    inputAtom: themeStore.darkAtom,
    defaultValue: themeStore.defaultDark,
  });

  const handleToggleTheme = useCallback(() => {
    themeStore.toggleTheme();
  }, []);

  // MARK: Renderers

  return (
    <button
      className={clsx(
        "cursor-pointer rounded px-2 py-1",
        "bg-slate-300 transition dark:bg-slate-500",
      )}
      onClick={handleToggleTheme}
    >
      {$darkAtom ? "Light" : "Dark"}
    </button>
  );
};
