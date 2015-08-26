import {debounce} from 'lodash';
import {connect} from 'react-redux';
import {playAudio} from '../../actions/audio';

import YouTubeAudio from './YouTubeAudio';
import VolumeSlider from './VolumeSlider';

const VOLUME_KEY = 'volume';

const updateSavedVolume = debounce((vol) => {
  localStorage.setItem(VOLUME_KEY, vol);
}, 200);


const AudioPlayer = React.createClass({
  propTypes: {
    audio: React.PropTypes.object
  },

  getInitialState() {
    return {
      playing: false,
      volume: 100  // TODO: remember from localStorage? redux store?
    };
  },

  componentDidMount() {
    // Read last used volume from localStorage
    const lastVol = parseInt(localStorage.getItem(VOLUME_KEY), 10);

    if (isNaN(lastVol)) {
      // use default
      return;
    }

    this.setState({
      volume: lastVol
    });
  },

  componentWillReceiveProps(nextProps) {
    if (!nextProps.audio) {
      // If audio is unset, stop playing
      this.setState({
        playing: false
      });

    } else if (!this.props.audio || (nextProps.audio.url !== this.props.audio.url)) {
      // If audio has changed, start playing
      this.setState({
        playing: true
      });
    }
  },

  toggleStatus() {
    this.setState({
      playing: !this.state.playing
    });
  },

  handleEnded() {
    this.props.dispatch(playAudio(null));
  },

  handleVolumeChange(vol) {
    this.setState({
      volume: vol
    });

    updateSavedVolume(vol);
  },

  renderAction() {
    if (this.state.playing) {
      return (
        <i className="fa fa-pause" />
      );
    } else {
      return (
        <i className="fa fa-play" />
      );
    }
  },

  render() {
    const {audio} = this.props;

    if (!audio) {
      return null;
    }

    return (
      <div className="audio-player">
        <div className="audio-control">
          <span className="icon">
            &#9835;
          </span>
        </div>

        <div className="audio-control interactive" onClick={this.toggleStatus}>
          {this.renderAction()}
        </div>

        <div className="audio-control interactive">
          <VolumeSlider volume={this.state.volume} onChange={this.handleVolumeChange} />
        </div>

        <YouTubeAudio
          playing={this.state.playing}
          volume={this.state.volume}
          url={audio.url}
          onEnded={this.handleEnded}
          />
      </div>
    );
  }
});

function getState(state) {
  const audioState = state.audio;

  return {
    audio: audioState.audio
  };
}
export default connect(getState)(AudioPlayer);
