import React from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import { Redirect } from "@reach/router";

export default function AuthRoute(props) {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.me) {
          return <Redirect to="signin" />;
        }
        return props.render;
      }}
    </Query>
  );
}
