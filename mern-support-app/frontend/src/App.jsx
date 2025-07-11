import React from "react";
import { Route, Switch } from "react-router-dom";
import IssueForm from "./components/IssueForm";
import PaymentIssueForm from "./components/PaymentIssueForm";
import PaymentDetailsForm from "./components/PaymentDetailsForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Switch>
          <Route exact path="/" component={IssueForm} />
          <Route path="/payment-issue" component={PaymentIssueForm} />
          <Route path="/payment-details" component={PaymentDetailsForm} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
