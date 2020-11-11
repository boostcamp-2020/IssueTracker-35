const TIMEOUT = 10000;

const { issueLabelService } = require('@/services/index');
const { expectedLabels } = require('@test/seeds/label');

describe('retrieve labels', () => {
  test(
    'get labels for all issue',
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
    const expectedDatas = [...expectedLabels].reduce((acc, label, idx) => {
      acc[idx] = Object.assign({}, label);
      delete acc[idx].content;
      return acc;
    }, []);

    //when
    const issueLabels = await issueLabelService.getLabelsByIssueId(issueID);

    //then
    issueLabels.forEach(issueLabel =>
      expect(
        expectedDatas.some(expectedData => {
          if (
            JSON.stringify(issueLabel.Label) === JSON.stringify(expectedData)
          ) {
            return true;
          }
        })
      ).toBeTruthy()
    );
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
