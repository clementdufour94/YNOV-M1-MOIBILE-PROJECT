import React from 'react';
import { Text} from 'react-native';
import styled from 'styled-components';

const Index = ({number,step}) => {
  
  return (
    
    
        
        <Container>
          <Number>{number} :</Number>
          <Step>{step}</Step>
        </Container>
    
      
    
  );
};
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 10px;
  margin-horizontal: 20px;
  margin-right:70px;
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
