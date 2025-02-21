import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import ImageTransformer from '../components/ImageTransformer';

interface SelectedImage {
  uri: string;
  width: number;
  height: number;
}

export default function EditorScreen() {
  const { image } = useLocalSearchParams();
  const parsedImage: SelectedImage = JSON.parse(image as string);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Color Vision Simulator',
          headerLargeTitle: false,
          contentStyle: { backgroundColor: '#fff' },
        }} 
      />
      <ImageTransformer image={parsedImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
}); 