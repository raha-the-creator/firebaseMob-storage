import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithCredential, onAuthStateChanged, signOut } from "firebase/auth";


import { useEffect } from 'react';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbL1UTVRXW-u9mFazIwtHP1iedNmNOf8M",
  authDomain: "mdia-week9.firebaseapp.com",
  projectId: "mdia-week9",
  storageBucket: "mdia-week9.appspot.com",
  messagingSenderId: "628865134395",
  appId: "1:628865134395:web:cda264beddd811e50a911e",
  // measurementId: "G-80NLL75K4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function App() {

  const SignInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "628865134395-i9lef58o1u0hae410okkd7m4e0o7bm6l.apps.googleusercontent.com",
        iosClientId: "628865134395-37eb8i2qu5j8hv5s59mud5h5j45qk0m4.apps.googleusercontent.com",
        expoClientId: "628865134395-malh47p9v2el15tkrhnjhbfjdonb3o8v.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {

        //put user into firebase if the user is a legit Google person
        const auth = getAuth();
        //you will know if the person is legit if the tokens are legit
        const provider = GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        ); 

        //add the user to firebase if everything is legit
        const fbresult = await signInWithCredential(auth, provider);
        console.log(fbresult);                      //fbresult ---> firebase result. mobile is server and powerful; browser is the client
        
        //whatever is below doesn't matter
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  return (
    <View style={styles.container}>
      <Text>Hi, I'm malicious software, pls sign in with your email address</Text>
      <StatusBar style="auto" />
      
      <Button onPress={SignInGoogle} title="Sign In Google" />

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
