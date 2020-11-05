import axios from 'axios';
import BASE_URL from '@/const/url';
import { handleError } from '@/utils/error';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

export const requestGET = async (url, params = {}, headers = {}) => {
  try {
    return await instance.get(url, { params, headers });
  } catch (err) {
    handleError(err);
  }
};

export const requestPOST = async (url, data = {}, headers = {}) => {
  try {
    return await instance.post(url, data, headers);
  } catch (err) {
    handleError(err);
  }
};

export const requestPUT = async (url, data = {}, headers = {}) => {
  try {
    return await instance.put(url, data, headers);
  } catch (err) {
    handleError(err);
  }
};

export const requestPATCH = async (url, data = {}, headers = {}) => {
  try {
    return await instance.patch(url, data, headers);
  } catch (err) {
    handleError(err);
  }
};

export const requestDELETE = async (url, params = {}, headers = {}) => {
  try {
    return await instance.delete(url, { params, headers });
  } catch (err) {
    handleError(err);
  }
};
