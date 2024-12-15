import User from '../../src/models/User';

let mockData: {
    name: string
    lastname: string
    email: string
    mobile: string
    postcode: string
};

describe('User model validations', () => {
    beforeEach(() => {
        mockData = {
            name: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            mobile: '1234567890',
            postcode: '0000',
        };
    });

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

    describe('lastname field validations', () => {
        it('should throw an error if lastname is null', async () => {
            try {
                delete mockData.lastname;
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('User.lastname cannot be null');
            }
        });

        it('should throw an error if lastname is empty string', async () => {
            try {
                mockData.lastname = '';
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('Validation notEmpty on lastname failed');
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

        it('should throw an error if email is not of valid format', async () => {
            try {
                mockData.email = 'john.doe@example';
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('Validation isEmail on email failed');
            }
        });
    });

    describe('mobile field validations', () => {
        it('should not throw an error if mobile is null', async () => {
            try {
                delete mockData.mobile;
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBe(undefined);
            }
        });

        it('should throw an error if mobile is not of valid format', async () => {
            try {
                mockData.mobile = 'ABC';
                await User.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('Validation is on mobile failed');
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
                expect(error.errors[0].message).toBe('Validation isNumeric on postcode failed');
            }
        });
    });
});