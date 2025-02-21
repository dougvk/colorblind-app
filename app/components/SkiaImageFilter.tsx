import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas, Image, useImage, Paint, ColorMatrix } from '@shopify/react-native-skia';
import { ColorMatrix as ColorMatrixType } from "../lib/colorMatrices";

interface SkiaImageFilterProps {
  imageUri: string;
  matrix: ColorMatrixType;
  width: number;
  height: number;
}

export default function SkiaImageFilter({ imageUri, matrix, width, height }: SkiaImageFilterProps) {
  const image = useImage(imageUri);

  if (!image) {
    return <View style={[styles.container, { width, height }]} />;
  }

  // Calculate scaling to fit image within bounds while maintaining aspect ratio
  const scale = Math.min(width / image.width(), height / image.height());
  const scaledWidth = image.width() * scale;
  const scaledHeight = image.height() * scale;
  
  // Center the image
  const x = (width - scaledWidth) / 2;
  const y = (height - scaledHeight) / 2;

  return (
    <Canvas style={[styles.container, { width, height }]}>
      <Image
        image={image}
        x={x}
        y={y}
        width={scaledWidth}
        height={scaledHeight}
        fit="contain"
      >
        <Paint>
          <ColorMatrix matrix={matrix.matrix} />
        </Paint>
      </Image>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
}); 