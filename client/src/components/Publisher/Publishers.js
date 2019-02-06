import React from "react";
import { GET_PUBLISHERS_QUERY } from "../Book/BookForm";
import { Query } from "react-apollo";
import { Link } from "@reach/router";
export default function Publishers() {
  return (
    <Query query={GET_PUBLISHERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading</p>;
        return (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">Publishers</div>
            <ul className="list-group list-group-flush">
              {data.publishers.map(publisher => (
                <li className="list-group-item" key={publisher.id}>
                  <Link to={`publisher/${publisher.id}`}>{publisher.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
}
