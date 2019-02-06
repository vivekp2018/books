import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Error from "../Error";

const PUBLISHER_MUTATION = gql`
  mutation createPublisher($name: String!, $description: String!) {
    createPublisher(data: { name: $name, description: $description }) {
      id
      name
    }
  }
`;
class PublisherForm extends Component {
  state = {
    name: "",
    description: ""
  };
  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Mutation mutation={PUBLISHER_MUTATION} variables={this.state}>
        {(createPublisher, { data, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <div className="container publisher">
              <h3>Add Publisher</h3>
              <hr />
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await createPublisher();
                  this.setState({
                    name: "",
                    description: ""
                  });
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <Error error={error} />
                  {data && data.createPublisher && data.createPublisher.id && (
                    <p className="alert alert-warning">
                      Publisher created successfully
                    </p>
                  )}
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Publisher Name *"
                      value={this.state.name}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Description *"
                      name="description"
                      rows="10"
                      value={this.state.description}
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

export default PublisherForm;
