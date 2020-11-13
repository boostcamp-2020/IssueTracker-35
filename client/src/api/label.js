import { requestGET } from '@/api';
import { requestPOST } from '.';

const DEFAULT_LABEL_PATH = '/labels';

export const labelAPI = {
  getAllLabels: () => requestGET(DEFAULT_LABEL_PATH),
  submitLabel: label => requestPOST(DEFAULT_LABEL_PATH, label),
};
