const { responseHandler } = require('@/utils/handler');
const {
  issueService,
  assignmentService,
  issueLabelService,
  commentService,
} = require('@/services/index');

const { convertObjectKeys } = require('@/utils/api');
const { sequelize } = require('@/models');

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
    const transaction = await sequelize.transaction();
    try {
      const { title, assignees, content, labels, milestone } = req.body;
      const { user } = req;

      const userID = user.id;

      const issueID = await issueService.createIssue(
        title,
        userID,
        milestone[0],
        transaction
      );
      await commentService.createIssue(
        content,
        userID,
        milestone[0],
        transaction
      );
      await assignmentService.create(issueID, assignees, transaction);
      await issueLabelService.create(issueID, labels, transaction);

      await transaction.commit();
      responseHandler(res, 200, { id: issueID });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }
  isValidParams(req, res, next) {
    const err = new Error('Bad Request');
    err.status = 400;

    const { title, content, assignees, labels, milestone } = req.body;

    if (typeof title !== 'string' || title === '') {
      return next(err);
    }
    if (content && typeof content !== 'string') {
      return next(err);
    }
    if (!IssueController._isValidArrayCondition(assignees)) {
      return next(err);
    }
    if (!IssueController._isValidArrayCondition(labels)) {
      return next(err);
    }
    if (!IssueController._isValidArrayCondition(milestone)) {
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
      return !array.some(value => !parseInt(value)); // issue 생성시 array로 받는 내부 값들은 id값(int형)
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
