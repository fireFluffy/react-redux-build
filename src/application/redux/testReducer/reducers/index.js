// State
import testState from '../states';
// Constants
import TEST_CONSTANT from '../constants';

const testReducer = (state = testState, { payload, type }) => {
  switch (type) {
    case TEST_CONSTANT:
      return {
        ...state,
        test: payload,
      };

    default:
      return state;
  }
};

export default testReducer;
