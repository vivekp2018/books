import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/portfolio.css";

import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";

const client = new ApolloClient({
  uri: process.env.REACT_APP_URI,
  credentials: "include",
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      }
    });
  }
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
