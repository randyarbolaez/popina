import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import User from "./User";
import Signout from "./Signout";

const Container = styled.div`
  /* -webkit-clip-path: polygon(0 0, 100% 0, 100% 93%, 0 100%); */
  clip-path: polygon(4% 30%, 100% 15%, 80% 75%, 15% 94%);
  margin: 0 10vw;
  text-transform: lowercase;
  background-color: #535353;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: baseline;
  padding: 2%;
  font-size: 2.5vmax;
  a {
    color: #bbc9dd;
  }

  a:hover {
    color: #f1f2f2;
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
                <a>Popina</a>
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
              <>
                <Signout />
              </>
            )}
          </Container>
        )}
      </User>
    );
  }
}

export default Nav;
