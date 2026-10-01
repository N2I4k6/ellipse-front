import { useEffect, type EffectCallback } from "react";

export const useMountEffect = (effect: EffectCallback): void => {
  useEffect(effect, []);
};
