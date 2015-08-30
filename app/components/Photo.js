const Photo = React.createClass({
  propTypes: {
    media: React.PropTypes.object.isRequired
  },

  render() {
    const media = this.props.media;

    return (
      <a href={`${media.media_url_https}:large`} key={media.id_str}>
        <img src={`${media.media_url_https}:small`} />
      </a>
    );
  }
});

export default Photo;
