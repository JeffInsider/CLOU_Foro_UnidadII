import { StackScreenProps } from '@react-navigation/stack';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../routes/Navigation';
import { ImageUp } from '../components/ImageUp';
import { styles } from '../theme/styles';

interface Props extends StackScreenProps<RootStackParamList, 'Home'> {}

export const HomeScreen = ({ navigation }: Props) => {
  const handle = () => {
    navigation.navigate('ImageGallery');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Subir una imagen</Text>
      <View style={styles.imageUpContainer}>
        <Pressable style={styles.button4} onPress={handle}>
          <Text style={styles.textButton}>Galeria</Text>
        </Pressable>
        <ImageUp />
      </View>
    </View>
  );
};

