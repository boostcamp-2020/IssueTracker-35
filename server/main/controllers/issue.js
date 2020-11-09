const { responseHandler } = require('@/utils/handler');
const {
  issueService,
  assignmentService,
  issueLabelService,
  labelService,
  commentService,
  milestoneService,
} = require('@/services/index');

const { convertObjectKeys } = require('@/utils/api');

class IssueController {
  async getAllIssues(req, res, next) {
    try {
      const issues = await issueService.retrieveAll();

      IssueController._initAllIssuesResponseResults(issues); // response에 담겨야할 key 생성 및 camel case로 전환
      // Assignees 등록
      const assignees = await assignmentService.getAssignees();
      IssueController._setValueByIssueID(issues, assignees)(
        'assignees',
        'User'
      );
      // Label 등록
      const issueLabels = await issueLabelService.getLabels();
      IssueController._setValueByIssueID(issues, issueLabels)(
        'labels',
        'Label'
      );
      // Comment count 등록
      const commentCounts = await commentService.getCommentCount();
      IssueController._setValueByIssueID(issues, commentCounts.rows)(
        'commentCount',
        'comment_count'
      );

      // api response에 맞추어 issue들을 array로 변환
      const data = { issues: Object.values(issues) };
      // milestone, label count 등록
      data.label_count = await labelService.getTotalCount();
      data.milestone_count = await milestoneService.getTotalCount();

      responseHandler(res, 200, data);
    } catch (err) {
      next(err);
    }
  }

  static _initAllIssuesResponseResults(objectArray) {
    objectArray.forEach(issue => {
      // convert key to API key
      convertObjectKeys(issue)('is_open', 'isOpen');
      convertObjectKeys(issue)('User', 'author');
      convertObjectKeys(issue)('Milestone', 'milestone');
      if (!issue.dataValues.milestone) {
        issue.dataValues.milestone = new Array(); // null to Array
      }
      // make API keys
      issue.dataValues.assignees = [];
      issue.dataValues.labels = [];
      issue.dataValues.commentCount = 0;
    });
  }
  static _setValueByIssueID(origin, target) {
    return (originKey, targetKey) => {
      target.forEach(targetObject => {
        const { issue_id } = targetObject;
        if (origin[issue_id]) {
          origin[issue_id].dataValues[originKey] =
            targetObject.dataValues[targetKey];
        }
      });
    };
  }
}

module.exports = new IssueController();
