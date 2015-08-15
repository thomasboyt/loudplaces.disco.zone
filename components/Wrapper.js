const Wrapper = React.createClass({
  render() {
    return (
      <div>
        <h1 className="blog-title">
          <Link to="index">Loud Places</Link>
        </h1>

        {this.props.children}
      </div>
    );
  }
});

export default Wrapper;
