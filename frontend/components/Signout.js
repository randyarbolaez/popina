import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import styled from 'styled-components';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const ButtonToLink = styled.div`
  button{
    border:none;
    background-color: #f4976c;
    font-family:'Porton';
    color: #d2fdff;
    font-size: 2.7rem;
  }
  button:hover{
    color: #fbe8a6;
    cursor: pointer;
  }
`;


const Signout = props => (
  <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signout => (<ButtonToLink><button onClick={signout}>Sign Out</button></ButtonToLink>)}
  </Mutation>
)

export default Signout;