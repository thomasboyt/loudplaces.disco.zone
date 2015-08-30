import moment from 'moment';

const DATE_STRING = 'ddd. MMMM Do, YYYY';

const MetaInfo = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
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
