import userConstants from "../contants/userContants";
import { userService } from "../api/userService";

export const userActions = {
  login,
  getMe,
  logout,
};

function getMe() {
  return async (dispatch) => {
    dispatch(request());

    await userService.getMe().then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GETME_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETME_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETME_FAILURE, error };
  }
}

function login(u) {
  return async (dispatch) => {
    dispatch(request({ u }));
    await userService.login(u).then(
      (data) => {
        if (data.user) dispatch(success(data));
        else dispatch(failure(data.msg));
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(data) {
    return { type: userConstants.LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}
function logout() {
  console.log("logout");
  return async (dispatch) => {
    dispatch({ type: userConstants.LOGOUT });
  };
}
