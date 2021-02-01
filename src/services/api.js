import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
export const baseURL =
  'http://ec2-35-178-32-220.eu-west-2.compute.amazonaws.com/';
var APIKit = axios.create({
  // baseURL: 'http://ec2-3-8-232-76.eu-west-2.compute.amazonaws.com/',
  baseURL: 'http://ec2-35-178-32-220.eu-west-2.compute.amazonaws.com/',
  // baseURL: 'http://10.0.2.2:3000/',
  timeout: 10000,
});

var tokenInterceptor = null;
// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  AsyncStorage.setItem('userToken', token);
  tokenInterceptor = APIKit.interceptors.request.use(function (config) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = undefined;
    }
    console.log('interceptor', config);
    return config;
  });
};

export const clearClientToken = () => {
  console.log('clear token');
  APIKit.interceptors.request.eject(tokenInterceptor);
  tokenInterceptor = null;
};
// Intercept all request
// APIKit.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => Promise.reject(error),
// );
// Intercept all responses
APIKit.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log(error && error.response);
    if (!error || !error.response) {
      return;
    }
    console.log('interceptor : ' + error.response.status);
    if (error.response.status === 401) {
      //refresh token with old one
      const old_token = await AsyncStorage.getItem('userToken');
      console.log(old_token);
      return Promise.reject(error);
      // send login screen for now.
    }
    if (error.response.status === 422) {
      return Promise.reject(error);
    }
  },
);

//set smscode 'api/sendsmscode', /api/verifycode
APIKit.sendSMSCode = (payload) => APIKit.post('api/sendsmscode', payload);
APIKit.verifyCode = (payload) => APIKit.post('api/verifycode', payload);
APIKit.resendCode = () => APIKit.get('api/resendcode');

// register with phone and email
APIKit.register = (payload) => APIKit.post('api/register', payload);
APIKit.login = (payload) => APIKit.post('api/login', payload);
APIKit.social_login = (payload) => APIKit.post('api/social_login', payload);
APIKit.profile = (payload) => APIKit.patch('api/profile', payload);
APIKit.getprofile = () => APIKit.get('api/profile');
APIKit.getsports = () => APIKit.get('api/sports/all');
APIKit.getsportsprofile = () => APIKit.get('api/profile/sports');
APIKit.setsports = (payload) => APIKit.patch('api/profile/sports', payload);
APIKit.getability = () => APIKit.get('api/profile/ability');
APIKit.setability = (payload) => APIKit.patch('api/profile/ability', payload);
APIKit.getbiouniversity = () => APIKit.get('api/profile/bio');
APIKit.setbiouniversity = (payload) => APIKit.patch('api/profile/bio', payload);
APIKit.getuniversities = () => APIKit.get('api/university/all');
APIKit.getavaliablity = () => APIKit.get('api/profile/availability');

APIKit.setavaliablity = (payload) =>
  APIKit.patch('api/profile/availability', payload);

APIKit.getSetting = () => APIKit.get('api/setting');
APIKit.setSetting = (payload) => APIKit.post('api/setting', payload);

APIKit.uploadImage = (payload) => APIKit.post('api/imagebase64', payload);

APIKit.getCards = () => APIKit.get('api/cards');
APIKit.cardGame = (payload) => APIKit.post('api/cards/game', payload);
APIKit.cardJoin = (payload) => APIKit.post('api/cards/join', payload);
APIKit.joinTeam = (payload, chief) => {
  console.log('url', 'post api/teams/' + chief + '/members');
  console.log('payload', payload);
  return APIKit.post('api/teams/' + chief + '/members', payload);
};
APIKit.rejectTeam = (payload, chief) => {
  console.log('url', 'delete api/teams/' + chief + '/members');
  console.log('payload', payload);
  return APIKit.delete('api/teams/' + chief + '/members', {data: payload});
};

APIKit.getTeams = () => APIKit.get('api/teams');
APIKit.getContacts = () => APIKit.get('api/users/contacts');

APIKit.deleteAccount = () => APIKit.delete('api/users/account');

APIKit.blockUser = (payload) => APIKit.post('api/users/block', payload);
APIKit.reportUser = (payload) => APIKit.post('api/users/report', payload);
export default APIKit;
