import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import User from "./User";
import Signout from "./Signout";

const Container = styled.div`
  /* -webkit-clip-path: polygon(0 0, 100% 0, 100% 93%, 0 100%); */
  /* clip-path: polygon(10% 10%, 94% 10%, 80% 96%, 15% 94%); */
  margin: 0 10%;
  text-transform: lowercase;
  background-color: #f4976c;
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 2%;
  font-size: 2.7rem;
  a {
    color: #d2fdff;
  }

  a:hover {
    color: #fbe8a6;
  }

  @media (max-width: 768px) {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    margin: 0 0;

    a {
      padding: 5%;
      color: #d2fdff;
    }
  }

  @media (min-width: 1024px) {
    clip-path: polygon(10% 10%, 94% 10%, 82% 96%, 15% 94%);
  }
`;

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Container>
            {!me && (
              <Link href="/">
                <a>Sign Up/In</a>
              </Link>
            )}
            {me && (
              <Link href="/add-restaurant">
                <a>add restaurant</a>
              </Link>
            )}
            <Link href="/restaurants">
              <a>Restaurants</a>
            </Link>
            {me && (
              <div>
                <Signout />
              </div>
            )}
          </Container>
        )}
      </User>
    );
  }
}

export default Nav;
