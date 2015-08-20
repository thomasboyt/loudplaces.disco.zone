/* global YT */

import React from 'react';
import queryString from 'query-string';

const YouTubeAudio = React.createClass({
  propTypes: {
    playing: React.PropTypes.bool.isRequired,
    url: React.PropTypes.string.isRequired
  },

  componentDidMount() {
    const tub = React.findDOMNode(this.refs.tub);

    this._player = new YT.Player(tub, {
      events: {
        onReady: (e) => this.onPlayerReady(e),
        onStateChange: (e) => this.onStateChange(e)
      }
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing !== this.props.playing) {
      if (!nextProps.playing) {
        this._player.pauseVideo();
      } else {
        this._player.playVideo();
      }
    }
  },

  onPlayerReady(evt) {
    this._player = evt.target;

    // TODO: add volume slider and don't use this
    this._player.setVolume(50);

    if (this.props.playing) {
      this._player.playVideo();
    }
  },

  onStateChange(evt) {
    if (evt.data === YT.PlayerState.ENDED) {
      if (this.props.onEnded) {
        this.props.onEnded();
      }
    }
  },

  getUrl() {
    const originalUrl = this.props.url;
    const qs = queryString.parse(queryString.extract(originalUrl));
    const vidId = qs.v;

    let url = `https://www.youtube.com/embed/${vidId}`;
    url += '?enablejsapi=1';
    url += '&rel=0';
    url += '&autoplay=0';
    url += '&controls=0';
    url += '&playsinline=1';

    return url;
  },

  render() {
    return (
      <iframe
        ref="tub"
        width="0"
        height="0"
        src={this.getUrl()}
        frameBorder="0"
        />
    );
  }
});

export default YouTubeAudio;
