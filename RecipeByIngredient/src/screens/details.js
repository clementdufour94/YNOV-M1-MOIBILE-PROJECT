import React, {useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {FlatList, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RecipeDetail from '../components/recipeDetail';
import RecipeInstruction from '../components/recipeInstruction';
import RecipeIngredient from '../components/recipeIngredient';
import Title from '../components/textJustifyCenter';
import { UserContext } from '../config/userContext';

const Details = () => {
  const route = useRoute();
  const id_Recipe = route.params.id;
  const BASE_URL = 'https://api.spoonacular.com/recipes/';
  const API_KEY = '1da1e0ded4384f76bf573d5ec9b0decc';
  const [recipe, setRecipe] = React.useState(null);
  const [variable, setVariable] = React.useState('');
  const { user, setUser } = useContext(UserContext);
  const Favoris = (id, titre) => {

    React.useEffect(() => {
      AsyncStorage.getItem('token')
        .then(token => {
          
          setUser(!!token);
        
          
        })
        .catch(err => {
          console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
        });
    }, [user]);
    AsyncStorage.getItem('favoris')
      .then(favoris => {
        let newFavoris = [];
        if (favoris) {
          newFavoris = JSON.parse(favoris);
          const existingIndex = newFavoris.findIndex(item => item.id === id);
          if (existingIndex !== -1) {
            setVariable('existe');
            // L'ID existe déjà, on le supprime de la liste
            newFavoris.splice(existingIndex, 1);
            Alert.alert('Error', 'Deleted to Favorites', [{text: '  OK'}]);
          // setVariable('');
          } else {
            // L'ID n'existe pas, on l'ajoute à la liste
            newFavoris.push({id, titre});
            setVariable('ajout');
            Alert.alert('Succes', 'Added to Favorites', [{text: 'OK'}]);
            // setVariable('');
          }
        } else {
          // La liste de favoris n'existe pas encore, on l'initialise avec le nouveau favori
          newFavoris = [{id, titre}];
          setVariable('ajout');
        }

    

        AsyncStorage.setItem('favoris', JSON.stringify(newFavoris))
          .then(() => {
            console.log('Favoris mis à jour :', newFavoris);
          })
          .catch(err => {
            console.log('Erreur lors de la mise à jour des favoris :', err);
          });
      })
      .catch(err => {
        console.log('Erreur lors de la récupération des favoris :', err);
      });
  };

  const getRecipeById = id => {
    axios
      .get(`${BASE_URL}/${id_Recipe}/information`, {
        params: {
          apiKey: API_KEY,
        },
      })
      .then(response => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ response', response);
        setRecipe([response.data]);
      })
      .catch(err => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ err', err);
      });
  };

  useEffect(() => {
    getRecipeById(id_Recipe);
  }, [id_Recipe]);

  return (
    <Container>
      <FlatList
        data={recipe}
        onEndReached={() => {
         
        }}
        renderItem={({item}) => (
          <>
            <RecipeDetail title={item.title} image={item.image} />
            <Title title="Ingrédients:"></Title>

            <FlatList
              data={item.extendedIngredients}
              onEndReached={() => {
               
              }}
              renderItem={({item}) => (
                <RecipeIngredient original={item.original} />
              )}
              keyExtractor={item => item.id}
            />

            <Title title="Instructions:"></Title>

            <FlatList
              data={item.analyzedInstructions}
              onEndReached={() => {
                
              }}
              renderItem={({item}) => (
                <FlatList
                  data={item.steps}
                  onEndReached={() => {
                    
                  }}
                  renderItem={({item}) => (
                    <RecipeInstruction number={item.number} step={item.step} />
                  )}
                  keyExtractor={item => item.id}
                />
              )}
              keyExtractor={item => item.id}
            />
            {user ? (

            <Touchable onPress={() => Favoris(item.id, item.title)}>
              <Title title="Ajouter au favoris"></Title>
            </Touchable>
            ):(<></>) }
          </>
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
`;

const StyledText = styled.Text`
  color: blue;
`;

const Touchable = styled.TouchableOpacity``;

export default Details;
