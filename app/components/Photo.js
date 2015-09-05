import React from 'react';

import Modal from 'react-modal';

// <3 react-router
// https://github.com/rackt/react-router/blob/0.13.x/modules/components/Link.js#L5-L11
function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

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
    if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
      return;
    }

    e.preventDefault();

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
