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
      const assignees = await assignmentService.getAssigneesByAllIssues();
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
      const comments = await commentService.getCommentCount();
      comments.rows.forEach(comment => {
        const issueID = comment.issue_id;
        const count = comment.dataValues.comment_count;
        issues.forEach(issue => {
          if (issue.id === issueID) {
            issue.dataValues.commentCount = count;
          }
        });
      });

      // api response에 맞추어 issue들을 array로 변환
      const data = { issues: Object.values(issues) };

      responseHandler(res, 200, data);
    } catch (err) {
      next(err);
    }
  }

  async getIssueDetails(req, res, next) {
    const { issueID } = req.params;
    try {
      const { issue } = req.body;
      IssueController._initIssueDetailResponseResults(issue, issueID);

      const labels = await issueLabelService.getLabelsByIssueId(issueID);
      const assignees = await assignmentService.getAssigneesByIssue(issueID);
      const comments = await commentService.getCommentsByIssueID(issueID);

      IssueController._setIssueDetailResponseResults(
        issue,
        labels,
        assignees,
        comments
      );

      responseHandler(res, 200, { issue: issue });
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
      await commentService.createIssue(content, issueID, userID, transaction);
      await assignmentService.create(issueID, assignees, transaction);
      await issueLabelService.create(issueID, labels, transaction);

      await transaction.commit();
      responseHandler(res, 200, { id: issueID });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }

  async isValidIssueID(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    const { issueID } = req.params;
    if (!issueID) {
      return next(err);
    }
    const issue = await issueService.retrieveById(issueID);
    if (!issue) {
      return next(err);
    }
    req.body.issue = issue;
    next();
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
    // 내부 type 체크
    if (array.length !== 0) {
      return !array.some(value => !parseInt(value)); // issue 생성시 array로 받는 내부 값들은 id값(int형)
    }
    return true;
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
        origin.forEach(originObject => {
          if (originObject.id === issue_id) {
            originObject.dataValues[originKey].push(
              targetObject.dataValues[targetKey]
            );
          }
        });
      });
    };
  }
  static async _initIssueDetailResponseResults(issue) {
    convertObjectKeys(issue)('User', 'author');
    convertObjectKeys(issue)('is_open', 'isOpen');
    convertObjectKeys(issue)('Milestone', 'milestone');
    issue.dataValues.labels = [];
    issue.dataValues.assignees = [];
    issue.dataValues.comments = [];
  }
  static _setIssueDetailValues(issue, objectArray) {
    return (issueKey, targetKey) => {
      objectArray.forEach(data => {
        issue.dataValues[issueKey].push(data[targetKey]);
      });
    };
  }
  static _setIssueDetailResponseResults(issue, labels, assignees, comments) {
    // labels, assigness 붙여주는 작업
    IssueController._setIssueDetailValues(issue, labels)('labels', 'Label');
    IssueController._setIssueDetailValues(issue, assignees)(
      'assignees',
      'User'
    );

    // author 객체 내부의 nickname 빼오는 작업
    const author = issue.dataValues.author.nickname;
    issue.dataValues.author = author;

    //comment를 붙여주는 작업
    comments.forEach(comment => {
      convertObjectKeys(comment)('User', 'owner'); //owner로 수정
    });
    issue.dataValues.comments = comments;
  }
}

module.exports = new IssueController();
