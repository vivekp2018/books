import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_BOOK_BY_ID = gql`
  query GET_BOOK_BY_ID($id: ID!) {
    books(id: $id) {
      title
      description
      image
      publisher {
        name
      }
      authors {
        name
      }
    }
  }
`;

const BookDetails = props => {
  return (
    <Query query={GET_BOOK_BY_ID} variables={{ id: props.bookId }}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading</p>;
        if (!data.books) return <p>Book not found</p>;
        return (
          <div className="container">
            <h3>{data.books[0].title}</h3>
            <hr />
            <div className="d-flex flex-row">
              <div className="p-4">
                <img src={data.books[0].image} alt={data.books[0].title} />
              </div>

              <div className="p-4">
                <div className="row">
                  <div className="col-md-12">{data.books[0].description}</div>
                </div>
                <div className="row">&nbsp;</div>
                <div className="row">
                  <div className="col-md-2">Author : </div>
                  <div className="col-md-10">{data.books[0].authors.name}</div>
                </div>
                <div className="row">
                  <div className="col-md-2 text-left">Publisher : </div>
                  <div className="col-md-10">
                    {data.books[0].publisher.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default BookDetails;
