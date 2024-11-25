import User from '../../src/models/User';
import { resolvers } from '../../src/resolvers';

jest.mock('../../src/models/User');

beforeEach(() => {
    jest.resetAllMocks();
});

describe('register Mutation', () => {
    it('should create a user successfully', async () => {
        // Mock input and database response
        const mockInput = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            mobile: '1234567890',
            postcode: '0000',
            services: ['PICKUP']
        };
        const mockUser = { id: 1, ...mockInput };

        // Mock the create function
        (User.create as jest.Mock).mockResolvedValue(mockUser);
    
        // Call resolver
        const result = await resolvers.Mutation.register(null, { input: mockInput });
    
        // Assert database call and result
        expect(User.create).toHaveBeenCalledWith(Object.assign(mockInput, {services: JSON.stringify(mockInput.services)}));
        expect(result).toEqual(mockUser);
      });
});
