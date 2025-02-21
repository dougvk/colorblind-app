import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import SkiaImageFilter from './SkiaImageFilter';
import { 
  IDENTITY_MATRIX, 
  DEFAULT_COLOR_VISION_STATE,
  type ColorVisionState,
  type ColorDeficiency,
  type ColorMatrix,
  interpolateMatrix,
  combineMatrices
} from '../lib/colorMatrices';

interface ImageTransformerProps {
  image: {
    uri: string;
    width: number;
    height: number;
  };
}

export default function ImageTransformer({ image }: ImageTransformerProps) {
  const [colorVision, setColorVision] = useState<ColorVisionState>(DEFAULT_COLOR_VISION_STATE);

  const computeMatrix = (): ColorMatrix => {
    let matrix = IDENTITY_MATRIX.matrix;
    
    if (colorVision.protan.enabled) {
      const protanMatrix = interpolateMatrix(
        IDENTITY_MATRIX.matrix,
        colorVision.protan.matrix,
        colorVision.protan.intensity
      );
      matrix = combineMatrices(matrix, protanMatrix);
    }
    
    if (colorVision.deutan.enabled) {
      const deutanMatrix = interpolateMatrix(
        IDENTITY_MATRIX.matrix,
        colorVision.deutan.matrix,
        colorVision.deutan.intensity
      );
      matrix = combineMatrices(matrix, deutanMatrix);
    }
    
    return {
      name: getDisplayName(),
      matrix,
      description: 'Combined red-green color vision deficiency'
    };
  };

  const updateDeficiency = (type: 'protan' | 'deutan', updates: Partial<ColorDeficiency>) => {
    setColorVision(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...updates
      }
    }));
  };

  const getDisplayName = () => {
    const parts = [];
    if (colorVision.protan.enabled) {
      parts.push(`P:${Math.round(colorVision.protan.intensity * 100)}%`);
    }
    if (colorVision.deutan.enabled) {
      parts.push(`D:${Math.round(colorVision.deutan.intensity * 100)}%`);
    }
    return parts.length ? `Red-Green (${parts.join(', ')})` : 'Original';
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <SkiaImageFilter
            imageUri={image.uri}
            matrix={IDENTITY_MATRIX.matrix}
            width={150}
            height={150}
          />
          <Text style={styles.label}>Original</Text>
        </View>
        
        <View style={styles.imageContainer}>
          <SkiaImageFilter
            imageUri={image.uri}
            matrix={computeMatrix().matrix}
            width={150}
            height={150}
          />
          <Text style={styles.label}>{getDisplayName()}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.deficiencyControl}>
          <View style={styles.controlHeader}>
            <Switch
              value={colorVision.protan.enabled}
              onValueChange={(enabled) => updateDeficiency('protan', { enabled })}
            />
            <Text style={styles.controlLabel}>
              Protanopia ({Math.round(colorVision.protan.intensity * 100)}%)
            </Text>
          </View>
          {colorVision.protan.enabled && (
            <Slider
              style={styles.slider}
              value={colorVision.protan.intensity}
              onValueChange={(intensity: number) => updateDeficiency('protan', { intensity })}
              minimumValue={0}
              maximumValue={1}
              step={0.01}
            />
          )}
        </View>

        <View style={styles.deficiencyControl}>
          <View style={styles.controlHeader}>
            <Switch
              value={colorVision.deutan.enabled}
              onValueChange={(enabled) => updateDeficiency('deutan', { enabled })}
            />
            <Text style={styles.controlLabel}>
              Deuteranopia ({Math.round(colorVision.deutan.intensity * 100)}%)
            </Text>
          </View>
          {colorVision.deutan.enabled && (
            <Slider
              style={styles.slider}
              value={colorVision.deutan.intensity}
              onValueChange={(intensity: number) => updateDeficiency('deutan', { intensity })}
              minimumValue={0}
              maximumValue={1}
              step={0.01}
            />
          )}
        </View>
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
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  deficiencyControl: {
    marginBottom: 15,
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  controlLabel: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  slider: {
    width: '100%',
    height: 40,
  },
}); 