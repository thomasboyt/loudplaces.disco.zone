import React from 'react';

import {Link} from 'react-router';
import TimeoutTransitionGroup from 'timeout-transition-group';
import AudioPlayer from '../audio/AudioPlayer';

import canPlayYoutubeAudio from '../../util/canPlayYoutubeAudio';

const Wrapper = React.createClass({

  // XXX: this is set post-mount so server render matches first client render
  getInitialState() {
    return {
      canPlayAudio: false
    };
  },

  componentDidMount() {
    this.setState({
      canPlayAudio: canPlayYoutubeAudio()
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="blog-title">
            <Link to="index">Loud Places</Link>
          </h1>

          {this.state.canPlayAudio ? <AudioPlayer /> : null}
        </header>

        <main>
          <TimeoutTransitionGroup
            enterTimeout={500}
            leaveTimeout={500}
            transitionName="page-transition">
            {this.props.children}
          </TimeoutTransitionGroup>
        </main>
      </div>
    );
  }
});

export default Wrapper;
