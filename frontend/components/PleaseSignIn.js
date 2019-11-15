import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      console.log(!data.me)
      if (!data.me) {
        return (
          <div>
            <h2>Please Sign In before continuing</h2>
            <Signin />
          </div>)
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignIn;