import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import styled from "styled-components";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const ButtonToLink = styled.div`
  button {
    text-transform: lowercase;
    border: none;
    background-color: transparent;
    color: #bbc9dd;
    font-size: 1.5vmax;
  }
  button:hover {
    color: #bc0022;
    cursor: pointer;
  }
`;

const Signout = (props) => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signout) => (
      <ButtonToLink>
        <button onClick={signout}>sign out</button>
      </ButtonToLink>
    )}
  </Mutation>
);

export default Signout;
