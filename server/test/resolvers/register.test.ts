import sequelize from '../../src/sequelize';
import User from '../../src/models/User';
import Lead from '../../src/models/Lead';
import { resolvers } from '../../src/resolvers';

const register = resolvers.Mutation.register;
const mockTransaction:any = {
    commit: jest.fn(),
    rollback: jest.fn(),
};
let mockInput: {
    name: string
    email: string
    mobile: string
    postcode: string
    services: [string]
};

describe('register mutation', () => {
    beforeEach(() => {
        // Use spyOn to only mock the transaction method and return the mock transaction
        jest.spyOn(sequelize, 'transaction').mockImplementation(() => mockTransaction);
        // Mock create functions of User and Lead models
        User.create = jest.fn();
        Lead.bulkCreate = jest.fn().mockResolvedValue({});

        mockInput = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            mobile: '1234567890',
            postcode: '0000',
            services: ['PICKUP']
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a user successfully', async () => {
        const mockUser = { id: 1, ...mockInput };
        (User.create as jest.Mock).mockResolvedValue(mockUser);
        
        // Call register mutation
        const result = await register({}, { input: mockInput });
        delete mockInput.services;
    
        // Assert database call and result
        expect(User.create).toHaveBeenCalledWith(mockInput, { transaction: mockTransaction });
        // Assert that Lead.bulkCreate have been called the same number of times as there are services in user's selection
        expect(Lead.bulkCreate).toHaveBeenCalledWith([{ user: 1, service: 'PICKUP' }], { transaction: mockTransaction });
        expect(result).toEqual(Object.assign(mockUser));
    });

    it('should throw generic error if call to sequelize.transaction throws an error', async () => {
        // Mock create.function to throw a generic error
        sequelize.transaction = jest.fn().mockRejectedValue(new Error('Error'));

        // Call register mutation and
        // assert that register rejects with the expected error
        await expect(register(null, { input: mockInput })).rejects.toThrow('Failed to register new user preference.');;
    
        // Assert that the model create functions have not been called
        expect(User.create).toHaveBeenCalledTimes(0);
        expect(Lead.bulkCreate).toHaveBeenCalledTimes(0);
    });

    it('should throw correct error if call to User.create throws SequelizeUniqueConstraintError', async () => {
        // Mock User.create to throw SequelizeUniqueConstraintError error
       (User.create as jest.Mock).mockRejectedValue({name: 'SequelizeUniqueConstraintError'});

        // Call register mutation and
        // assert that register rejects with the expected error
        await expect(register(null, { input: mockInput })).rejects.toThrow('Email or mobile already registered.');;
    
        delete mockInput.services;
        // Assert that User.create has been called with the correct parameters
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledWith(mockInput, { transaction: mockTransaction });
        
        // Assert that Lead.bulkCreate has not been called
        expect(Lead.bulkCreate).toHaveBeenCalledTimes(0);
    });

    it('should throw generic error if call to User.create throws an error', async () => {
        // Mock the create function to throw a generic error
       (User.create as jest.Mock).mockRejectedValue(new Error('Error'));

        // Call register mutation and
        // assert that register rejects with the expected error
        await expect(register(null, { input: mockInput })).rejects.toThrow('Failed to register new user preference.');;
    
        delete mockInput.services;
        // Assert that User.create has been called with the correct parameters
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledWith(mockInput, { transaction: mockTransaction });
        
        // Assert that Lead.bulkCreate has not been called
        expect(Lead.bulkCreate).toHaveBeenCalledTimes(0);
    });

    it('should throw generic error if call to Lead.bulkCreate throws an error', async () => {
        const mockUser = { id: 1, ...mockInput };
        (User.create as jest.Mock).mockResolvedValue(mockUser);

        // Mock the Lead.bulkCreate to throw a generic error
        (Lead.bulkCreate as jest.Mock).mockRejectedValue(new Error('Error'));

        // Call register mutation and
        // assert that register rejects with the expected error
        await expect(register(null, { input: mockInput })).rejects.toThrow('Failed to register new user preference.');;
    
        delete mockInput.services;
        // Assert that User.create has been called with the correct parameters
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledWith(mockInput, { transaction: mockTransaction });
        
        // Assert that Lead.bulkCreate have been called only once
        expect(Lead.bulkCreate).toHaveBeenCalledWith([{ user: 1, service: 'PICKUP' }], { transaction: mockTransaction });
    });
});