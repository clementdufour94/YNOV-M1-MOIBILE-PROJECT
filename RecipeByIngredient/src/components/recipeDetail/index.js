import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';

const Index = ({title, image}) => {
  return (
    <>
      <Image style={{width: 400, height: 400}} source={{uri: image}} />

      <Text>{title}</Text>
    </>
  );
};
const Text = styled.Text`
  font-size: 24px;

  color: black;
  text-align: center;
`;
export default Index;
