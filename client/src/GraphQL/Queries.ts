import { gql } from '@apollo/client';

export const LEADS = gql`
    query Leads {
        leads {
            service
            count
        }
    }
`;

export const LEAD = gql`
    query Lead($service: Service!) {
        lead(service: $service) {
            service
            count
            users {
                email
                id
                mobile
                name
                lastname
                postcode
            }
        }
}
`;

export const USERS = gql`
    query Users {
        users {
            id
            name
            email
            mobile
            postcode
            services
        }
    }
`;

export const USER = gql`
    query User($userId: ID!) {
        user(id: $userId) {
            name,
            email,
            mobile,
            postcode,
            services
        }
}
`;
