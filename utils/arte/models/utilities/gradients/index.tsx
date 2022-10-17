import { forOwn, sample } from "@ededejr/utils";
import * as GradientDefinitions from './gradients';
import { createGradient } from "./utils";

const _Gradients = (() => {
  // @ts-ignore-next-line -> Too lazy to fix type error with {}
  const gradients: {
    -readonly [Property in keyof typeof GradientDefinitions]: ReturnType<typeof createGradient>
  } = {};

  // Convert each gradient array to gradient JSX Element.
  forOwn(GradientDefinitions, (stops, key, obj) => {
    if (key && obj) {
      const _key = key as keyof typeof GradientDefinitions;
      gradients[_key] = createGradient(key, ...stops);
    }
  });
  
  return gradients;
})();

export type SvgGradients = typeof _Gradients;
export type GradientKey = keyof SvgGradients;

export const Gradients = _Gradients;
export const GradientKeys = Object.keys(Gradients) as unknown as GradientKey[];
export const GradientNodes = Object.values(Gradients);

export const getRandomGradientUrl = () => `url(#${sample(GradientKeys)})`;
export const getGradient = (key: GradientKey) => _Gradients[key];