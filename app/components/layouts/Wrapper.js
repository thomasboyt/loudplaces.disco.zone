import {Link} from 'react-router';
import TimeoutTransitionGroup from 'timeout-transition-group';
import AudioPlayer from '../AudioPlayer';

const Wrapper = React.createClass({
  render() {
    return (
      <div className="container">
        <header>
          <h1 className="blog-title">
            <Link to="index">Loud Places</Link>
          </h1>

          <AudioPlayer />
        </header>

        <main>
          <TimeoutTransitionGroup
            enterTimeout={500}
            leaveTimeout={500}
            transitionName="page-transition">
            {this.props.children}
          </TimeoutTransitionGroup>
        </main>

        <footer>
          (c) <a href="http://thomasboyt.com">thomas boyt</a>
        </footer>
      </div>
    );
  }
});

export default Wrapper;
