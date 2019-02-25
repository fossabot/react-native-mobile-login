import Base64 from './base64';
import { FIDO_UAF_APP_URL_SCHEME } from './const';

export function randomString (length) {
  const pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += pool[Math.floor(Math.random() * pool.length)];
  return result;
}

export const generateKey = () => {
  return Base64.btoa(randomString(32));
};

export const generateUAFUrl = (uafRequestType, uafResponseType, state, json) => {
  return `${FIDO_UAF_APP_URL_SCHEME}x-callback-url/${uafRequestType}`
    + `?x-success=${Expo.Linking.makeUrl()}&x-callback-url/${uafResponseType}` +
    `&key=${generateKey()}&state=${state}&json=${Base64.btoa(JSON.stringify(json))}`;
};