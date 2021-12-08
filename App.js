import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import app from './utils/initfb';
import * as Google from 'expo-google-app-auth';
import SignIn from './comps/SignIn';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';

export default function App() {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        var { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        var { status } = await ImagePicker.requestCameraPermissionAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      Upload(result.uri);
    }
  };
  
  const TakePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      Upload(result.uri);
    }
  };

  const Upload = async(file_uri)=>{
    const file = await fetch(file_uri);
    const blob = await response.blob();
    //file blob
    const storage = getStorage();
    const storageRef = ref(storage, 'mobile.jpg');

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, blob);
    console.log("uploaded");
  }

  const FBCreateUser = async(em, ps)=>{
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, em, ps);
    alert("created!");
  }

  const FBSignIn = async(em, ps)=>{
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, em, ps);
    alert("Signed In!");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <SignIn 
        onSignIn={FBSignIn}
        onCreate={FBCreateUser}
      />
      <Button onPress={PickImage} title="Pick from gallery" />
      <Button onPress={TakePicture} title="Capture" />
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
});
