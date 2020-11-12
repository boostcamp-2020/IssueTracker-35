const TIMEOUT = 10000;

const { issueLabelService } = require('@/services/index');
const { expectedLabels } = require('@test/seeds/label');

describe('retrieve labels', () => {
  test(
    'get labels for all issues',
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
  test('get labels for a issue with valid issueID', async () => {
    // given
    const issueID = 3;

    const expectedData = expectedLabels.map(label => {
      const copy = { ...label };
      delete copy.content;
      return copy;
    });

    //when
    const issueLabels = await issueLabelService.getLabelsByIssueId(issueID);

    //then
    expect(issueLabels.length).not.toBe(0);
    issueLabels.forEach(issueLabel => {
      const expectedId = issueLabel.Label.id;
      const expectedLabel = expectedData.find(label => label.id === expectedId);
      expect(issueLabel.Label.dataValues).toStrictEqual(expectedLabel);
    });
  });
  test('get labels for a issue with invalid issueID', async () => {
    // given
    const issueID = 99999;

    //when
    const issueLabels = await issueLabelService.getLabelsByIssueId(issueID);

    //then
    expect(issueLabels.length).toBe(0);
  });
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

describe('remove labels associated with issue id', () => {
  test('valid issueID', async () => {
    //given
    const issueID = 1;
    const labels = [1];
    const insertResult = await issueLabelService.create(issueID, labels);
    expect(insertResult).toBeTruthy();

    //when
    const removed = await issueLabelService.removeAllByIssueID(issueID);

    //then
    expect(removed).toBeGreaterThan(0);
  });
  test('invalid issueID', async () => {
    //given
    const issueID = 99999;

    //when
    const removed = await issueLabelService.removeAllByIssueID(issueID);
    //then
    expect(removed).toBe(0);
  });
});
