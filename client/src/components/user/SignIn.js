import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";
import { CURRENT_USER_QUERY } from "./User";
import Error from "../Error";
const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        id
        email
      }
      token
    }
  }
`;

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
    // console.log(this.state);
  };

  /* */
  render() {
    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(login, { error, loading }) => (
          <div className="container signin">
            <h3>Login Now</h3>
            <hr />

            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await login();
                navigate(`/`);
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <Error error={error} />
                <div className="form-group">
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Your Email *"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Your Password *"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btnSubmit">
                    Sign In!
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default SignIn;
