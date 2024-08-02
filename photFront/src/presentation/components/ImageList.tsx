import {Image, Text, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from '../theme/styles';

interface Props {
  images: {publicId: string; url: string}[];
}


export const ImageList = ({images}: Props) => {
  return (
      <FlatList 
      data={images}
      keyExtractor={item => item.publicId}
      renderItem={({item}) => (
        <View style={styles.imageContainer}>
          <Image source={{uri: item.url}} style={styles.image2} />
        </View>
      )}
      numColumns={2}
      //se agrega el key para que no de error al renderizar
      key={(2).toString()}
      />
  );
};
