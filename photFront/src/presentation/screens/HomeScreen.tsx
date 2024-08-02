import { StackScreenProps } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../routes/Navigation';
import { ImageUp } from '../components/ImageUp';
import { styles } from '../theme/styles';

interface Props extends StackScreenProps<RootStackParamList, 'Home'> {}

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topButtonContainer}>
        <Button title="Ver Galería" onPress={() => navigation.navigate('ImageGallery')} />
      </View>
      <View style={styles.imageUpContainer}>
        <ImageUp />
      </View>
    </View>
  );
};

