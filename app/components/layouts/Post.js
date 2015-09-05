import React from 'react';
import DocumentTitle from 'react-document-title';

import Loading from '../Loading';
import MetaInfo from '../MetaInfo';
import Tweet from '../Tweet';
import AudioLink from '../audio/AudioLink';

import getPageTitle from '../../util/getPageTitle';

const Post = React.createClass({

  propTypes: {
    post: React.PropTypes.object.isRequired,
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
        <div className="description"
          dangerouslySetInnerHTML={{__html: description}} />
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
    const {tweets, body, audio} = this.props.post;

    return (
      <div>
        {this.renderAudio(audio)}
        {this.renderDescription(body)}
        {this.renderTweets(tweets)}
      </div>
    );
  },

  render() {
    const {isHydrated} = this.props;
    const {title} = this.props.post;

    return (
      <DocumentTitle title={getPageTitle(title)}>
        <div className="entry">
          <div className="entry-box">
            <h1 className="title">{title}</h1>

            <MetaInfo post={this.props.post} />
          </div>

          {isHydrated ? this.renderHydrated() : <Loading />}
        </div>
      </DocumentTitle>
    );
  }
});

export default Post;
