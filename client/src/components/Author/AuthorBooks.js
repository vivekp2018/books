import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_AUTHOR_BOOKS = gql`
  query GET_AUTHOR_BOOKS($id: ID!) {
    authors(id: $id) {
      id
      name
      books {
        id
        title
        image
        description
      }
    }
  }
`;

const AuthorBooks = ({ authorId }) => {
  return (
    <Query query={GET_AUTHOR_BOOKS} variables={{ id: authorId }}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading</p>;

        if (!data.authors) return <p>Author not found</p>;
        if (!data.authors[0].books || data.authors[0].books.length == 0)
          return <p>No books for Author</p>;
        return (
          <div className="container">
            <h3>{data.authors[0].name}</h3>
            <hr />

            <div className="d-flex flex-column">
              {data.authors[0].books.map(book => {
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

export default AuthorBooks;
