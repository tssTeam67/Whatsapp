import {
  GETMESSAGES_REQUEST,
  GETMESSAGES_SUCCESS,
  GETMESSAGES_FAIL,
} from "../constant/messageConstant";

export const messageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case GETMESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GETMESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
        error: null,
      };

    case GETMESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
