const { Label } = require('@/models');

const expectedLabels = [
  {
    id: 1,
    title: '개똥벌레',
    content: '나는 개똥벌레',
    color: 'CDAA7D',
  },
  {
    id: 2,
    title: '배고픔',
    content: '졸리기도 하고',
    color: 'FFFFFF',
  },
];

const initLabels = async () => {
  await Label.bulkCreate(expectedLabels);
};

const finiLabels = async () => {
  await Label.destroy({ where: {} });
};

module.exports = { initLabels, finiLabels, expectedLabels };
