import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-image: url('/static/img/home-page-img.jpeg');
  background-size: cover;
  height: 90vh;
  margin: 5%;
`;

class Home extends Component {
  render() {
    return <Container />;
  }
}

export default Home;
