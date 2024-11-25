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
        register: async (parent, args, context) => {
            const {
                input: {
                    name,
                    email,
                    mobile,
                    postcode,
                    services
                }
            } = args;

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
                if (err.name == 'SequelizeUniqueConstraintError') {
                    throw new Error('Email or mobile already registered.');
                }
            }
        }
    },
};
