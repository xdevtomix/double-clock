import React from 'react';
import styled from 'styled-components';

import Clock from './components/Clock';

export default function App() {

  return (
    <Container data-component="app">
      <Clock />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;