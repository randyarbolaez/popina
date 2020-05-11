import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";

import Signup from "./Signup";
import Signin from "./Signin";
import User from "./User";

const Container = styled.div`
  margin-top: 5vmax;
  grid-gap: 20px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const Title = styled.h1`
  color: #4a586e;
  font-variant: small-caps;
  font-size: 8vmax;
  text-align: center;
  margin: 0;
`;

class Home extends Component {
  render() {
    return (
      <div>
        <Title>Popina</Title>
        <User>
          {({ data: { me } }) => (
            <div>
              {!me && (
                <Container>
                  <Signup />
                  <Signin />
                </Container>
              )}
              {me && (
                <div>
                  <h1>You're already signed in</h1>
                </div>
              )}
            </div>
          )}
        </User>
      </div>
    );
  }
}

export default Home;
