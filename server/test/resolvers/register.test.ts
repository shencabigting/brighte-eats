import User from '../../src/models/User';
import { resolvers } from '../../src/resolvers';

jest.mock('../../src/models/User');

let register: any;
let mockInput: {
    name: string
    email: string
    mobile: string
    postcode: string
    services: string[]
};

beforeEach(() => {
    jest.resetAllMocks();

    register = resolvers.Mutation.register;
    mockInput = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        postcode: '0000',
        services: ['PICKUP']
    };
});

describe('register Mutation', () => {
    it('should create a user successfully', async () => {
        const mockUser = { id: 1, ...mockInput };

        // Mock the create function to resolve with the inputed data and an ID
        (User.create as jest.Mock).mockResolvedValue(mockUser);
    
        // Call register mutation
        const result = await register(null, { input: mockInput });
    
        // Assert database call and result
        expect(User.create).toHaveBeenCalledWith(mockInput);
        expect(result).toEqual(mockUser);
    });

    it('should throw the corresponding error if duplicate error is encountered', async () => {
        // Mock the create function to throw a DUPLICATE error exception
        (User.create as jest.Mock).mockRejectedValue({name: 'SequelizeUniqueConstraintError'});

        // Call register mutation and
        // assert that register rejects with the expected error
        await expect(register(null, { input: mockInput })).rejects.toThrow('Email or mobile already registered.');;
    
        // Assert database call and result
        expect(User.create).toHaveBeenCalledWith(mockInput);
    });

    it('should throw generic error if any other error is encountered', async () => {
        // Mock the create function to throw a generic error
        (User.create as jest.Mock).mockRejectedValue(new Error('DB Error'));

        // Call register mutation and
        // assert that register rejects with the expected error
        await expect(register(null, { input: mockInput })).rejects.toThrow('Failed to register new user preference.');;
    
        // Assert database call and result
        expect(User.create).toHaveBeenCalledWith(mockInput);
    });
});
