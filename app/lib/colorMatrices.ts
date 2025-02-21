// Color matrices are 4x5 matrices (20 values) that transform RGBA colors
// Each row represents how to calculate the output R, G, B, or A value
// The fifth column is for constant addition

export interface ColorMatrix {
  name: string;
  matrix: number[];
  description: string;
}

// Standard matrices
export const IDENTITY_MATRIX: ColorMatrix = {
  name: 'Original',
  matrix: [
    1, 0, 0, 0, 0, // R
    0, 1, 0, 0, 0, // G
    0, 0, 1, 0, 0, // B
    0, 0, 0, 1, 0, // A
  ],
  description: 'No transformation applied',
};

// Grayscale using luminance weights (human perception of color)
export const GRAYSCALE_MATRIX: ColorMatrix = {
  name: 'Grayscale',
  matrix: [
    0.2126, 0.7152, 0.0722, 0, 0, // R = 0.2126R + 0.7152G + 0.0722B
    0.2126, 0.7152, 0.0722, 0, 0, // G = 0.2126R + 0.7152G + 0.0722B
    0.2126, 0.7152, 0.0722, 0, 0, // B = 0.2126R + 0.7152G + 0.0722B
    0, 0, 0, 1, 0, // A = A
  ],
  description: 'Convert to grayscale using luminance weights',
};

// Empty default export to satisfy Expo's router requirements
// This file is a utility module, not a route component
export default {}; 