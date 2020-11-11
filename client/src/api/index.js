import axios from 'axios';
import { handleError } from '@/utils/error';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://118.67.132.70:3000'
    : 'http://127.0.0.1:3000';

const getInstance = () =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

export const requestGET = async (url, params = {}, headers = {}) => {
  try {
    return await getInstance().get(url, { params, headers });
  } catch (err) {
    handleError(err);
  }
};

export const requestPOST = async (url, data = {}, headers = {}) => {
  try {
    return await getInstance().post(url, data, headers);
  } catch (err) {
    handleError(err);
  }
};

export const requestPUT = async (url, data = {}, headers = {}) => {
  try {
    return await getInstance().put(url, data, headers);
  } catch (err) {
    handleError(err);
  }
};

export const requestPATCH = async (url, data = {}, headers = {}) => {
  try {
    return await getInstance().patch(url, data, headers);
  } catch (err) {
    handleError(err);
  }
};

export const requestDELETE = async (url, params = {}, headers = {}) => {
  try {
    return await getInstance().delete(url, { params, headers });
  } catch (err) {
    handleError(err);
  }
};
