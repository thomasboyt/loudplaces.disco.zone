import React from 'react';

function leadingZero(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

const InfoSlider = React.createClass({
  propTypes: {
    audio: React.PropTypes.object,
    elapsed: React.PropTypes.number,
    duration: React.PropTypes.number
  },

  renderTime(totalSec) {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;

    return (
      <span>
        {leadingZero(min)}:{leadingZero(sec)}
      </span>
    );
  },

  renderSlider() {
    const {audio, duration, elapsed} = this.props;

    if (!audio) {
      return null;
    }

    return (
      <div className="slider">
        <span>{audio.artist} - {audio.title}</span>
        <span>{this.renderTime(elapsed)} / {this.renderTime(duration)}</span>
      </div>
    );
  },

  render() {
    return (
      <span className="info">
        <span className="icon">
          &#9835;
        </span>

        {this.renderSlider()}
      </span>
    );
  }
});

export default InfoSlider;
