import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Restaurant from "../pages/restaurant";
import styled from "styled-components";
import Head from "next/head";

const SingleRestaurantStyles = styled.div`
  display: grid;
  text-align: center;
  grid-auto-flow: row;
  grid-auto-columns: 1fr;
  min-height: 600px;
`;

const RestaurantName = styled.h2``;

const RestaurantMenu = styled.h2`
  border: 1px solid #f4976c;
  border-top: none;
  margin: 0 40%;
`;

const RestaurantLocation = styled.h2`
  border: 1px solid #f4976c;
  border-bottom: none;
  border-top: none;
  margin: 0 40%;
`;

const RestaurantDescription = styled.h2`
  justify-content: center;
  width: 800px;
  margin: 0 auto;
  margin-bottom: 4%;
  border: 1px solid #f4976c;
`;

const RestaurantImg = styled.img`
  width: 50%;
  height: 50%;
  object-fit: contain;
`;

const SINGLE_RESTAURANT_QUERY = gql`
  query SINGLE_RESTAURANT_QUERY($id: ID!) {
    restaurant(where: { id: $id }) {
      id
      name
      description
      location
      image
    }
  }
`;

class SingleRestaurant extends Component {
  render() {
    return (
      <Query query={SINGLE_RESTAURANT_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <h1>Error</h1>;
          if (loading) return <h1>Loading...</h1>;
          if (!data.restaurant)
            return <h1>No Restaurant Found for {this.props.id}</h1>;
          const restaurant = data.restaurant;
          return (
            <SingleRestaurantStyles>
              <Head>
                <title>Popina | {restaurant.name}</title>
              </Head>
              <div>
                <RestaurantName>{restaurant.name}</RestaurantName>
                <RestaurantImg src={restaurant.image} alt={restaurant.name} />
                <RestaurantMenu>Menu</RestaurantMenu>
                <RestaurantLocation>{restaurant.location}</RestaurantLocation>
                <RestaurantDescription>
                  {restaurant.description}
                </RestaurantDescription>
              </div>
            </SingleRestaurantStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleRestaurant;
