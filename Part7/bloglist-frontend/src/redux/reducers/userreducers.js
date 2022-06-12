import blogService from '../../services/blogs';
import handleTokenExpiration from '../../utils/expiredToken';
import { setNotification } from './notificationReducers';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const setUser = () => async (dispatch) => {
  handleTokenExpiration();
  const loggedInUser = window.localStorage.getItem('loggedBlogappUser');

  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    dispatch({
      type: 'SET_USER',
      data: user,
    });
    blogService.setToken(user.token);
  }
};

export const login = (username, password) => async (dispatch) => {
  const user = await blogService.login(username, password);
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
  window.localStorage.setItem('setupTime', new Date().getTime());
  dispatch(setNotification({ type: 'success', message: `${user.name} welcome back!` }, 5));
  blogService.setToken(user.token);
  dispatch({
    type: 'SET_USER',
    data: user,
  });
};

export const logout = () => async (dispatch) => {
  window.localStorage.clear();
  dispatch({
    type: 'LOGOUT',
  });
};

export default userReducer;
