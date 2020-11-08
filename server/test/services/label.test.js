const TIMEOUT = 10000;

const labelService = require('@/services/label');
const { expectedLabels } = require('@test/seeds/label');

describe('Total Labels', () => {
  test(
    'total count',
    async () => {
      // when
      const labelCount = await labelService.getTotalCount();

      // then
      expect(labelCount).toBe(expectedLabels.length);
    },
    TIMEOUT
  );
});
