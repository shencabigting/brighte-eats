import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
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
          <Route path="/lead/:id" element={<LeadPage />} />
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
    <Link to="/">Go back to registration page</Link>
  </div>
);

const LeadPage: React.FC = () => (
  <div>
    <GetLead />
    <Link to="/leads">Go back to leads page</Link>
  </div>
);

export default App;
