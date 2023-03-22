import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components';
import Title from '../components/textJustifyCenter';
import ButtonGroup from '../components/buttonGroup';
import Input from '../components/textInput';
import {Alert} from 'react-native';

import config from '../../firebase';
import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {GoogleSignin, statusCodes, GoogleSigninButton} from '@react-native-google-signin/google-signin';




GoogleSignin.configure({
  webClientId:
    '645862727318-ler0hbfijn286d49gs6sv2ib6klha8pe.apps.googleusercontent.com',
  offlineAccess: false,
});
const Register = () => {
  const app = initializeApp(config);
  const auth = getAuth(app);
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const GoToLogin = async () => {
    try {
     
      // redirection vers la page Login
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  

 
  const createUserWithGoogle = () => {
    GoogleSignin.signIn()
      .then(({ idToken, accessToken }) => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
        return firebase.auth().signInWithCredential(googleCredential)
          .then(({ user }) => {
            const { uid, displayName, email, photoURL } = user;
            firebase.firestore().collection('users').doc(uid).set({
              displayName,
              email,
              photoURL,
            }, { merge: true });
            
            return AsyncStorage.setItem('token', idToken);
          })
          .then(() => {
            navigation.navigate('Home');
            Alert.alert('Success', 'Your account was created successfully!');
          })
          .catch((error) => {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              Alert.alert('Cancelled', 'Sign-in was cancelled!');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              Alert.alert('Error', 'Another sign-in is in progress!');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              Alert.alert('Error', 'Google Play services not available!');
            } else {
              Alert.alert('Error', 'Something went wrong!' + error);
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const HandleRegister = () => {
    if (inputs.password == inputs.password_confirmation) {
      createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
         
          return userCredential.user.getIdToken();
          // ...
        })
        .then(accessToken => {
          AsyncStorage.setItem('token', accessToken);
          navigation.navigate('Home');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      console.log('Les mots de passes ne correspondent pas ');
    }
  };

  return (
    <Container>
      <Title title="Register" />
      <Input
        placeholder="Email"
        value={inputs.email}
        onChangeText={text => setInputs({...inputs, email: text})}
      />
      <Input
        placeholder="Password"
        value={inputs.password}
        onChangeText={text => setInputs({...inputs, password: text})}
      />
      <Input
        placeholder="Password Confirmation"
        value={inputs.password_confirmation}
        onChangeText={text =>
          setInputs({...inputs, password_confirmation: text})
        }
      />
      <ButtonGroup
        title="REGISTER"
        title2="LOGIN"
        onPress={HandleRegister}
        onPress2={GoToLogin}
      />
      
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={createUserWithGoogle}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  padding-horizontal: 20px;
`;

export default Register;
