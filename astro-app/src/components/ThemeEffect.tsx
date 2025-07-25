"use client";

import { useCallback, useEffect } from "react";
import type { TransitionBeforeSwapEvent } from "astro:transitions/client";
import { AppHtmlIds } from "../utils/html-ids";
import { themeStore } from "../stores/zustand/themeStore";

export default function ThemeEffect() {
  // MARK: Artifacts

  // const { value: $darkAtom } = useHydratedStore({
  //   inputAtom: themeStore.darkAtom,
  //   defaultValue: themeStore.defaultDark,
  // });

  const dark = themeStore.useStore.use.dark();

  const handleTheme = useCallback(
    (document: Document) => {
      const rootDiv = document.getElementById(AppHtmlIds.root);

      if (!rootDiv) {
        return;
      }

      if (dark) {
        rootDiv.classList.add("dark");
      } else {
        rootDiv.classList.remove("dark");
      }
    },
    [dark],
  );

  // MARK: Effects

  useEffect(() => {
    const setTheme = (event: TransitionBeforeSwapEvent) => {
      handleTheme(event.newDocument);
    };

    document.addEventListener("astro:before-swap", setTheme);

    return () => {
      document.removeEventListener("astro:before-swap", setTheme);
    };
  }, [handleTheme]);

  useEffect(() => {
    handleTheme(document);
  }, [handleTheme]);

  // MARK: Renderers

  return null;
}
