import React from 'react';

const Page = React.createClass({

  propTypes: {
    pageTitle: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
  },

  render() {
    return (
      <html>
        <head>
          {/* Used for page renders; client renders use <DocumentTitle />*/}
          <title>{this.props.pageTitle}</title>

          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

          <link href="http://fonts.googleapis.com/css?family=Dosis:400,500,600,700" rel="stylesheet" type="text/css" />
          <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />

          <link href="/assets/app.css" rel="stylesheet" />

          <script src="/assets/vendor.bundle.js" />
          <script src="https://www.youtube.com/iframe_api" />
        </head>

        <body>
          {this.props.children}

          <script src="/assets/app.bundle.js" />
        </body>
      </html>
    );
  }
});

export default Page;
