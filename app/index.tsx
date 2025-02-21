import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import ImagePickerComponent from './components/ImagePicker';

interface SelectedImage {
  uri: string;
  width: number;
  height: number;
}

export default function Page() {
  const router = useRouter();

  const handleImageSelected = (image: SelectedImage | null) => {
    if (image) {
      router.push({
        pathname: '/screens/editor',
        params: { image: JSON.stringify(image) }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Select Image',
          headerLargeTitle: true,
        }} 
      />
      <ImagePickerComponent onImageSelected={handleImageSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
