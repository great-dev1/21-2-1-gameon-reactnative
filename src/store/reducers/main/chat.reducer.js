import * as Actions from '../../actions/main/index';

import io from 'socket.io-client';

const initialState = {
  contacts: [],
  socket: io('http://ec2-35-178-32-220.eu-west-2.compute.amazonaws.com'),
  history: [],
  curUser: {},
};

const sortByDate = (a, b) => {
  if (a.createdAt === b.createdAt) {
    return 0;
  }
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  return -1;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_CONTACTS:
      console.log('SET_CONTACTS', action.payload);
      return {...state, contacts: action.payload};
    case Actions.ADD_HISTORY:
      console.log('ADD_HISTORY', action.payload);
      const newHistory = action.payload.filter(
        (msg) => !state.history.find((h) => h._id === msg._id),
      );
      const history = [...state.history, ...newHistory];
      console.log('HISTORY', history);
      history.sort(sortByDate);
      return {...state, history: history};
    case Actions.CLEAR_HISTORY:
      console.log('clear history');
      return {...state, history: []};
    case Actions.SET_CUR_USER:
      return {...state, curUser: action.payload};
    case Actions.CLEAR_ALL_DATA:
      return initialState;
    default:
      return state;
  }
};
