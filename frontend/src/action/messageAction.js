import {
  SENDMESSAGES_REQUEST,
  SENDMESSAGES_SUCCESS,
  SENDMESSAGES_FAIL,
  GETMESSAGES_REQUEST,
  GETMESSAGES_SUCCESS,
  GETMESSAGES_FAIL,

} from "../constant/messageConstant";

import axios from "axios";

export const SendMessage = (id,muid, message) => async (dispatch) => {
  try {
    dispatch({ type: SENDMESSAGES_REQUEST });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/store/message/${id}/${muid}`,
      message,
      config
    );

    dispatch({ type: SENDMESSAGES_SUCCESS, payload: data.response.userMessage });
  } catch (error) {
    dispatch({ type: SENDMESSAGES_FAIL, payload: error.response.data.message });
  }
};


export const getMessage = (id) => async (dispatch) => {
  console.log(id)
  try {
    dispatch({ type: GETMESSAGES_REQUEST });

  

    const { data } = await axios.post(
      `/api/get/messages/${id}`,
    );

    dispatch({ type: GETMESSAGES_SUCCESS, payload: data.response.response });
  } catch (error) {
    dispatch({ type: GETMESSAGES_FAIL, payload: error.response.data.message });
  }
};
