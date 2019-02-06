import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../Error";
const AUTHOR_MUTATON = gql`
  mutation AUTHOR_MUTATON($name: String!, $bio: String!) {
    createAuthor(data: { name: $name, bio: $bio }) {
      name
      id
    }
  }
`;

class AuthorForm extends Component {
  state = {
    name: "",
    bio: ""
  };
  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Mutation mutation={AUTHOR_MUTATON} variables={this.state}>
        {(createAuthor, { data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <div className="container publisher">
              <h3>Add Author</h3>
              <hr />
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await createAuthor();
                  this.setState({
                    name: "",
                    bio: ""
                  });
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <Error error={error} />
                  {data && data.createAuthor && data.createAuthor.id && (
                    <p className="alert alert-warning">
                      Author created successfully
                    </p>
                  )}
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Author Name *"
                      value={this.state.name}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="bio"
                      className="form-control"
                      placeholder="Bio *"
                      rows="10"
                      value={this.state.bio}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <input type="submit" className="btnSubmit" value="Add" />
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default AuthorForm;
