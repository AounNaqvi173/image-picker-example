import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Alert, Button } from 'react-native';

import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';


export default function App() {


  const [image, setImage] = useState('')




  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access media library is required.");
        console.log("Permission to access media library is required.");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [7, 7],
        quality: 1,
        allowsEditing: true
      });

      if (!result.canceled) {

        console.log(result)
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {image != '' &&
        (<Image source={{ uri: image }} style={styles.image} />)
      }

      <Button title='Pick Image' onPress={() => pickImage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain'
  }
});
