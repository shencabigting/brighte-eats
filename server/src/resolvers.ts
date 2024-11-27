import { Transaction } from 'sequelize';
import sequelize from './sequelize.js';
import User from './models/User.js';
import Lead from './models/Lead.js';

export const resolvers = {
    Query: {
        users: async () => {
            const users = await User.findAll();
            return users;
        },
        user: async (_, { id }) => {
            const user = await User.findOne({
                where: { id: id }
            });
            return user;
        },
        leads: async () => {
            const services = {};
            const leads = await Lead.findAll({
                raw: true,
                attributes: [
                    'service',
                    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
                ],
                group: ['service'],
            });

            return leads;
        },
        lead: async(_, { service }) => {
            const leads = await Lead.findAll({
                where: { service: service },
                include: [{
                    model: User,
                    required: false
                }],
                raw: true,
            });

            const lead = {
                service: service,
                count: leads.length,
                users: leads.map(x => {
                    return {
                        id: x['User.id'],
                        name: x['User.name'],
                        email: x['User.email'],
                        mobile: x['User.mobile'],
                        postcode: x['User.postcode'] || 'undisclosed',
                    }
                }),
            };

            return lead;
        },
    },
    Mutation: {
        register: async (_, { input }) => {
            const {
                name,
                email,
                mobile,
                postcode,
                services
            } = input;

            try {
                // Use transaction since we're inserting into 2 diff tables
                const t: Transaction = await sequelize.transaction();
                const user = await User.create({
                    name: name,
                    email: email,
                    mobile: mobile,
                    postcode: postcode,
                }, { transaction: t });

                for (let service of services) {
                    await Lead.create({
                        user: user.id,
                        service: service,
                    }, { transaction: t });
                }

                // If the execution reaches this line, no errors were thrown.
                // We commit the transaction.
                await t.commit();

                return Object.assign(user, {services: services});
            }
            catch(err) {
                // Check for Unique Constraint Error (for duplicate email or mobile)
                if (err.name == 'SequelizeUniqueConstraintError') {
                    throw new Error('Email or mobile already registered.');
                }

                throw new Error('Failed to register new user preference.');
            }
        }
    },
};
