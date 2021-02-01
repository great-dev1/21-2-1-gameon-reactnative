export const SET_SETTING = '[DATA] SET SETTING';
export const SAVE_SETTING = '[DATA] SAVE SETTING';
export const SET_TEAMS = '[DATA] SET TEAMS';
export const SET_SPORTS = '[DATA] SET SPORTS';
export const SET_PROFILE = '[DATA] SET PROFILE';
export const SET_CURLOCATION = '[DATA] SET CURLOCATION';

export const setSetting = (setting) => {
  return (dispatch) => {
    console.log('actions SET_SETTING');
    dispatch({type: SET_SETTING, payload: setting});
  };
};

export const saveSetting = () => {
  return (dispatch) => {
    console.log('actions SAVE_SETTING');
    dispatch({type: SAVE_SETTING});
  };
};

export const setTeams = (teams) => {
  return (dispatch) => {
    console.log('actions SET_TEAMS');
    dispatch({type: SET_TEAMS, payload: teams});
  };
};

export const setSports = (sports) => {
  return (dispatch) => {
    console.log('actions SET_SPORTS');
    dispatch({type: SET_SPORTS, payload: sports});
  };
};

export const setProfile = (profile) => {
  return (dispatch) => {
    console.log('actions SET_PROFILE');
    dispatch({type: SET_PROFILE, payload: profile});
  };
};

export const setCurLocation = (location) => {
  return (dispatch) => {
    console.log('actions SET_CURLOCATION');
    dispatch({type: SET_CURLOCATION, payload: location});
  };
};
