import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, ActivityIndicator } from 'react-native';
import { manipulateAsync, SaveFormat, FlipType } from 'expo-image-manipulator';
import { Image } from 'expo-image';

interface ImageTransformerProps {
  image: {
    uri: string;
    width: number;
    height: number;
  };
}

export default function ImageTransformer({ image }: ImageTransformerProps) {
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = async () => {
    try {
      setIsProcessing(true);
      const result = await manipulateAsync(
        image.uri,
        [{ flip: isFlipped ? FlipType.Vertical : FlipType.Horizontal }],
        { format: SaveFormat.PNG }
      );
      setTransformedImage(result.uri);
      setIsFlipped(!isFlipped);
    } catch (error) {
      console.error('Failed to transform image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image.uri }}
            style={styles.image}
            contentFit="contain"
          />
          <Text style={styles.label}>Original</Text>
        </View>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: transformedImage || image.uri }}
            style={styles.image}
            contentFit="contain"
          />
          <Text style={styles.label}>Transformed</Text>
          {isProcessing && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#2196F3" />
            </View>
          )}
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.button}
          onPress={handleFlip}
        >
          <Text style={styles.buttonText}>Flip Image</Text>
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
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    flex: 1,
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
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
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