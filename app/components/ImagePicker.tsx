import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

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
  const [showCamera, setShowCamera] = useState(false);
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

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

  const openCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        alert('Permission to access camera is required!');
        return;
      }
    }
    setShowCamera(true);
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        if (photo) {
          const image = {
            uri: photo.uri,
            width: photo.width,
            height: photo.height,
          };
          setSelectedImage(image);
          onImageSelected(image);
          setShowCamera(false);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (showCamera) {
    return (
      <View style={styles.container}>
        <CameraView
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          facing="back"
        >
          <View style={styles.cameraControls}>
            <Pressable style={styles.button} onPress={() => setShowCamera(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </Pressable>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose from Library</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </Pressable>
      </View>
      
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
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
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
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 4,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
}); 