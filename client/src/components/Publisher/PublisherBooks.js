import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PropTypes from "prop-types";

const GET_BOOK_PUBLISHERS = gql`
  query GET_BOOK_PUBLISHERS($id: ID!) {
    publishers(id: $id) {
      id
      name
      books {
        id
        title
        image
        description
        authors {
          name
        }
      }
    }
  }
`;

const PublisherBooks = ({ publisherId }) => {
  return (
    <Query query={GET_BOOK_PUBLISHERS} variables={{ id: publisherId }}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading</p>;
        if (error) return <p>Error: {error.message}</p>;
        if (!data.publishers) return <p>Publisher not found</p>;
        if (!data.publishers[0].books || data.publishers[0].books.length === 0)
          return <p>No books for Publisher</p>;
        return (
          <div className="container">
            <h3>{data.publishers[0].name}</h3>
            <hr />

            <div className="d-flex flex-column">
              {data.publishers[0].books.map(book => {
                return (
                  <React.Fragment key={book.id}>
                    <div className="d-flex flex-row">
                      <div className="p-4 img-fluid">
                        <img
                          style={{ maxWidth: 100 }}
                          src={book.image}
                          alt={book.title}
                        />
                      </div>

                      <div className="p-4">
                        <div className="row">
                          <div className="col-md-12">{book.description}</div>
                        </div>
                        <div className="row">&nbsp;</div>
                        <div className="row">
                          <div className="col-md-1 text-nowrap">Author : </div>
                          <div className="col-md-11">{book.authors.name}</div>
                        </div>
                      </div>
                      <hr />
                    </div>
                    <hr style={{ width: "100%" }} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      }}
    </Query>
  );
};
PublisherBooks.propTypes = {
  publisherId: PropTypes.string.isRequired
};
export default PublisherBooks;
