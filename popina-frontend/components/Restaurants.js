import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Restaurant from "./Restaurant";
import Pagination from "./Pagination";
import { perPage } from "../config";

const ALL_RESTAURANTS_QUERY = gql`
  query ALL_RESTAURANTS_QUERY($skip: Int = 0,$first:Int = ${perPage}) {
    restaurants(skip:$skip,first:$first,orderBy:createdAt_ASC) {
      id
      name
      description
      image
      location
      user{
        id
      }
    }
  }
`;

const Center = styled.div`
  text-align: center;
  margin: 2vmax;
`;

const RestaurantsList = styled.div`
  margin: 0 15vmax;
`;

class Restaurants extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_RESTAURANTS_QUERY}
          fetchPolicy="network-only"
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <RestaurantsList>
                {data.restaurants.map((restaurant) => (
                  <Restaurant restaurant={restaurant} key={restaurant.id} />
                ))}
              </RestaurantsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Restaurants;
export { ALL_RESTAURANTS_QUERY };
