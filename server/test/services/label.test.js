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

describe('Create Label', () => {
  test('valid data', async () => {
    // given
    const expectedLabel = {
      title: 'label 생성!!',
      content: '나는 개똥벌레22',
      color: 'FE2E2E',
    };

    // when
    const label = await labelService.create(expectedLabel);

    // then
    Object.keys(expectedLabel).forEach(key =>
      expect(label.dataValues[key]).toBe(expectedLabel[key])
    );
    expect(label.id).toBeGreaterThanOrEqual(expectedLabels.length);
    await labelService.remove(label.id);
  });
  test('invalid title', async () => {
    // given
    const expectedLabel = {
      title: null,
      content: 'title 없어서 등록되면 안된다',
      color: 'FE2E2E',
    };

    // when, then
    await expect(labelService.create(expectedLabel)).rejects.toThrow();
  });
  test('invalid color', async () => {
    // given
    const expectedLabel = {
      title: 'color가 없는 테스트',
      content: '등록되면 안된다',
      color: null,
    };

    // when, then
    await expect(labelService.create(expectedLabel)).rejects.toThrow();
  });
});
