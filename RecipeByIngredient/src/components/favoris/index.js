import React from 'react';
import styled from 'styled-components';
import { Text, View } from 'react-native';
const Index = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = await getFavorites();
      setFavorites(favorites);
    };
    loadFavorites();
  }, []);

  const handleToggleFavorite = async (id) => {
    await toggleFavorite(id);
    const favorites = await getFavorites();
    setFavorites(favorites);
  };
  return (

    <View>
    {/* Afficher une liste de favoris */}
    {favorites.map((id) => (
      <TouchableOpacity key={id} onPress={() => handleToggleFavorite(id)}>
        <Text>{id}</Text>
      </TouchableOpacity>
    ))}
  </View>
    
    
        
       
      
    
  );
};
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 10px;
  margin-horizontal: 20px;
  margin-right:70;
`;

const Number = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: blue;
  margin-right: 10px;
`;

const Step = styled.Text`
  font-size: 18px;
  color: black;
  text-align: justify;
`;
export default Index;
