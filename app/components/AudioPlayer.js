import React from 'react';
import {connect} from 'react-redux';

const AudioPlayer = React.createClass({
  propTypes: {
    audio: React.PropTypes.object
  },

  getInitalState() {
    return {
      playing: false
    };
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
      <div className="audio-player" onClick={this.toggleStatus}>
        <div className="music-icons">
          &#9835;
          {this.renderAction()}
        </div>
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
