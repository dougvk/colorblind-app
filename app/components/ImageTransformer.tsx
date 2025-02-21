import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import SkiaImageFilter from './SkiaImageFilter';
import { IDENTITY_MATRIX, GRAYSCALE_MATRIX, type ColorMatrix } from '../lib/colorMatrices';

interface ImageTransformerProps {
  image: {
    uri: string;
    width: number;
    height: number;
  };
}

export default function ImageTransformer({ image }: ImageTransformerProps) {
  const [currentMatrix, setCurrentMatrix] = useState<ColorMatrix>(IDENTITY_MATRIX);

  const toggleFilter = () => {
    setCurrentMatrix((current: ColorMatrix) => 
      current.name === 'Original' ? GRAYSCALE_MATRIX : IDENTITY_MATRIX
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <SkiaImageFilter
            imageUri={image.uri}
            matrix={IDENTITY_MATRIX}
            width={150}
            height={150}
          />
          <Text style={styles.label}>Original</Text>
        </View>
        
        <View style={styles.imageContainer}>
          <SkiaImageFilter
            imageUri={image.uri}
            matrix={currentMatrix}
            width={150}
            height={150}
          />
          <Text style={styles.label}>{currentMatrix.name}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.button}
          onPress={toggleFilter}
        >
          <Text style={styles.buttonText}>
            {currentMatrix.name === 'Original' ? 'Apply Grayscale' : 'Reset'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 5,
    aspectRatio: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 