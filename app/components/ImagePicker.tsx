import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerResult {
  uri: string;
  width: number;
  height: number;
}

interface ImagePickerProps {
  onImageSelected: (image: ImagePickerResult | null) => void;
}

export default function ImagePickerComponent({ onImageSelected }: ImagePickerProps) {
  const [selectedImage, setSelectedImage] = useState<ImagePickerResult | null>(null);

  const pickImage = async () => {
    // Request permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Pick the image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const image = {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
      };
      setSelectedImage(image);
      onImageSelected(image);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </Pressable>
      
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
}); 