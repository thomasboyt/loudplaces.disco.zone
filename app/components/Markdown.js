// Modified from https://github.com/acdlite/react-remarkable

import React from 'react';
import Markdown from 'remarkable';

import jsxPlugin from 'remarkable-jsx';

const Remarkable = React.createClass({

  getDefaultProps() {
    return {
      container: 'div',
      options: {},
    };
  },

  render() {
    var Container = this.props.container;

    return (
      <Container>
        {this.content()}
      </Container>
    );
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      this.md = new Markdown(nextProps.options);
    }
  },

  content() {
    if (this.props.source) {
      return (
        <span>
          {this.renderMarkdown(this.props.source)}
        </span>
      );
    }

    else {
      return React.Children.map(this.props.children, child => {
        if (typeof child === 'string') {
          return (
            <span>
              {this.renderMarkdown(child)}
            </span>
          );
        }
        else {
          return child;
        }
      });
    }
  },

  renderMarkdown(source) {
    if (!this.md) {
      this.md = new Markdown(this.props.options);

      this.md.use(jsxPlugin);
    }

    return this.md.render(source);
  }

});

export default Remarkable;
