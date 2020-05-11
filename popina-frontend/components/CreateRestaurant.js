import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import styled from "styled-components";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation CREATE_RESTAURANT_MUTATION(
    $name: String!
    $location: String!
    $description: String!
    $image: String
  ) {
    createRestaurant(
      name: $name
      location: $location
      description: $description
      image: $image
    ) {
      id
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
    margin: 0 4% 4% 4%;
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
    border-bottom-right-radius: 3vh;
    border-top-right-radius: 3vh;
    border-bottom-left-radius: 3vh;
    border-top-left-radius: 3vh;
    background: none;
    /* border-radius: 30%; */
    font-size: 1.5vmax;
    /* font-family: "Porton"; */
    color: #bdccff;
    margin: auto;
  }

  button:hover {
    background: #f4976c;
    color: #ecffff;
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  color: #0043a4;
`;

class CreateRestaurant extends Component {
  state = {
    name: "",
    location: "",
    description: "",
    image: "",
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadFile = async (e) => {
    console.log("Uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "popina");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx3i4rcnz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({ image: file.secure_url });
  };

  render() {
    return (
      <Mutation mutation={CREATE_RESTAURANT_MUTATION} variables={this.state}>
        {(createRestaurant, { error, loading }) => (
          <div>
            <Title>Add Your Restaurant</Title>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await createRestaurant();
                Router.push({
                  pathname: "/restaurant",
                  query: { id: res.data.createRestaurant.id },
                });
              }}
            >
              {error && <p>{error.message}</p>}
              <fieldset disabled={loading}>
                <label htmlFor="file">
                  Restaurant StoreFront
                  <input
                    type="file"
                    id="file"
                    name="file"
                    required
                    onChange={this.uploadFile}
                  />
                </label>

                <label htmlFor="name">
                  Restaurant Name
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="name"
                    required
                    value={this.state.name}
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
                    value={this.state.location}
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
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateRestaurant;
export { CREATE_RESTAURANT_MUTATION };
