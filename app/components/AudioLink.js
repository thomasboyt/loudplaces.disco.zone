import React from 'react';
import {connect} from 'react-redux';
import {playAudio} from '../actions/audio';

const AudioLink = React.createClass({
  propTypes: {
    audio: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,

    dispatch: React.PropTypes.func.isRequired
  },

  handleClick() {
    this.props.dispatch(playAudio(this.props.audio));
  },

  render() {
    return (
      <a onClick={this.handleClick} href="#">
        {this.props.children}
      </a>
    );
  }
});

export default connect()(AudioLink);
