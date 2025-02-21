import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text, Pressable, useWindowDimensions, ScrollView } from 'react-native';
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
  const { width: screenWidth } = useWindowDimensions();
  const [colorVision, setColorVision] = useState<ColorVisionState>(DEFAULT_COLOR_VISION_STATE);
  const [isShowingOriginal, setIsShowingOriginal] = useState(false);

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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Pressable 
        style={styles.imageContainer}
        onPressIn={() => setIsShowingOriginal(true)}
        onPressOut={() => setIsShowingOriginal(false)}
      >
        <SkiaImageFilter
          imageUri={image.uri}
          matrix={isShowingOriginal ? IDENTITY_MATRIX.matrix : computeMatrix().matrix}
          width={screenWidth - 20}
          height={screenWidth - 20}
        />
        <Text style={styles.label}>
          {isShowingOriginal ? 'Original (Hold to View)' : getDisplayName()}
        </Text>
      </Pressable>

      <View style={styles.controls}>
        <Text style={styles.controlsTitle}>Color Vision Settings</Text>
        
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
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
    padding: 8,
    fontSize: 14,
  },
  controls: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
  },
  controlsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  deficiencyControl: {
    marginBottom: 20,
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