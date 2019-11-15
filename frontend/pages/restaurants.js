import Index from "./index";
import Restaurants from '../components/Restaurants';

const RestaurantsPage = props => (
  <div>
    <Restaurants page={parseFloat(props.query.page) || 1} />
  </div>
);

export default RestaurantsPage;
