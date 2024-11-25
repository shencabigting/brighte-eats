// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register($input: registerUserInput!) {
    register(input: $input) {
        id
        name
        email
        mobile
    }
  }
`;