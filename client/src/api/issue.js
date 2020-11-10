import { requestGET, requestPOST } from '@/api';

const GET_ALL_IESSUES_PATH = '/issues';

export const issueAPI = {
  getAllIsseus: () => requestGET(GET_ALL_IESSUES_PATH),
};
