import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useContext } from 'react';
import styled from 'styled-components';
import Home from '../screens/home';
import Login from '../screens/login';

import Details from '../screens/details';
import Register from '../screens/register';
import Header from '../components/header'
import { UserContext } from './userContext';

const Stack = createNativeStackNavigator();

const Routes = () => {
  
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        setUser(!!token);
        
        
      })
      .catch(err => {
        console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
      });
  }, [user]);
  return (
    <GlobalSafeArea>
      <NavigationContainer>
     



      <Stack.Navigator
          screenOptions={{
            header: ({navigation}) => <Header navigation={navigation} />,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details}  />
          <Stack.Screen name="Login" component={Login}  />
          <Stack.Screen name="Register" component={Register}  />
          
        </Stack.Navigator>
        





      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: red;
`;

export default Routes;
