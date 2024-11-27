import User from '../../src/models/User';
import { resolvers } from '../../src/resolvers';

jest.mock('../../src/models/User');

let user: any;
let mockData: {
    name: string
    email: string
    mobile: string
    postcode: string
    services: string[]
};

beforeEach(() => {
    jest.resetAllMocks();

    user = resolvers.Query.user;
    mockData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        postcode: '0000',
        services: ['PICKUP']
    };
});

describe('user Query', () => {
    it('should return a user successfully', async () => {
        const mockId = 1;
        const mockUser = { id: mockId, ...mockData };

        // Mock the create function to resolve with the inputed data and an ID
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    
        // Call lead query
        const result = await user(null, { id: mockId });
    
        // Assert database call and result
        expect(User.findOne).toHaveBeenCalledWith({ where: { id: mockId } });
        expect(result).toEqual(mockUser);
    });
});