"use client";

import { useCallback, useEffect } from "react";
import { themeStore } from "../stores/themeStore";
import { useHydratedStore } from "../stores/useHydratedStore";
import type { TransitionBeforeSwapEvent } from "astro:transitions/client";
import { AppHtmlIds } from "../utils/html-ids";

export default function ThemeEffect() {
  // MARK: Artifacts

  const { value: $darkAtom } = useHydratedStore({
    inputAtom: themeStore.darkAtom,
    defaultValue: themeStore.defaultDark,
  });

  const handleTheme = useCallback(
    (document: Document) => {
      const rootDiv = document.getElementById(AppHtmlIds.root);

      if (!rootDiv) {
        return;
      }

      if ($darkAtom) {
        rootDiv.classList.add("dark");
      } else {
        rootDiv.classList.remove("dark");
      }
    },
    [$darkAtom],
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
