import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { Link } from "@reach/router";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => (
      <li className="nav-item">
        <button className="nav-link" onClick={signout}>
          Sign Out
        </button>
      </li>
    )}
  </Mutation>
);
export default Signout;
