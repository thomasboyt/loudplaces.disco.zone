import React from 'react';
import {connect} from 'react-redux';
import {playAudio} from '../../actions/audio';
import canPlayYoutubeAudio from '../../util/canPlayYoutubeAudio';

const AudioLink = React.createClass({
  propTypes: {
    audio: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,

    dispatch: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      canPlayYoutubeAudio: false
    };
  },

  componentDidMount() {
    // TODO: We do this here so that the intitial client-side render matches
    // the server checksum but is then re-rendered with client-side capabilities
    // I know, this is a bummer :(

    this.setState({
      canPlayYoutubeAudio: canPlayYoutubeAudio()
    });
  },

  handleClick() {
    this.props.dispatch(playAudio(this.props.audio));
  },

  renderAudioPlayerLink() {
    const {audio} = this.props;

    return (
      <span>
        <i className="fa fa-play" />

        &nbsp;&nbsp;

        <a onClick={this.handleClick} href="#">
          {this.props.children}
        </a>

        &nbsp;

        (<a href={audio.url}>via</a>)
      </span>
    );
  },

  renderAudioLink() {
    const {audio} = this.props;

    return (
      <span>
        <a href={audio.url}>
          {this.props.children}
        </a>
      </span>
    );
  },

  render() {
    if (this.state.canPlayYoutubeAudio) {
      return this.renderAudioPlayerLink();
    } else {
      return this.renderAudioLink();
    }
  }
});

export default connect()(AudioLink);
