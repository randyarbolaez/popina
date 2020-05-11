import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import DeleteRestaurant from "./DeleteRestaurant";
import UpdateRestaurant from "./UpdateRestaurant";
import User from "./User";

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
`;

const RestaurantsList = styled.div`
  border: 1px solid #bcbec0;
  padding: 2%;
  margin: 0 5%;
  color: #002d6d;
  :hover {
    box-shadow: 10px 10px 5px #bcbec0;
  }
`;

const RestaurantTitle = styled.h2`
  border: 1px solid #1771f1;
  border-top: none;
  border-bottom: none;
  border-top-right-radius: 50vmax;
  border-top-left-radius: 50vmax;
  border-bottom-left-radius: 50vmax;
  border-bottom-right-radius: 50vmax;
  margin: 0 45% 1% 0%;
`;

const RestaurantImg = styled.img`
  width: 350px;
  height: 250px;
  background-size: contain;
`;

const RestaurantDescription = styled.h2`
  width: 50%;
`;

export default class Restaurant extends Component {
  static propTypes = {
    restaurant: PropTypes.object.isRequired,
  };
  render() {
    const { restaurant } = this.props;
    return (
      <RestaurantsList>
        <div>
          <User>
            {({ data: { me } }) => {
              if (me !== null) {
                if (me.id === restaurant.user.id) {
                  return <UpdateRestaurant id={restaurant.id} />;
                }
                return null;
              }
              return null;
            }}
          </User>
          <Link
            href={{
              pathname: "/restaurant",
              query: { id: restaurant.id },
            }}
          >
            <a>
              <RestaurantTitle>{restaurant.name}</RestaurantTitle>
            </a>
          </Link>
          <Flex>
            <RestaurantDescription>
              {restaurant.description}
            </RestaurantDescription>
            <RestaurantImg src={restaurant.image} alt={restaurant.name} />
          </Flex>
        </div>
      </RestaurantsList>
    );
  }
}
