import moment from 'moment';

import Wrapper from '../Wrapper';
import Loading from '../Loading';
import Tweet from '../Tweet';

import getPageTitle from '../util/getPageTitle';

const DATE_STRING = 'ddd. MMMM Do, YYYY';

const Post = React.createClass({

  propTypes: {
    entry: React.PropTypes.object.isRequired,
    isHydrated: React.PropTypes.bool.isRequired,
    fetchError: React.PropTypes.object,
  },

  renderTweets(tweets) {
    return tweets.map((tweet) => {
      return (
        <Tweet tweet={tweet} key={tweet.id_str} />
      );
    });
  },

  renderDescription(description) {
    if (!description) {
      return null;
    }

    const paragraphs = description.split('\n\n');

    const paras = paragraphs.map((paragraph, idx) => (
      <p key={idx}>{paragraph}</p>
    ));

    return (
      <div className="description">
        {paras}
      </div>
    );
  },

  renderHydrated() {
    const {tweets, description} = this.props.entry;

    return (
      <div>
        {this.renderDescription(description)}
        {this.renderTweets(tweets)}
      </div>
    );
  },

  render() {
    const {isHydrated} = this.props;

    const {title, date, location} = this.props.entry;

    return (
      <Wrapper>
        <DocumentTitle title={getPageTitle(title)}>
          <div className="entry">
            <div className="entry-box">
              <h1 className="title">{title}</h1>

              <p>
                {moment(date, 'YYYY-MM-DD').format(DATE_STRING)}
                <span className="at-sign">
                  {' @ '}
                </span>
                <strong>{location}</strong>
              </p>
            </div>

            {isHydrated ? this.renderHydrated() : <Loading />}
          </div>
        </DocumentTitle>
      </Wrapper>
    );
  }
});

export default Post;
