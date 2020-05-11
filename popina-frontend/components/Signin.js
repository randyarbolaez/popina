import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";

import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      id
      username
      password
    }
  }
`;

const FieldSet = styled.fieldset`
  display: flex;
  text-align: center;
  border-left: none;
  border-right: none;
  padding: 2vmax;
  margin: 0 0 4% 0;
  border-bottom-right-radius: 15vmax;
  border-bottom-left-radius: 15vmax;
  button {
    border: 1px solid #1771f1;
    border-top: none;
    background: none;
    border-radius: 30%;
    font-size: 3vmax;
    /* font-family: "Porton"; */
    color: #bdccff;
    margin: auto;
  }
  input {
    background: none;
    border: 1px solid #1771f1;
    border-top: none;
    width: 15vmax;
    border-radius: 20%;
    text-align: center;
    height: 2vmax;
    font-size: 1.3vmax;
    color: #939598;
  }
`;

const FormSubTitle = styled.p`
  /* border: 1px solid #e5f0ff; */
  border-bottom: none;
  margin: 0 30%;
  color: #7eb3ff;
  font-size: 1.2vmax;
`;

class Signin extends Component {
  state = {
    username: "",
    password: "",
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            <form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await signup();
                this.setState({ username: "", password: "" });
                Router.push({
                  pathname: "/restaurants",
                });
              }}
            >
              <FieldSet disabled={loading}>
                {error && <p onError={error}>Error</p>}
                <label htmlFor="Columns">
                  <FormSubTitle>username</FormSubTitle>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="Columns">
                  <FormSubTitle>password</FormSubTitle>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>

                <button type="submit">Sign In</button>
              </FieldSet>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
