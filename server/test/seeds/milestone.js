const { Milestone } = require('@/models');

const milestones = [
  {
    id: 1,
    title: 'sprint 2',
    content: '제발 전체 issue 조회 하자!',
  },
];

const expectedMilestones = milestones;

const initMilestones = async () => {
  await Milestone.bulkCreate(milestones);
};

const finiMilestones = async () => {
  await Milestone.destroy({ where: {} });
};

module.exports = { initMilestones, finiMilestones, expectedMilestones };
