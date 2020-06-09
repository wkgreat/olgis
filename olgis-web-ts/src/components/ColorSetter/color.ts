import {RGBColor} from "react-color";

type RGBArrayColor = number[]

export const rgbArrayToColorObject = (rgb: RGBArrayColor): RGBColor => {
    let _rgb  = rgb as number[];
    return {r: _rgb[0], g: _rgb[1], b: _rgb[2], a: _rgb[3]};
};

export const rgbObjectToArray = (rgb: RGBColor): number[] => Object.values(rgb) as number[];

export const rgbArrayColorToString = (rgb: RGBArrayColor) => `r:${rgb[0]},g:${rgb[1]},b:${rgb[2]},a:${rgb[3]}`;