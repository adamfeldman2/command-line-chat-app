const defaultState = {
  name: ''
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'STORE_NAME':
      return { ...state, name: action.name };

    default:
      return state;
  }
};

export default appReducer;
