import { View } from 'react-native';
import ImagePickerComponent from './components/ImagePicker';
import ImageTransformer from './components/ImageTransformer';
import { useState } from 'react';

interface SelectedImage {
  uri: string;
  width: number;
  height: number;
}

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <ImagePickerComponent onImageSelected={setSelectedImage} />
      {selectedImage && <ImageTransformer image={selectedImage} />}
    </View>
  );
}
