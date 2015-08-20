import {handleActions} from 'redux-actions';
import {PLAY_AUDIO} from '../actions/audio';

const initialState = {
  audio: null
};

const actions = {};

actions[PLAY_AUDIO] = (state, action) => {
  // Replace current audio with new audio
  const audio = action.payload;

  return {audio};
};

export default handleActions(actions, initialState);
