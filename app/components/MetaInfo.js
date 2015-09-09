import React from 'react';

import moment from 'moment';

import * as propTypes from '../propTypes';

const DATE_STRING = 'ddd. MMMM Do, YYYY';

const MetaInfo = React.createClass({
  propTypes: {
    post: propTypes.shortPost.isRequired
  },

  render() {
    const {date, location} = this.props.post;

    return (
      <p>
        {moment(date, 'YYYY-MM-DD').format(DATE_STRING)}
        <span className="at-sign">
          {' @ '}
        </span>
        <strong>{location}</strong>
      </p>
    );
  }
});

export default MetaInfo;
