const TIMEOUT = 10000;

const { labelService } = require('@/services/index');
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
  test('retrieve all labels', async () => {
    //given
    //when
    const labels = await labelService.getAllLabels();
    const recievedLabels = labels.map(label => {
      const copy = Object.assign({}, label.dataValues);
      return copy;
    });

    //then
    expect(recievedLabels).toStrictEqual(expectedLabels);
  });
});
