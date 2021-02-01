export const CLEAR_ALL_DATA = '[CLEAR] CLEAR ALL DATA';

export const clearAllData = () => {
  return (dispatch) => {
    console.log('actions CLEAR_ALL_DATA');
    dispatch({type: CLEAR_ALL_DATA});
  };
};