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

class Home extends Component {
  render() {
    return (
      <div>
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

// <div>
//   {!me && (
//     <div>
//       <Signup />
//       <Signin />
//     </div>
//   )}
// </div>

export default Home;
