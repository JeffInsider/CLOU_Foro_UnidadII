import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert, Pressable, Text, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { styles } from '../theme/styles';
import { API_URL } from '@env';
import axios from 'axios';

//definir la url de la imagen

export const ImageUp = () => {
  const [photo, setPhoto] = React.useState<string | null>(null);
  //evita que se precione el boton de enviar varias veces
  const [isPosting, setIsPosting] = useState(false);

  //funcion para solicitar permisos
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

      //permisos de almacenamiento
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

  //funcion para tomar una foto
  const handleTakePhoto = async () => {
    const hasPermissions = await checkPermissions();
    if (!hasPermissions) return;

    //funcion para tomar la foto
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

  //funcion para seleccionar una foto de la galeria
  const handleSelectPhoto = async () => {
    const hasPermissions = await checkPermissions();
    if (!hasPermissions) return;

    //funcion para seleccionar la foto
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

  //funcion para enviar la imagen
  const handleSubmit = async () => {
    //validar que haya una foto
    if (!photo) {
      Alert.alert('Imagen requerida', 'Por favor toma o selecciona una foto.');
      return;
    }
    setIsPosting(true);

    try {
      //crear el objeto FormData
      const formData = new FormData();
      formData.append('File', {
        uri: photo,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      //enviar la foto a la API
      const response = await axios.post(`${API_URL}/imagen`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Éxito', 'Foto enviada con éxito.');
      setPhoto(null); // Limpiar la foto después del envío
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error: ', {
          message: error.message,
          code: error.code,
          config: error.config,
          response: error.response
        });
        
      } else {
        console.error('Otro error: ', error);
      }
    } finally {
      setIsPosting(false); // Restablecer el estado después de que la solicitud se complete
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.textButton}>Tomar Foto</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSelectPhoto}>
        <Text style={styles.textButton}>Buscar en galeria</Text>
      </Pressable>
      {photo && (
        <View>
          <Image source={{ uri: photo }} style={styles.image} />
          <Pressable
            style={[styles.button, isPosting ? styles.buttonDisabled : {}]}
            onPress={handleSubmit}
            disabled={isPosting}
          >
            {isPosting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.textButton}>Enviar</Text>
            )}
          </Pressable>
          <Pressable
            style={styles.button3}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.textButton}>Quitar foto</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

