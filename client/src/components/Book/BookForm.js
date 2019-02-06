import React, { Component } from "react";
import Error from "../Error";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import { Query, Mutation } from "react-apollo";

export const GET_AUTHORS_QUERY = gql`
  query authors {
    authors {
      id
      name
    }
  }
`;

export const GET_PUBLISHERS_QUERY = gql`
  query publishers {
    publishers {
      id
      name
    }
  }
`;

const CREATEBOOK_MUTATION = gql`
  mutation CREATEBOOK_MUTATION(
    $title: String!
    $description: String!
    $image: String!
    $author: String!
    $publisher: String!
  ) {
    createBook(
      data: {
        title: $title
        description: $description
        image: $image
        author: $author
        publisher: $publisher
      }
    ) {
      id
      title
    }
  }
`;

const Composed = adopt({
  authors: ({ render }) => <Query query={GET_AUTHORS_QUERY}>{render}</Query>,
  publishers: ({ render }) => (
    <Query query={GET_PUBLISHERS_QUERY}>{render}</Query>
  ),
  book: ({ render }) => (
    <Mutation mutation={CREATEBOOK_MUTATION}>
      {(createBook, result) => render({ createBook, result })}
    </Mutation>
  )
});

class BookForm extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    author: "",
    publisher: ""
  };
  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="container publisher">
        <h3>Add Book</h3>
        <hr />

        <Composed>
          {data => {
            const { authors, publishers, book } = data;
            return (
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await book.createBook({ variables: this.state });
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <Error error={book.result.error} />
                  {book.result &&
                    book.result.data &&
                    book.result.data.createBook.id && (
                      <p className="alert alert-warning">
                        Books created successfully
                      </p>
                    )}
                  <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Book Title *"
                      value={this.state.name}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Description *"
                      rows="10"
                      value={this.state.description}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      placeholder="Book Image Url *"
                      value={this.state.image}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="author"
                      onChange={this.saveToState}
                      value={this.state.author}
                    >
                      <option value="">-author-</option>
                      {authors.data.authors &&
                        authors.data.authors.map(author => {
                          return (
                            <option key={author.id} value={author.id}>
                              {author.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="publisher"
                      onChange={this.saveToState}
                      value={this.state.publisher}
                    >
                      <option value="">-publisher-</option>
                      {publishers.data.publishers &&
                        publishers.data.publishers.map(publisher => {
                          return (
                            <option key={publisher.id} value={publisher.id}>
                              {publisher.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <input type="submit" className="btnSubmit" value="Add" />
                  </div>
                </div>
              </form>
            );
          }}
        </Composed>
      </div>
    );
  }
}

export default BookForm;
