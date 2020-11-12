import { requestGET } from '@/api';

const DEFAULT_LABEL_PATH = '/labels';

export const labelAPI = {
  getAllLabels: () => requestGET(DEFAULT_LABEL_PATH),
};
