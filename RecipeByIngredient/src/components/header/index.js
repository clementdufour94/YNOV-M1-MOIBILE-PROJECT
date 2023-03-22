import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import firebase from '../../../firebase';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { UserContext } from '../../config/userContext';


const Header = ({title}) => {
  const navigation = useNavigation();
  const app = initializeApp(firebase);
  const auth = getAuth(app);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { user, setUser } = useContext(UserContext);



  

  const handleMenuPress = () => {
    setMenuOpen(!menuOpen);
    
  };

  
  React.useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        
        setUser(!!token);
      
        
      })
      .catch(err => {
        console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
      });
  }, [user]);
  

  

  const handleNavigate = screen => {
    navigation.navigate(screen);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // La déconnexion a réussi, effacez le token de l'utilisateur du stockage local
        AsyncStorage.removeItem('token');
        setUser(false)
        
        // Naviguez vers l'écran de connexion
        navigation.navigate('Login')
        
      })
      .catch(error => {
        // Une erreur s'est produite lors de la déconnexion, afficher le message d'erreur correspondant
        console.log(error);
      });
  };
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackButton source={require('./back-arrow.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('Home')}>
        <Title>RecipeByIngredients</Title>
      </TouchableOpacity>
      {menuOpen && (
        <MenuContainer>
          <MenuOption onPress={() => handleNavigate('Home')}>
            <MenuText>Search for a recipe based on ingredients</MenuText>
          </MenuOption>
          
          
          {user ? (
            <>
              
              <MenuOption onPress={() => handleLogout()}>
                <MenuText>Logout</MenuText>
              </MenuOption>
            </>
          ) : (
            <>
              <MenuOption onPress={() => handleNavigate('Login')}>
                <MenuText>Login</MenuText>
              </MenuOption>
              <MenuOption onPress={() => handleNavigate('Register')}>
                <MenuText>Register</MenuText>
              </MenuOption>
            </>
          )}
        </MenuContainer>
      )}
      <TouchableOpacity onPress={() => handleMenuPress()}>
        <Logo source={require('./menu-icon.png')} />
      </TouchableOpacity>
    </Container>
  );
};

const MenuContainer = styled.View`
  position: absolute;
  top: 60px;
  right: 0;
  width: 150px;
  border-radius: 10px;
  background-color: #ffffff;
  shadow-color: #000000;
  shadow-offset: {
    width: 0,
    height: 2,
  };
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  z-index: 1;
`;
const MenuOption = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #dddddd;
`;
const MenuText = styled.Text`
  font-size: 18px;
`;
const Container = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  elevation: 2;
  background-color: #ffffff;
`;

const BackButton = styled.Image`
  width: 24px;
  height: 24px;
  align-self: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const Logo = styled.Image`
  width: 55px;
  height: 55px;
  justify-content: center;
`;

export default Header;
