export const Color = {
  RED: 'red',
  GREEN: 'green',
} as const;

export type Color = typeof Color[keyof typeof Color];
