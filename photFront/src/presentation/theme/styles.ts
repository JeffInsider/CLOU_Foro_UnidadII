import { Button, Dimensions, StyleSheet } from "react-native";

//AQUI van los estilos de la aplicacion
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20, // Agregar espacio horizontal
    marginTop: 20, // Agregar espacio superior
  },
  topButtonContainer: {
    top: 40,
    width: '100%',
    alignItems: 'center',
  },
  imageUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Ajustar según sea necesario para espaciar el botón superior
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
    width: 200,
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 20,
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
  buttonDisabled: {
    backgroundColor: 'grey',
    },
    button3: {
    backgroundColor: '#a6483e',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button4: {
    backgroundColor: '#db9e34',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: 200,
  },
  
});