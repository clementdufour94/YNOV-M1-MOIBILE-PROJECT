import React from 'react';
import styled from 'styled-components';

const Index = ({title, onPress,title2, onPress2}) => {
  return (
    <>
      <ButtonContainer>
        <StyledButton onPress={onPress}>
          <StyledText>{title}</StyledText>
        </StyledButton>
        <StyledButton onPress={onPress2}>
          <StyledText>{title2}</StyledText>
        </StyledButton>
      </ButtonContainer>
    </>
  );
};
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const StyledButton = styled.TouchableOpacity`
background-color: #0d6efd;
padding: 15px;
border-radius: 5px;
align-items: center;
width: 48%;
`;
const StyledText = styled.Text`
color: #fff;
font-size: 18px;
`;
export default Index;
