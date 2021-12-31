import {
  fetchSingaRequest,
  fetchSingaSuccess,
  fetchSingaFilure,
} from '../actions/fetchActions';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case fetchSingaRequest().type:
      return {
        ...state,
        isFetching: true,
      };
    case fetchSingaSuccess().type:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
      };

    case fetchSingaFilure().type:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: new Error('Error loaded!'),
      };

    default:
      return state;
  }
};
