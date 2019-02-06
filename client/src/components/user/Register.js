import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $firstName: string!
    $lastName: String!
    $email: String!
    $passsword: String!
  ) {
    signUp(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $passsword
      }
    ) {
      token
    }
  }
`;

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signUp, { error, loading }) => {
          return (
            <div className="container register">
              <h3>Sign In</h3>
              <hr />

              <div className="d-flex flex-column align-items-center">
                <form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault();
                    if (this.state.password !== this.state.confirmPassword) {
                      throw new Error("password not matching");
                    }
                    await signUp();
                  }}
                >
                  {error && <div className="form-group">{error.message}</div>}
                  <div className="form-group">
                    <input
                      name="firstName"
                      type="text"
                      className="form-control"
                      placeholder="Your First Name *"
                      onChange={this.saveToState}
                      value={this.state.name}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Your Last Name *"
                      value={this.state.lastName}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email *"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Your Password *"
                      value={this.state.password}
                      onChange={this.saveToState}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btnSubmit"
                      value="Sign In"
                    />
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default Register;
