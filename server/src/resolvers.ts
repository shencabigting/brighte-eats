import User from './models/User.js';

export const resolvers = {
    Query: {
        leads: async () => {
            const users = await User.findAll();
            return users;
        },
        lead: async (_, { id }) => {
            const user = await User.findOne({
                where: { id: id }
            });
            return user;
        } 
    },
    Mutation: {
        register: async (parent, { input }) => {
            const {
                name,
                email,
                mobile,
                postcode,
                services
            } = input;

            try {
                const user = await User.create({
                    name: name,
                    email: email,
                    mobile: mobile,
                    postcode: postcode,
                    services: JSON.stringify(services)
                });

                return user;
            }
            catch(err) {
                console.log("ERROR:", err); // remove later

                if (err.name == 'SequelizeUniqueConstraintError') {
                    throw new Error('Email or mobile already registered.');
                }

                throw new Error('Failed to register new user preference.');
            }
        }
    },
};
