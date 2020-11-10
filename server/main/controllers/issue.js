const { responseHandler } = require('@/utils/handler');
const {
  issueService,
  assignmentService,
  issueLabelService,
  commentService,
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

      responseHandler(res, 200, data);
    } catch (err) {
      next(err);
    }
  }

  async createIssue(req, res, next) {
    try {
      const { title, assignees, content, labels, milestone } = req.body;
      const { user } = req;

      const userID = user.id;

      // issue 생성
      const issueID = await issueService.createIssue(
        title,
        userID,
        milestone[0]
      );

      // comment 생성 (issue), assignment, issue-label
      await Promise.all([
        commentService.createIssue(content, userID, milestone[0]),
        assignmentService.create(issueID, assignees),
        issueLabelService.create(issueID, labels),
      ]);

      responseHandler(res, 200, { id: issueID });
    } catch (err) {
      next(err);
    }
  }
  isValidParams(req, res, next) {
    const err = new Error('Bad Request');
    err.status = 400;

    const { title, content, assignees, labels, milestone } = req.body;

    if (typeof title !== 'string' || title === '') {
      return next(err);
    } else if (content && typeof content !== 'string') {
      return next(err);
    } else if (!IssueController._isValidArrayCondition(assignees)) {
      return next(err);
    } else if (!IssueController._isValidArrayCondition(labels)) {
      return next(err);
    } else if (!IssueController._isValidArrayCondition(milestone)) {
      return next(err);
    }
    return next();
  }
  static _isValidArrayCondition(array) {
    // array 타입 체크
    if (!Array.isArray(array)) {
      return false;
    }
    let result = true;
    // 내부 type 체크
    if (array.length !== 0) {
      array.forEach(value => {
        if (typeof value !== 'string') {
          result = false;
        }
      });
    }
    return result;
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
