const InfoSlider = React.createClass({
  propTypes: {
    audio: React.PropTypes.object.isRequired
    // TODO: Get some info from Youtub...
  },

  renderSlider() {
    const {audio} = this.props;

    if (!audio) {
      return null;
    }

    return (
      <div className="slider">
        <span>{audio.artist} - {audio.title}</span>
        <span>--:-- / --:--</span>
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
