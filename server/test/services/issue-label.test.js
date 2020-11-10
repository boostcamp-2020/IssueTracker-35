const TIMEOUT = 10000;

const { issueLabelService } = require('@/services/index');
const { expectedLabels } = require('@test/seeds/label');

describe('labels for all issue', () => {
  test(
    'get labels',
    async () => {
      // given
      const expectedLabel = expectedLabels[0];

      // when
      const issueLabels = await issueLabelService.getLabels();

      // then
      expect(issueLabels[0].label_id).toBe(expectedLabel.id);
      expect(issueLabels[0].Label.title).toBe(expectedLabel.title);
      expect(issueLabels[0].Label.color).toBe(expectedLabel.color);
    },
    TIMEOUT
  );
});

describe('create issue label', () => {
  test('valid data', async () => {
    //given
    const issueID = 3;
    const labels = ['1'];

    //when
    const result = await issueLabelService.create(issueID, labels);

    //then
    expect(result).toBeTruthy();
  });
});
