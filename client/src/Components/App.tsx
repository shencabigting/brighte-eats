import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetLeads from "./GetLeads";
import GetLead from "./GetLead";
import GetUsers from "./GetUsers";
import GetUser from "./GetUser";
import RegisterForm from "./RegisterForm";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`GraphQL Error: ${message}`);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000" })]);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/lead/:service" element={<LeadPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

const RegistrationPage: React.FC = () => (
  <div>
    <RegisterForm />
    <Link to="/leads">Go to Leads Page</Link>
  </div>
);

const LeadsPage: React.FC = () => (
  <div>
    <GetLeads />
    <div style={{ textAlign: "center" }}>
      <Link to="/">Go back to registration page</Link>
    </div>
  </div>
);

const LeadPage: React.FC = () => (
  <div>
    <GetLead />
    <div style={{ textAlign: "center" }}>
      <Link to="/leads">Go back to leads page</Link>
    </div>
  </div>
);

const UsersPage: React.FC = () => (
  <div>
    <GetUsers />
    <div style={{ textAlign: "center" }}>
      <Link to="/">Go back to registration page</Link>
    </div>
  </div>
);

const UserPage: React.FC = () => (
  <div>
    <GetUser />
    <div style={{ textAlign: "center" }}>
      <Link to="/users">Go back to users page</Link>
    </div>
  </div>
);

export default App;
