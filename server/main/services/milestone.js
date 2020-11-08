const { Milestone } = require('@/models');

class MilestoneService {
  constructor(Milestone) {
    this.Milestone = Milestone;
  }

  async getTotalCount() {
    const milestoneCount = await this.Milestone.count({});
    return milestoneCount;
  }
}

module.exports = new MilestoneService(Milestone);
