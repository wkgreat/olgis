import {RGBColor} from "react-color";

type RGBArrayColor = number[]

/**
 * rgb array to rgb object
 * @param rgb rgb array，like [red, green, blue]
 * @returns rgb object
 * */
export const rgbArrayToColorObject = (rgb: RGBArrayColor): RGBColor => {
    let _rgb  = rgb as number[];
    return {r: _rgb[0], g: _rgb[1], b: _rgb[2], a: _rgb[3]};
};

/**
 * rgb object to rgb array
 * @param rgb rgb object
 * @returns rgb array
 * */
export const rgbObjectToArray = (rgb: RGBColor): number[] => Object.values(rgb) as number[];

/**
 * rgb array to string
 * @param rgb rgb array
 * @returns rgb string
 * */
export const rgbArrayColorToString = (rgb: RGBArrayColor) => `r:${rgb[0]},g:${rgb[1]},b:${rgb[2]},a:${rgb[3]}`;
