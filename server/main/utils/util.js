exports.initGetAllIssuesResponse = object => {
  object.forEach(issue => {
    // convert key to API key
    this.convertObjectKeys(issue)('is_open', 'isOpen');
    this.convertObjectKeys(issue)('User', 'author');
    this.convertObjectKeys(issue)('Milestone', 'milestone');
    if (!issue.dataValues.milestone) {
      issue.dataValues.milestone = new Array(); // null to Array
    }
    // make API keys
    issue.dataValues.assignees = [];
    issue.dataValues.labels = [];
    issue.dataValues.commentCount = 0;
  });
};

exports.convertObjectKeys = object => {
  return (oldKey, newKey) => {
    Object.defineProperty(
      object.dataValues,
      newKey,
      Object.getOwnPropertyDescriptor(object.dataValues, oldKey)
    );
    delete object.dataValues[oldKey];
  };
};

exports.setResultValueByIssueID = (origin, target) => {
  return (originKey, targetKey) => {
    target.forEach(targetObject => {
      const { issue_id } = targetObject;
      if (origin[issue_id]) {
        origin[issue_id].dataValues[originKey] =
          targetObject.dataValues[targetKey];
      }
    });
  };
};
// Object.keys(basicIssues).forEach(key => {
//   Object.defineProperty(basicIssues[key].dataValues, 'Author', Object.getOwnPropertyDescriptor(basicIssues[key].dataValues, 'User'));
//   delete basicIssues[key].dataValues.User;
// });
