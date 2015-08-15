import moment from 'moment';

import Wrapper from '../Wrapper';

const DATE_STRING = 'ddd. MMMM Do, YYYY';

const List = React.createClass({

  propTypes: {
    entries: React.PropTypes.array.isRequired
  },

  maybeRenderLink(post) {
    // Only render a link to a post if it has content (tweets, description, etc)

    if (post.tweets.length > 0 || post.description) {
      return (
        <Link to="entry" params={{slug: post.slug}}>{post.title}</Link>
      );
    } else {
      return post.title;
    }
  },

  renderPosts() {
    return this.props.entries.map((post) => {
      return (
        <li key={post.slug} className="entry-box">
          <h2 className="title">{this.maybeRenderLink(post)}</h2>
          <p>
            {moment(post.date, 'YYYY-MM-DD').format(DATE_STRING)}
            <span className="at-sign">
              {' @ '}
            </span>
            <strong>{post.location}</strong>
          </p>
        </li>
      );
    });
  },

  render() {
    return (
      <Wrapper>
        <div className="home">
          <p>I go to lots of shows. Here are all of them.</p>

          <ul>
            {this.renderPosts()}
          </ul>
        </div>
      </Wrapper>
    );
  }
});

export default List;
