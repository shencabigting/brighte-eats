import { gql } from '@apollo/client';

export const LEADS = gql`
    query Leads {
        leads {
            id
            name
            email
            mobile
            postcode
            services
        }
    }
`;

export const LEAD = gql`
    query Lead($leadId: ID!) {
        lead(id: $leadId) {
            name,
            email,
            mobile,
            postcode,
            services
        }
}
`;
