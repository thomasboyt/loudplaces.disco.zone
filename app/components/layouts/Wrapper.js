import {Link} from 'react-router';
import TimeoutTransitionGroup from 'timeout-transition-group';
import AudioPlayer from '../AudioPlayer';

const Wrapper = React.createClass({
  render() {
    return (
      <div>
        <div className="title-container">
          <h1 className="blog-title">
            <Link to="index">Loud Places</Link>
          </h1>

          <AudioPlayer />
        </div>

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
