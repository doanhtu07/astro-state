import { useStore } from "@nanostores/react";
import type { PreinitializedWritableAtom } from "nanostores";
import { useEffect, useMemo, useState } from "react";

type Props<T> = {
  inputAtom: PreinitializedWritableAtom<T> & object;
  defaultValue: T;
};

export const useHydratedStore = <T>(props: Props<T>) => {
  // MARK: Artifacts

  const { inputAtom, defaultValue } = props;

  const atomValue = useStore(inputAtom);
  const [hydrated, setHydrated] = useState(false);

  const result = useMemo(() => {
    return {
      hydrated,
      value: atomValue,
      ssrValue: hydrated ? atomValue : defaultValue,
    };
  }, [hydrated, atomValue, defaultValue]);

  // MARK: Effects

  useEffect(() => {
    setHydrated(true);
  }, []);

  // MARK: Renderers

  return result;
};
