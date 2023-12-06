import {
   SENDFILE_REQUEST,
   SENDFILE_SUCCESS,
   SENDFILE_FAIL,
  
  } from "../constant/fileConstant";
  
  import axios from "axios";
  
  export const SendFile = (muid, file) => async (dispatch) => {
    try {
      dispatch({ type:SENDFILE_REQUEST });
  
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `/api/upload/${muid}`,
        file,
        config
      );
  
      dispatch({ type:SENDFILE_SUCCESS, payload: data.response.userMessage });
    } catch (error) {
      dispatch({ type:SENDFILE_FAIL, payload: error.response.data.message });
    }
  };
  
  