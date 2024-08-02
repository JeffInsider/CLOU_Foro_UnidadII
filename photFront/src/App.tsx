import { NavigationContainer } from '@react-navigation/native';
import {Text, View} from 'react-native';
import 'react-native-gesture-handler';
import { Navigation } from './presentation/routes/Navigation';

export const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};
