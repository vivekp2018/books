import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "../components/layout/Header";
import Page from "../components/layout/Page";
import SignIn from "../components/user/SignIn";
import Register from "./user/Register";
import BookForm from "./Book/BookForm";
import AuthorForm from "./Author/AuthorForm";
import PublisherForm from "./Publisher/PublisherForm";
import AuthRoute from "./user/AuthRoute";
import BookDetails from "./Book/BookDetails";
import PublisherBooks from "./Publisher/PublisherBooks";
import AuthorBooks from "./Author/AuthorBooks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Router>
          <Page path="/" />
          <SignIn path="/signin" />
          <Register path="/signup" />
          <BookDetails path="/book/:bookId" />
          <PublisherBooks path="/publisher/:publisherId" />
          <AuthRoute path="/books" render={<BookForm />} />
          <AuthorBooks path="/author/:authorId" />

          <AuthRoute path="/authors" render={<AuthorForm />} />
          <AuthRoute path="/publishers" render={<PublisherForm />} />
        </Router>
      </div>
    );
  }
}

export default App;
