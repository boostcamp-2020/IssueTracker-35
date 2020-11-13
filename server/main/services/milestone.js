const { Milestone } = require('@/models');

class MilestoneService {
  constructor(Milestone) {
    this.Milestone = Milestone;
  }

  async getTotalCount() {
    try {
      const milestoneCount = await this.Milestone.count({});
      return milestoneCount;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new MilestoneService(Milestone);
