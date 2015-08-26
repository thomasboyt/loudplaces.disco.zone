const VolumeSlider = React.createClass({
  propTypes: {
    volume: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange(e) {
    this.props.onChange(parseInt(e.target.value, 10));
  },

  render() {
    return (
      <span className="volume">
        <i className="fa fa-volume-up" />

        <div className="slider">
          <div className="volume-input-container">
            <input type="range" className="volume-input" orient="vertical"
              min="0" max="100" step="1"
              value={this.props.volume} onChange={this.handleChange} />
          </div>
        </div>
      </span>
    );
  }
});

export default VolumeSlider;
