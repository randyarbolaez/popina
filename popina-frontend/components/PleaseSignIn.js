import { Query } from "react-apollo";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";
import Signup from "./Signup";

const Title = styled.h1`
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PleaseSignIn = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      console.log(!data.me);
      if (!data.me) {
        return (
          <div>
            <Title>Please Sign Up/In</Title>
            <Container>
              <Signup />
              <Signin />
            </Container>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignIn;
