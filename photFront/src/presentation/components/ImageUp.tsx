import React from 'react';
import { View, Button, Image, StyleSheet, Alert, Pressable, Text } from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { styles } from '../theme/styles';

export const ImageUp = () => {
  const [photo, setPhoto] = React.useState<string | null>(null);

  const checkPermissions = async () => {
    try {
      const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);
      if (cameraPermission !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.ANDROID.CAMERA);
        if (result !== RESULTS.GRANTED) {
          Alert.alert('Permiso de cámara', 'Se requiere permiso de cámara para tomar fotos.');
          return false;
        }
      }

      const storagePermission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (storagePermission !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (result !== RESULTS.GRANTED) {
          Alert.alert('Permiso de almacenamiento', 'Se requiere permiso de almacenamiento para guardar fotos.');
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      return false;
    }
  };

  const handleTakePhoto = async () => {
    const hasPermissions = await checkPermissions();
    if (!hasPermissions) return;

    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      },
      (response: ImagePickerResponse) => {
        if (response.errorCode) {
          Alert.alert('Error de ImagePicker', response.errorMessage || 'Ocurrió un error');
        } else if (response.assets) {
          setPhoto(response.assets[0].uri || null);
        }
      }
    );
  };

  const handleSelectPhoto = async () => {
    const hasPermissions = await checkPermissions();
    if (!hasPermissions) return;

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response: ImagePickerResponse) => {
        if (response.errorCode) {
          Alert.alert('Error de ImagePicker', response.errorMessage || 'Ocurrió un error');
        } else if (response.assets) {
          setPhoto(response.assets[0].uri || null);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.textButton}>Tomar Foto</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSelectPhoto}>
        <Text style={styles.textButton}>Buscar en galeria</Text>
      </Pressable>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
    </View>
  );
};

