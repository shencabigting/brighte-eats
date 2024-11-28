import Lead from '../../src/models/Lead';

let mockData: {
    user: number
    service: string
};

beforeEach(() => {
    mockData = {
        user: 1,
        service: 'PICKUP',
    };
});

describe('User model validations', () => {
    describe('user field validations', () => {
        it('should throw an error if user is null', async () => {
            try {
                delete mockData.user;
                await Lead.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('Lead.user cannot be null');
            }
        });
    });

    describe('service field validations', () => {
        it('should throw an error if service is null', async () => {
            try {
                delete mockData.service;
                await Lead.build(mockData).validate();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.errors[0].message).toBe('Lead.service cannot be null');
            }
        });
    });
});