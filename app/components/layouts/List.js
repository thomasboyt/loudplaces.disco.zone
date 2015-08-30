import {Link} from 'react-router';

import Loading from '../Loading';
import MetaInfo from '../MetaInfo';

import getPageTitle from '../../util/getPageTitle';

const List = React.createClass({

  propTypes: {
    entries: React.PropTypes.array.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    fetchError: React.PropTypes.object,
  },

  maybeRenderLink(post) {
    // Only render a link to a post if it has content (tweets, description, etc)
    if (post.hasContent) {
      return (
        <Link to="entry" params={{slug: post.slug}}>{post.title}</Link>
      );
    } else {
      return post.title;
    }
  },

  renderPosts() {
    const posts = this.props.entries.map((post) => {
      return (
        <li key={post.slug} className="entry-box">
          <h2 className="title">{this.maybeRenderLink(post)}</h2>
          <MetaInfo post={post} />
        </li>
      );
    });

    return (
      <ul>
        {posts}
      </ul>
    );
  },

  render() {
    const {isLoading} = this.props;

    return (
      <DocumentTitle title={getPageTitle('Home')}>
        <div className="home">
          <p>I go to lots of shows. Here are all of them.</p>

          {!isLoading ? this.renderPosts() : <Loading />}
        </div>
      </DocumentTitle>
    );
  }
});

export default List;
