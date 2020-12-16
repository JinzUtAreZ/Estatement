import { GET_VIEW_SOA, SET_LOADING, SET_ERROR_MSG } from "./../types/soaTypes";

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

const responseCode = "";

//export const getSOAList = (id, session) => async (dispatch) => {
export const getSOAList = () => async (dispatch) => {
  try {
    setLoading();
    //const response = await fetch(`/api/soa/${id}/${session}`);
    const response = await fetch(`/api/soa/`);
    if (response.status == 200) {
      const data = await response.json();
      console.log(data);
      dispatch({
        type: GET_VIEW_SOA,
        payload: data,
      });
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    dispatch({
      type: SET_ERROR_MSG,
      payload: err.message,
    });
  }
};
