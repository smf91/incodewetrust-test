import React from 'react';
import './App.css';
import FavoriteJokeBlock from './Copmonents/FavoriteJokeBlock_Component'
import ButtonBlock from './Copmonents/ButtonBlock_Component'
import TextContainer from './Copmonents/TextContainer_Component'
import styled from 'styled-components'


const Container = styled.div`
  position: absolute;
  min-width:100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: grid;
  grid-template-columns: 9fr 1fr;
`


function App() {
  return (
    <Container>
      <FavoriteJokeBlock/>
      <TextContainer/>
      <ButtonBlock/>
    </Container>
  )
}

export default App;
