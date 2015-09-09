import React from 'react';

import moment from 'moment';
import Video from './Video';
import Photo from './Photo';

import parseTweetText from '../util/parseTweetText';
import * as propTypes from '../propTypes';

const Tweet = React.createClass({

  propTypes: {
    tweet: propTypes.tweet.isRequired,
  },

  stripMediaEntities(original) {
    let text = [];

    const media = this.props.tweet.entities.media;

    if (!media || media.length === 0) {
      return original;
    }

    media.forEach((media) => {
      const before = original.slice(0, media.indices[0]);
      const after = original.slice(media.indices[1]);

      text.push(before, after);
    });

    return text;
  },

  replaceMentions(original) {
    let text = [];

    const mentions = this.props.tweet.entities.user_mentions;

    if (mentions.length === 0) {
      return original;
    }

    mentions.forEach((mention) => {
      const before = original.slice(0, mention.indices[0]);
      const after = original.slice(mention.indices[1]);

      const link = (
        <a href={`https://twitter.com/${mention.screen_name}`}>
          @{mention.screen_name}
        </a>
      );

      text.push(before, link, after);
    });

    return text;
  },

  renderText() {
    return (
      <span>
        {parseTweetText(this.props.tweet.text, this.props.tweet.entities)}
      </span>
    );
  },

  renderMedia() {
    const entities = this.props.tweet.extended_entities;
    if (!entities || !entities.media) {
      return null;
    }

    const media = entities.media;

    return media.map((media) => {
      if (media.type === 'photo') {
        return (
          <Photo
            largeUrl={`${media.media_url_https}:large`}
            smallUrl={`${media.media_url_https}:small`}
            key={media.id_str} />
        );
      } else if (media.type === 'video') {
        return <Video media={media} key={media.id_str} />;
      }
    });
  },

  render() {
    const {tweet} = this.props;

    const timestamp = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY');
    const permalink = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

    return (
      <div>
        <p>
          <a href={permalink}>
            <strong>
              {timestamp.format('hh:mm:ss a')}
            </strong>
          </a>
          <br/>
          {this.renderText()}
        </p>
        {this.renderMedia()}
      </div>
    );
  }
});

export default Tweet;
