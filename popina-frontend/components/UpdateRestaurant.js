import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import styled from "styled-components";
import DeleteRestaurant from "./DeleteRestaurant";

const SINGLE_RESTAURANT_QUERY = gql`
  query SINGLE_RESTAURANT_QUERY($id: ID!) {
    restaurant(where: { id: $id }) {
      id
      name
      location
      description
    }
  }
`;

const UPDATE_RESTAURANT_MUTATION = gql`
  mutation UPDATE_RESTAURANT_MUTATION(
    $id: ID!
    $name: String
    $location: String
    $description: String
  ) {
    updateRestaurant(
      id: $id
      name: $name
      location: $location
      description: $description
    ) {
      id
      name
      location
      description
    }
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  fieldset {
    border-color: transparent;
    box-shadow: 10px 0px 5px 5px grey;
    border-bottom: none;
    display: flex;
    padding: 5%;
    margin: 0 5% 5% 5%;
  }
  label {
    font-size: 3.4rem;
    color: #537e80;
  }
  input {
    border: none;
    border-bottom: 2px dashed #9fcacc;
    background: none;
  }

  textarea {
    resize: none;
  }

  button {
    border: 1px solid #01142f;
    border-top: none;
    border-bottom: none;
    background: none;
    /* border-radius: 30%; */
    font-size: 1.5vmax;
    /* font-family: "Porton"; */
    color: #bdccff;
    margin: auto;
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  color: #0043a4;
`;

class UpdateRestaurant extends Component {
  state = {};

  handleChange = (e) => {
    const { name, type, value } = e.target;
    this.setState({ [name]: value });
  };

  updateRestaurant = async (e, updateRestaurantMutation) => {
    e.preventDefault();
    console.log("Updating restaurant");
    console.log(this.props);
    const res = await updateRestaurantMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    console.log("updated");
  };

  render() {
    return (
      <Query query={SINGLE_RESTAURANT_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.restaurant) return <p>Not valid Restaurant</p>;
          return (
            <Mutation
              mutation={UPDATE_RESTAURANT_MUTATION}
              variables={this.state}
            >
              {(updateRestaurantMutation, { error, loading }) => (
                <div>
                  <Title>Update</Title>
                  <Form
                    onSubmit={(e) =>
                      this.updateRestaurant(e, updateRestaurantMutation)
                    }
                  >
                    {error && <p>{error.message}</p>}

                    <fieldset disabled={loading}>
                      <label htmlFor="name">
                        Restaurant Name
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="name"
                          required
                          defaultValue={data.restaurant.name}
                          onChange={this.handleChange}
                        />
                      </label>

                      <label htmlFor="location">
                        Restaurant Location
                        <input
                          type="text"
                          id="location"
                          name="location"
                          placeholder="address | city,state"
                          required
                          defaultValue={data.restaurant.location}
                          onChange={this.handleChange}
                        />
                      </label>

                      <label htmlFor="description">
                        Restaurant Description
                        <textarea
                          type="text"
                          id="description"
                          name="description"
                          placeholder="describe your restaurant in 50ish words or less"
                          maxLength="360"
                          required
                          rows="5"
                          cols="50"
                          defaultValue={data.restaurant.description}
                          onChange={this.handleChange}
                        />
                      </label>
                      <button type="submit">
                        Sav{loading ? "ing" : "e"} Changes
                      </button>
                      <DeleteRestaurant id={data.restaurant.id}>
                        Delete this Restaurant
                      </DeleteRestaurant>
                    </fieldset>
                  </Form>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateRestaurant;
export { UPDATE_RESTAURANT_MUTATION };
