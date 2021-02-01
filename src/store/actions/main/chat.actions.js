export const SET_CONTACTS = '[CHAT] SET CONTACTS';
export const ADD_HISTORY = '[CHAT] ADD HISTORY';
export const CLEAR_HISTORY = '[CHAT] CLEAR HISTORY';
export const SET_CUR_USER = '[CHAT] CLEAR CURRENT USER';

export const setContacts = (contacts) => {
  return (dispatch) => {
    console.log('actions SET_CONTACTS');
    dispatch({type: SET_CONTACTS, payload: contacts});
  };
};

export const addHistory = (history) => {
  return (dispatch) => {
    console.log('actions ADD_HISTORY');
    dispatch({type: ADD_HISTORY, payload: history});
  };
};

export const clearHistory = () => {
  return (dispatch) => {
    console.log('actions CLEAR_HISTORY');
    dispatch({type: CLEAR_HISTORY});
  };
};

export const setCurUser = (user) => {
  return (dispatch) => {
    console.log('actions SET_CUR_USER');
    dispatch({type: SET_CUR_USER, payload: user});
  };
};
