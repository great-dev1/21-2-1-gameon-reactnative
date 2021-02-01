import {combineReducers} from 'redux';
import data from './data.reducer';
import chat from './chat.reducer';

const mainReducers = combineReducers({
  data,
  chat,
});

export default mainReducers;
