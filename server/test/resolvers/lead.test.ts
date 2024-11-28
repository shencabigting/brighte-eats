import Lead from '../../src/models/Lead';
import User from '../../src/models/User';
import { resolvers } from '../../src/resolvers';

const lead = resolvers.Query.lead;
const service = 'PICKUP';
const mockData = [
    {
        user: 1,
        service,
        'User.id': 1,
        'User.name': 'John Doe',
        'User.email': 'john.doe@example.com',
        'User.mobile': '1234567890',
        'User.postcode': '0000',
    },
    {
        user: 2,
        service,
        'User.id': 2,
        'User.name': 'John Smith',
        'User.email': 'john.smith@example.com',
        'User.mobile': '1234567891',
        'User.postcode': null,
    },
];

describe('leads Query', () => {
    beforeEach(() => {
        // Mock Lead.findAll
        Lead.findAll = jest.fn().mockResolvedValue(mockData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return complete data', async () => {
        // Call leads query
        const result = await lead({}, { service });
    
        const queryParams = {
            where: { service },
            include: [{
                model: User,
                required: false
            }],
            raw: true,
        };

        const mockResult = {
            service,
            count: mockData.length,
            users: mockData.map(x => {
                return {
                    id: x['User.id'],
                    name: x['User.name'],
                    email: x['User.email'],
                    mobile: x['User.mobile'],
                    postcode: x['User.postcode'] || 'undisclosed',
                }
            }),
        };

        // Assert that Lead.findall has been called with the correct parameters
        expect(Lead.findAll).toHaveBeenCalledWith(queryParams);
        expect(result).toEqual(mockResult);
    });
});