import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { Box, Link } from "@mui/material";
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
          <Route path="/lead/:service" element={<LeadPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

const RegistrationPage: React.FC = () => (
  <div>
    <RegisterForm />
    <div style={{ textAlign: "center" }}>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Link href="/leads" underline="hover">Go to leads page</Link>
      </Box>
    </div>
  </div>
);

const LeadsPage: React.FC = () => (
  <div>
    <GetLeads />
    <div style={{ textAlign: "center" }}>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Link href="/">Go back to registration page</Link>
      </Box>
    </div>
  </div>
);

const LeadPage: React.FC = () => (
  <div>
    <GetLead />
    <div style={{ textAlign: "center" }}>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Link href="/leads">Go back to leads page</Link>
      </Box>
    </div>
  </div>
);

export default App;
