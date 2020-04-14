import CreateRestaurant from '../components/CreateRestaurant';
import PleaseSignIn from '../components/PleaseSignIn';

const addRestaurants = props => (
  <div>
    <PleaseSignIn>
      <CreateRestaurant />
    </PleaseSignIn>
  </div>
);

export default addRestaurants;
