// Color matrices are 4x5 matrices (20 values) that transform RGBA colors
// Each row represents how to calculate the output R, G, B, or A value
// The fifth column is for constant addition

export interface ColorMatrix {
  name: string;
  matrix: number[];
  description: string;
}

export interface ColorDeficiency {
  name: string;
  matrix: number[];
  intensity: number;  // 0-1
  enabled: boolean;
  description: string;
}

export interface ColorVisionState {
  protan: ColorDeficiency;
  deutan: ColorDeficiency;
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

// Protanopia (red-blind) transformation matrix
export const PROTANOPIA_MATRIX: ColorMatrix = {
  name: 'Protanopia',
  matrix: [
    0.1121, 0.8853, -0.0005, 0, 0, // R'
    0.1127, 0.8897, -0.0001, 0, 0, // G'
    0.0045, 0.0000, 1.0019, 0, 0, // B'
    0, 0, 0, 1, 0, // A
  ],
  description: 'Red-blind color vision deficiency',
};

// Deuteranopia (green-blind) transformation matrix
export const DEUTERANOPIA_MATRIX: ColorMatrix = {
  name: 'Deuteranopia',
  matrix: [
    0.2920, 0.7054, -0.0003, 0, 0, // R'
    0.2934, 0.7089, 0.0000, 0, 0, // G'
    -0.0209, 0.0256, 1.0019, 0, 0, // B'
    0, 0, 0, 1, 0, // A
  ],
  description: 'Green-blind color vision deficiency',
};

// Default state for color vision deficiencies
export const DEFAULT_COLOR_VISION_STATE: ColorVisionState = {
  protan: {
    name: 'Protanopia',
    matrix: PROTANOPIA_MATRIX.matrix,
    intensity: 0.5,
    enabled: true,
    description: PROTANOPIA_MATRIX.description,
  },
  deutan: {
    name: 'Deuteranopia',
    matrix: DEUTERANOPIA_MATRIX.matrix,
    intensity: 0.5,
    enabled: true,
    description: DEUTERANOPIA_MATRIX.description,
  },
};

// Helper function to interpolate between identity and deficiency matrix
export function interpolateMatrix(identity: number[], deficiency: number[], intensity: number): number[] {
  return identity.map((val, i) => (1 - intensity) * val + intensity * deficiency[i]);
}

// Helper function to combine two color matrices
export function combineMatrices(matrixA: number[], matrixB: number[]): number[] {
  // For now, simple addition with clamping - we'll refine this based on testing
  return matrixA.map((val, i) => Math.min(Math.max(val + matrixB[i], 0), 1));
}

// Empty default export to satisfy Expo's router requirements
// This file is a utility module, not a route component
export default {}; 