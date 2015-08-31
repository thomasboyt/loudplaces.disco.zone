import Modal from 'react-modal';

const Photo = React.createClass({
  propTypes: {
    media: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      expanded: false
    };
  },

  handleRequestOpen(e) {
    e.preventDefault();  // TODO: does this let cmd+click work?

    this.setState({
      expanded: true
    });
  },

  handleRequestClose() {
    this.setState({
      expanded: false
    });
  },

  renderModal() {
    const media = this.props.media;

    const mediaStyle = {
      background: `url(${media.media_url_https}:large) no-repeat center center`,
      backgroundSize: 'contain'
    };

    return (
      <Modal isOpen={this.state.expanded} onRequestClose={this.handleRequestClose}>
        <div className="zoom-img-container" onClick={this.handleRequestClose}>
          <div className="media-content" style={mediaStyle} />
        </div>
      </Modal>
    );
  },

  render() {
    const media = this.props.media;

    return (
      <span>
        <a href={`${media.media_url_https}:large`} key={media.id_str}
          onClick={this.handleRequestOpen}>
          <img src={`${media.media_url_https}:small`} />
        </a>
        {this.renderModal()}
      </span>
    );
  }
});

export default Photo;
