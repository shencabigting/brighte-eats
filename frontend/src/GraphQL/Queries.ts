import { gql } from '@apollo/client';

export const LEADS = gql`
    query Leads {
        leads {
            id
            name
            email
            mobile
        }
    }
`;
