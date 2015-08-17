import moment from 'moment';

import Wrapper from '../Wrapper';
import Loading from '../Loading';
import Tweet from '../Tweet';

import getPageTitle from '../util/getPageTitle';

const DATE_STRING = 'ddd. MMMM Do, YYYY';

const Post = React.createClass({

  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    entry: React.PropTypes.object
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

  render() {
    const {isLoading} = this.props;

    if (isLoading) {
      return (
        <Loading />
      );
    }

    const {title, date, tweets, location, description} = this.props.entry;

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

            {this.renderDescription(description)}

            {this.renderTweets(tweets)}
          </div>
        </DocumentTitle>
      </Wrapper>
    );
  }
});

export default Post;
