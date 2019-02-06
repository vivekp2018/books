import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "@reach/router";
import Publishers from "../Publisher/Publishers";
import Authors from "../Author/Authors";

const GET_BOOKS_QUERY = gql`
  query GET_BOOKS_QUERY {
    books {
      id
      title
      image
      description
      authors {
        id
        name
      }
      publisher {
        id
        name
      }
    }
  }
`;

const Page = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 ">
          {
            <Query query={GET_BOOKS_QUERY}>
              {({ data, loading, error }) => {
                if (loading) return <p>loading</p>;
                console.log(data.books);
                return (
                  data.books &&
                  data.books.map(book => {
                    return (
                      <React.Fragment key={book.id}>
                        <div className="row p-4">
                          <div className="col-md-3">
                            <Link to={`/book/${book.id}`}>
                              <img
                                className="img-thumbnail rounded mb-3 mb-md-0 img-thumbnail"
                                style={{ maxWidth: 150 }}
                                src={book.image}
                                alt={book.title}
                              />
                            </Link>
                          </div>
                          <div className="col-md-9 ">
                            <div className="row">
                              <div className="col">
                                <h3>{book.title}</h3>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                {book.description.length > 100
                                  ? book.description.substring(0, 200)
                                  : book.description}
                              </div>
                            </div>

                            <div className="row p-3">
                              <div className="col-md-4" />
                              <div className="col-md-8">
                                <Link
                                  className="btn btn-primary justify-content-center"
                                  to={`/book/${book.id}`}
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })
                );
              }}
            </Query>
          }
        </div>
        <div className="col-md-3">
          <div className="row">
            <Publishers />
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <Authors />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
