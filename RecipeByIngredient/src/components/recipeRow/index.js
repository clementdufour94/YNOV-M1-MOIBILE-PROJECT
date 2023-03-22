import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';

const Index = ({image, title, id}) => {

  const navigation = useNavigation();
  
  return (
    <>
      <Touchable
        onPress={()=>navigation.navigate('Details',{id:id})}>
        <Image style={{width: 100, height: 100}} source={{uri: image}} />

        <StyledText>{title}</StyledText>
      </Touchable>
    </>
  );
}

const StyledText = styled.Text`
  color: red;
`;
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  flex: 1;
`;
export default Index;
