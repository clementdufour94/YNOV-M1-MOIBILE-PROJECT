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
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import '@react-native-firebase/firestore';
import {GoogleSignin, statusCodes, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';


GoogleSignin.configure({
    webClientId:
      '645862727318-ler0hbfijn286d49gs6sv2ib6klha8pe.apps.googleusercontent.com',
    offlineAccess: false,
  });
const Login = () => {

  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const app = initializeApp(config);
  const auth = getAuth(app);
  
 

  const signInWithGoogle = () => {
    let idToken; // Déclarer une variable pour stocker idToken
    
    GoogleSignin.signIn()
      .then(({ idToken: token, accessToken }) => { // Stocker le token dans la variable
        idToken = token; // Affecter la valeur du token à la variable idToken
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
        return firebase.auth().signInWithCredential(googleCredential);
      })
      .then(({ user }) => {
        const { uid, displayName, email, photoURL } = user;
        firebase.firestore().collection('users').doc(uid).set({
          displayName,
          email,
          photoURL,
        }, { merge: true });
        
        return AsyncStorage.setItem('token', idToken); // Stocker idToken dans AsyncStorage
      })
      .then(() => {
        
        
        navigation.navigate('Home')
        
        Alert.alert('Success', 'You have successfully signed in!');
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
  };


  const handleLogin = () => {

    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
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
        if (errorCode === 'auth/user-not-found') {

          Alert.alert('Error', 'User not found, check email and try again', [
            
            {text: 'OK'},
          ]);
          
        } else if (errorCode === 'auth/wrong-password') {
          Alert.alert('Error', 'Wrong password, check password and try again', [
            
            {text: 'OK'},
          ]);
        }else if (errorCode === 'auth/invalid-email'){
          Alert.alert('Error', 'Invalid email address, check email and try again', [
            
            {text: 'OK'},
          ]);

        } else {
          console.log(errorMessage);
        }
      });
  };

  const GoToRegister = async () => {
    try {
      
      // redirection vers la page Login
      navigation.navigate('Register');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Container>
      <Title title="Login" />
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
      <ButtonGroup
        title="REGISTER"
        title2="LOGIN"
        onPress={GoToRegister}
        onPress2={handleLogin}
      />
      
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signInWithGoogle}
        
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  padding-horizontal: 20px;
`;

export default Login;
