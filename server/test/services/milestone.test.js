const TIMEOUT = 10000;

const milestoneService = require('@/services/milestone');
const { expectedMilestones } = require('@test/seeds/milestone');

describe('Total Milestones', () => {
  test(
    'total count',
    async () => {
      // when
      const milestoneCount = await milestoneService.getTotalCount();

      // then
      expect(milestoneCount).toBe(expectedMilestones.length);
    },
    TIMEOUT
  );
});
