// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

enum Service {
    DELIVERY
    PICKUP
    PAYMENT
}

# this "User" type defines the queryable fields for every user in our database
type User {
    id: ID!
    name: String
    email: String
    mobile: String
    postcode: String
    services: [Service]
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
    leads: [User],
    lead(id: ID!): User,
}

input registerUserInput {
    name: String!
    email: String!
    mobile: String
    postcode: String
    services: [Service]!
}

type Mutation {
    register(input: registerUserInput!): User
}
`;
