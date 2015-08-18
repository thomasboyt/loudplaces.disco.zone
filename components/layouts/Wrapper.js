import {Link} from 'react-router';
import TimeoutTransitionGroup from 'timeout-transition-group';

const Wrapper = React.createClass({
  render() {
    return (
      <div>
        <h1 className="blog-title">
          <Link to="index">Loud Places</Link>
        </h1>

        <TimeoutTransitionGroup
          enterTimeout={500}
          leaveTimeout={500}
          transitionName="page-transition">
          {this.props.children}
        </TimeoutTransitionGroup>
      </div>
    );
  }
});

export default Wrapper;
