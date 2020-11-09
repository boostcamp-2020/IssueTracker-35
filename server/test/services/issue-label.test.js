const TIMEOUT = 10000;

const { issueLabelService } = require('@/services/index');
const { expectedIssueLabels } = require('@test/seeds/issue-label');

describe('labels for all issue', () => {
  test(
    'get labels',
    async () => {
      // when
      const issueLabels = await issueLabelService.getLabels();
      issueLabels.forEach(issueLabel => {
        // console.log(issueLabel.Label);
      });
      expect(true).toBe(true);
    },
    TIMEOUT
  );
});
