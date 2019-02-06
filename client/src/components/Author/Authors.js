import React from "react";
import { GET_AUTHORS_QUERY } from "../Book/BookForm";
import { Query } from "react-apollo";
import { Link } from "@reach/router";
export default function Authors() {
  return (
    <Query query={GET_AUTHORS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading</p>;
        return (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">Authors</div>
            <ul className="list-group list-group-flush">
              {data.authors.map(author => (
                <li className="list-group-item" key={author.id}>
                  <Link to={`author/${author.id}`}>{author.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
}
