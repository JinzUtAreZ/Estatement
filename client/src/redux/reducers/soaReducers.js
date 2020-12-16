import { GET_VIEW_SOA, SET_LOADING, SET_ERROR_MSG } from "./../types/soaTypes";

const iniState = {
  soaList: [],
  error: 0,
};

export default (state = iniState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_VIEW_SOA:
      return {
        ...state,
        soaList: action.payload,
      };
    case SET_ERROR_MSG:
      console.log("SOA - reducer error", action.payload);
      return {
        ...state,
        error: parseFloat(action.payload),
      };
    default:
      return state;
  }
};
