import React from 'react';

const T = React.PropTypes;

export const shortPost = T.shape({
  title: T.string.isRequired,
  date: T.string.isRequired,
  location: T.string.isRequired,
  hasContent: T.bool.isRequired
});

// TODO
export const tweet = T.object;

export const photo = T.shape({
  caption: T.string,
  sizes: T.shape({
    large: T.string.isRequired,
    small: T.string.isRequired
  }).isRequired
});

export const media = T.oneOfType([photo, tweet]);

export const audio = T.shape({
  title: T.string.isRequired,
  artist: T.string.isRequired,
  url: T.string.isRequired
});

export const post = T.shape({
  title: T.string.isRequired,
  date: T.string.isRequired,
  location: T.string.isRequired,

  body: T.string,
  media: T.arrayOf(media).isRequired,
  audio: T.arrayOf(audio)
});

