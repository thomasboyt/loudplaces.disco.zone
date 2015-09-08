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
    largeUrl: React.PropTypes.string.isRequired,
    smallUrl: React.PropTypes.string.isRequired
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
    const {largeUrl} = this.props;

    const mediaStyle = {
      background: `url(${largeUrl}) no-repeat center center`,
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
    const {largeUrl, smallUrl} = this.props;

    return (
      <span>
        <a href={largeUrl} onClick={this.handleRequestOpen}>
          <img src={smallUrl} />
        </a>
        {this.renderModal()}
      </span>
    );
  }
});

export default Photo;
