import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useCallback,useContext} from 'react';
import {FlatList, Image} from 'react-native';
import styled from 'styled-components';
import RecipeRow from '../components/recipeRow';
import ButtonCenter from '../components/buttonCenter';
import Input from '../components/textInput';
import config from '../../firebase';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { UserContext } from '../config/userContext';

const BASE_URL_2 = 'https://api.spoonacular.com/recipes/findByIngredients';
const API_KEY_2 = '1da1e0ded4384f76bf573d5ec9b0decc';

const Home = props => {
  const app = initializeApp(config);
  const auth = getAuth(app);

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
  

  const [inputs, setInputs] = React.useState({
    ingredients: '',
  });
  const [page, setPage] = React.useState(0);
  const [recipes, setRecipes] = React.useState([]);

  const getRecipesByIngredients = id => {
    axios
      .get(`${BASE_URL_2}`, {
        params: {
          apiKey: API_KEY_2,
          number: 10,
          ingredients: inputs.ingredients,
        },
      })
      .then(response => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ response', response);
        setRecipes([...recipes, ...response.data]);
      })
      .catch(err => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ err', err);
      });
  };
  const handleNavigation = page => {
    props.navigation.navigate(page);
  };
  return (
    <Container>
      
      <Input
        placeholder="Ingrédients"
        value={inputs.ingredients}
        onChangeText={text => setInputs({...inputs, ingredients: text})}
      />

      <ButtonCenter title="Research" onPress={getRecipesByIngredients} />

      <FlatList
        data={recipes}
        onEndReached={() => {
          
          setPage(page + 1);
        }}
        renderItem={({item}) => (
          <RecipeRow title={item.title} image={item.image} id={item.id} />
        )}
        keyExtractor={item => item.id}
      />

      
      
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  padding-horizontal: 20px;
`;

const Touchable = styled.TouchableOpacity``;

export default Home;
