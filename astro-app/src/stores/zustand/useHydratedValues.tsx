import { useEffect, useMemo, useState } from "react";

type ValueDefaultPair<T> = {
  value: T;
  defaultValue: T;
};

/*
  IMPORTANT NOTE

  === === ===

  Let's say input is
    {
      theme: { value: boolean, defaultValue: boolean },
      count: { value: number, defaultValue: number }
    }

  Here TypeObj will be solved by TypeScript and inferred as
    {
      theme: boolean,
      count: number
    }
  
  How does TypeScript solve this?
  - It's a constraint solver
  - Given TypeObj = Record<string, any> (`any` we don't know yet)
  - Key of TypeObj is a string and also a key of Props<TypeObj>
  - TypeObj[Key] = T in ValueDefaultPair<T>
  
  Thus for any input like:
    {
      theme: { value: boolean, defaultValue: boolean },
    }

  TypeScript can infer TypeObj[Key] = boolean

  We then use TypeObj[Key] as the type of ssrValues[key] in the result object
*/

type Props<TypeObj extends Record<string, any>> = {
  [Key in keyof TypeObj]: ValueDefaultPair<TypeObj[Key]>;
};

export const useHydratedValues = <TypeObj extends Record<string, any>>(
  props: Props<TypeObj>,
) => {
  // MARK: Artifacts

  const [hydrated, setHydrated] = useState(false);

  const result = useMemo(() => {
    const ssrValues = {} as { [Key in keyof TypeObj]: TypeObj[Key] };

    for (const key in props) {
      ssrValues[key] = hydrated ? props[key].value : props[key].defaultValue;
    }

    return {
      hydrated,
      ssrValues,
    };
  }, [hydrated, props]);

  // MARK: Effects

  useEffect(() => {
    setHydrated(true);
  }, []);

  // MARK: Renderers

  return result;
};
