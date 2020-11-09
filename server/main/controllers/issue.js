const { responseHandler, errorHandler } = require('@/utils/handler');
const issueService = require('@/services/issue');
const assignmentService = require('@/services/assignment');
const issueLabelService = require('@/services/issue-label');
const labelService = require('@/services/label');
const commentService = require('@/services/comment');
const milestoneService = require('@/services/milestone');
const { initGetAllIssuesResponse, setResultValueByIssueID } = require('@/utils/util');

class IssueController {
  async getAllIssues(req, res) {
    try {
      const basicIssues = await issueService.retrieveAll();
      initGetAllIssuesResponse(basicIssues); // response에 담겨야할 key 생성 및 camel case로 전환

      // Assignees 등록
      const assignees = await assignmentService.getAssignees();
      setResultValueByIssueID(basicIssues, assignees)('assignees', 'User');
      // Label 등록
      const issueLabels = await issueLabelService.getLabels();
      setResultValueByIssueID(basicIssues, issueLabels)('labels', 'Label');
      // Comment count 등록
      const commentCounts = await commentService.getCommentCount();
      setResultValueByIssueID(basicIssues, commentCounts.rows)('commentCount', 'comment_count');

      // api response에 맞추어 issue들을 array로 변환
      const issues = { issues: Object.values(basicIssues) };
      // milestone, label count 등록
      issues.label_count = await labelService.getTotalCount();
      issues.milestone_count = await milestoneService.getTotalCount();
      responseHandler(res, 200, issues);
    } catch (err) {
      errorHandler(res, 500, 'internal server error');
    }
  }
}

module.exports = new IssueController();
