import userConstants from "../contants/userContants";
import setAuthToken from "../store/setToken";
const initialState = {
  token: localStorage.getItem("token"),
  loading: true,
  isAuthenticated: false,
  user: {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem("token", action.data.token);
      setAuthToken(localStorage.getItem("token"));
      return {
        user: action.data.user,
        loading: false,
        isAuthenticated: true,
      };
    case userConstants.LOGIN_FAILURE:
      localStorage.removeItem("token");
      return { error: action.error };

    case userConstants.LOGOUT:
      console.log("logout reducer");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthToken(null);
      return {
        ...state,
        token: null,
        loading: true,
        isAuthenticated: false,
        user: null,
      };
    case userConstants.GETME_REQUEST:
      localStorage.getItem("token");
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETME_SUCCESS:
      localStorage.getItem("token");
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.user,
      };
    case userConstants.GETME_FAILURE:
      return { thanhbede: action.error };
    default:
      return state;
  }
};

export default userReducer;
