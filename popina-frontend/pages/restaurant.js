import SingleRestaurant from '../components/SingleRestaurant'

const Restaurant = props => (
  <div>
    <SingleRestaurant id={props.query.id} />
  </div>
);

export default Restaurant;
