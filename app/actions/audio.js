import {createAction} from 'redux-actions';

export const PLAY_AUDIO = 'playAudio';

export const playAudio = createAction(PLAY_AUDIO, (audio) => {
  console.log('playing', audio);
  return audio;
});
