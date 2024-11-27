import User from '../../src/models/User';

let mockData: {
    name: string
    email: string
    mobile: string
    postcode: string
};

beforeEach(() => {
    mockData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        postcode: '0000',
    };
});

describe('User model validations', () => {
    describe('name field validations', () => {
        it('should throw an error if name is null', async () => {
            try {
                delete mockData.name;
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('User.name cannot be null');
            }
        });

        it('should throw an error if name is empty string', async () => {
            try {
                mockData.name = '';
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('Validation notEmpty on name failed');
            }
        });
    });

    describe('email field validations', () => {
        it('should throw an error if email is null', async () => {
            try {
                delete mockData.email;
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('User.email cannot be null');
            }
        });

        it('should throw an error if email is empty string', async () => {
            try {
                mockData.email = '';
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('Validation notEmpty on email failed');
            }
        });
    });

    describe('postcode field validations', () => {
        it('should not throw an error if postcode is null', async () => {
            try {
                delete mockData.postcode;
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBe(undefined);
            }
        });

        it('should throw an error if postcode is not an integer value', async () => {
            try {
                mockData.postcode = 'ABC';
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('Validation isInt on postcode failed');
            }
        });
    });
});