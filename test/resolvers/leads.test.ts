import User from '../../src/models/User';
import { resolvers } from '../../src/resolvers';

jest.mock('../../src/models/User');

let leads: any;
let mockData: {
    name: string
    email: string
    mobile: string
    postcode: string
    services: string[]
}[];

beforeEach(() => {
    jest.resetAllMocks();

    leads = resolvers.Query.leads;
    mockData = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            mobile: '1234567890',
            postcode: '0000',
            services: ['PICKUP']
        },
        {
            name: 'John Smith',
            email: 'john.smith@example.com',
            mobile: '1234567890',
            postcode: '0001',
            services: ['PICKUP','DELIVERY']
        }
    ];
});

describe('leads Query', () => {
    it('should return a complete list of users', async () => {
        const mockId = 1;
        const mockUsers = mockData.map((x, i) => Object.assign(x, {id: i}));

        // Mock the create function to resolve with the mock data
        (User.findAll as jest.Mock).mockResolvedValue(mockUsers);
    
        // Call leads query
        const result = await leads();
    
        // Assert database call and result
        expect(User.findAll).toHaveBeenCalledWith();
        expect(result).toEqual(mockUsers);
    });
});
