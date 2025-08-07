import type { MaskitoOptions } from "@maskito/core";

export default {
  mask: [
    "+",
    "3",
    "8",
    " ",
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ],
} satisfies MaskitoOptions;
