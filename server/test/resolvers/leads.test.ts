import Lead from '../../src/models/Lead';
import { resolvers } from '../../src/resolvers';

const leads = resolvers.Query.leads;
const mockData = [
    {
        service: 'PICKUP',
        count: 1
    },
    {
        service: 'DELIVERY',
        count: 2
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
        const result = await leads();
    
        // Assert that Lead.findall has been called
        expect(Lead.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockData);
    });
});
