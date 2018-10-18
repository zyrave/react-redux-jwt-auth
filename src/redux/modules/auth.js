import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const BASE_URL = 'http://localhost:3000';

export const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = userData => dispatch =>
  axios.post(`${BASE_URL}/api/users`, userData);

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export const login = data => dispatch => {
  axios.post(`${BASE_URL}/api/users/login`, data).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  });
};

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    default:
      return state;
  }
};
