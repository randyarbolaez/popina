import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import styled from 'styled-components';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($username:String!, $password:String!){
    signin(username:$username, password:$password){
      id
      username
      password
    }
  }
`;

const FieldSet = styled.fieldset`
  display:flex;
  text-align:center;
  border-color:#f4976c;
  border-left:none;
  padding:5%;
  margin:0 4% 4% 4%;
  button{
    background:#ECFFFF;
    border:none;
    border-radius:5%;
    font-size:3.5rem;
    font-family:'Porton';
    color:#F4976C;
    margin:auto;
  }
  input{
    background:none;
    /* border:none; */
    border: 1px solid #f4976c;
    border-top:none;
    width:35%;
    text-align:center;
    height:30px;
    font-size:1.3rem;
  }
`;

const FormTitle = styled.h2`
  border: 1px solid #f4976c;
  border-bottom:none;
  /* padding: 2%; */
  margin:0 30%;
  /* color:#f4976c; */
`;

const FormSubTitle = styled.p`
  border: 1px solid #f4976c;
  border-bottom:none;
  /* padding: 2%; */
  margin:0 30%;
  color:#f4976c;
`;


class Signin extends Component {
  state = {
    username: '',
    password: ''
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(signup, { error, loading }) => {
          return (
            <form method='post' onSubmit={async e => {
              e.preventDefault();
              const res = await signup();
              this.setState({ username: '', password: '' })
            }}>
              <FieldSet disabled={loading}>
                <FormTitle>Sign In to account</FormTitle>
                {error && <p onError={error}>Error</p>}
                <label htmlFor="Columns">
                  <FormSubTitle>username</FormSubTitle>
                  <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.saveToState} />
                </label>
                <label htmlFor="Columns">
                  <FormSubTitle>password</FormSubTitle>
                  <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState} />
                </label>

                <button type="submit">Sign In</button>
              </FieldSet>
            </form>
          )
        }}
      </Mutation>
    )
  }
}

export default Signin;