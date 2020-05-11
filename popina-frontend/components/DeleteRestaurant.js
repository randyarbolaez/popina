import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import Restaurant from "./Restaurant";
import { ALL_RESTAURANTS_QUERY } from "./Restaurants";

const DELETE_RESTAURANT_MUTATION = gql`
  mutation DELETE_RESTAURANT_MUTATION($id: ID!) {
    deleteRestaurant(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background: #f4976c;
  font-size: 3vmax;
  color: #d2fdff;
`;

class DeleteRestaurant extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_RESTAURANTS_QUERY });
    // console.log(payload);
    data.restaurants = data.restaurants.filter(
      (restaurant) => restaurant.id !== payload.data.deleteRestaurant.id
    );
    Router.push({
      pathname: "/restaurants",
    });
    cache.writeQuery({ query: ALL_RESTAURANTS_QUERY, data });
  };
  render(props) {
    return (
      <Mutation
        mutation={DELETE_RESTAURANT_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteRestaurant, { error }) => (
          <Button
            onClick={() => {
              if (confirm("Are you sure you want to delete your restaurant?")) {
                deleteRestaurant();
              }
            }}
          >
            {this.props.children}
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteRestaurant;
export { DELETE_RESTAURANT_MUTATION };
