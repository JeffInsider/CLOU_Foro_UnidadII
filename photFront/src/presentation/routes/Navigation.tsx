import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ImageGallery } from '../screens/ImageGalleryScreen';

export type RootStackParamList = {
    Home: undefined;
    ImageGallery: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      //se oculta el header en el stack
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImageGallery" component={ImageGallery} />
    </Stack.Navigator>
  );
}
