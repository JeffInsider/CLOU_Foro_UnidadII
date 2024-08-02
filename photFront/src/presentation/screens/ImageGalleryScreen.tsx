import { StackScreenProps } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../routes/Navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ImageList } from '../components/ImageList';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import { styles } from '../theme/styles';
import { API_URL } from '@env';

interface Props extends StackScreenProps<RootStackParamList, 'ImageGallery'> { }

export const ImageGallery = ({ navigation }: Props) => {
  const [images, setImages] = useState<{ publicId: string; url: string }[]>([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get(`${API_URL}/imagen`);
        //solo para ver el contenido de la respuesta
        //console.log('contenido del get:', response.data);
        setImages(response.data);
        setLoad(false);
      } catch (error) {
        //console.log('El app entro aqui');
        //console.log(error);
        if (axios.isAxiosError(error)) {
          console.error('Axios error: ', {
            message: error.message,
            code: error.code,
            config: error.config,
            response: error.response
          });
          setError(`Error: ${error.message}`);
        }else {
          console.error('Otro error: ', error);
          setError('Error desconocido');
        }
      } finally {
        setLoad(false);
      }
    }
    getImages();
  }, []);

  //comprobar si hay error
  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.imageContainer}>
      <Text style={styles.text}>Galería de Imágenes</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10,marginTop:10 }} />
      <ImageList images={images} />
    </View>
  );
};
