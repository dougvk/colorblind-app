import { View } from 'react-native';
import ImagePickerComponent from './components/ImagePicker';

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <ImagePickerComponent />
    </View>
  );
}
