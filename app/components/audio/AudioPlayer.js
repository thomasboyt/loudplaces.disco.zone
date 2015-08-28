import {debounce} from 'lodash';
import {connect} from 'react-redux';
import {playAudio} from '../../actions/audio';

import YouTubeAudio from './YouTubeAudio';
import VolumeSlider from './VolumeSlider';
import InfoSlider from './InfoSlider';

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
      duration: null,
      elapsed: null,
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
        playing: false,
        duration: null,
        elapsed: null
      });

    } else if (!this.props.audio || (nextProps.audio.url !== this.props.audio.url)) {
      // If audio has changed, start playing
      this.setState({
        playing: true,
        duration: null,
        elapsed: null
      });
    }
  },

  toggleStatus() {
    if (!this.props.audio) {
      return;
    }

    this.setState({
      playing: !this.state.playing
    });
  },

  handleReady(info) {
    const {duration, elapsed} = info;

    this.setState({
      duration,
      elapsed
    });
  },

  handleElapsedTick(elapsed) {
    this.setState({
      elapsed
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
    if (!this.props.audio) {
      return null;
    }

    let className;
    if (this.state.playing) {
      className = 'fa fa-pause';
    } else {
      className = 'fa fa-play';
    }

    return (
      <div className="audio-control interactive" onClick={this.toggleStatus}>
        <i className={className} />
      </div>
    );
  },

  renderEmbed() {
    if (!this.props.audio) {
      return null;
    }

    return (
      <YouTubeAudio
        playing={this.state.playing}
        volume={this.state.volume}
        url={this.props.audio.url}
        onReady={this.handleReady}
        onTick={this.handleElapsedTick}
        onEnded={this.handleEnded} />
    );
  },

  render() {
    const {audio} = this.props;

    return (
      <div className="audio-player">
        <div className="audio-control interactive">
          <InfoSlider audio={audio}
            duration={this.state.duration} elapsed={this.state.elapsed} />
        </div>

        {this.renderAction()}

        <div className="audio-control interactive">
          <VolumeSlider volume={this.state.volume} onChange={this.handleVolumeChange} />
        </div>

        {this.renderEmbed()}
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
