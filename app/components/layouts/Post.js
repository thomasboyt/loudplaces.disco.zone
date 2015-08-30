import Loading from '../Loading';
import MetaInfo from '../MetaInfo';
import Tweet from '../Tweet';
import Markdown from '../Markdown';
import AudioLink from '../audio/AudioLink';

import getPageTitle from '../../util/getPageTitle';

const Post = React.createClass({

  propTypes: {
    entry: React.PropTypes.object.isRequired,
    isHydrated: React.PropTypes.bool.isRequired,
    fetchError: React.PropTypes.object,
  },

  renderTweets(tweets) {
    if (tweets.length === 0) {
      return null;
    }

    const rendered = tweets.map((tweet) => {
      return (
        <Tweet tweet={tweet} key={tweet.id_str} />
      );
    });

    return (
      <span>
        <h3>Tweets</h3>
        <div className="tweets">
          {rendered}
        </div>
      </span>
    );
  },

  renderDescription(description) {
    if (!description) {
      return null;
    }

    return (
      <span>
        <h3>Report</h3>
        <div className="description">
          <Markdown source={description} />
        </div>
      </span>
    );
  },

  renderAudio(audio) {
    if (!audio) {
      return null;
    }

    const links = audio.map((audio) => {
      return (
        <li key={audio.url}>
          <AudioLink audio={audio}>
            {audio.artist} - {audio.title}
          </AudioLink>
        </li>
      );
    });

    return (
      <span>
        <h3>Listen</h3>
        <ul className="audio-links">
          {links}
        </ul>
      </span>
    );
  },

  renderHydrated() {
    const {tweets, description, audio} = this.props.entry;

    return (
      <div>
        {this.renderAudio(audio)}
        {this.renderDescription(description)}
        {this.renderTweets(tweets)}
      </div>
    );
  },

  render() {
    const {isHydrated} = this.props;
    const {title} = this.props.entry;

    return (
      <DocumentTitle title={getPageTitle(title)}>
        <div className="entry">
          <div className="entry-box">
            <h1 className="title">{title}</h1>

            <MetaInfo post={this.props.entry} />
          </div>

          {isHydrated ? this.renderHydrated() : <Loading />}
        </div>
      </DocumentTitle>
    );
  }
});

export default Post;
