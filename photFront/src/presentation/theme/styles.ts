import { Button, Dimensions, StyleSheet } from "react-native";

//AQUI van los estilos de la aplicacion
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20, // Agregar espacio horizontal
  },
  topButtonContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
  },
  imageUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Ajustar según sea necesario para espaciar el botón superior
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  image2: {
    width: Dimensions.get('window').width / 2 - 15,
    height: Dimensions.get('window').width / 2 - 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
    textAlign: 'center',
  },

  
});