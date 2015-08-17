import getPageTitle from './util/getPageTitle';

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

          <link href="http://fonts.googleapis.com/css?family=Dosis:400,500,600,700" rel="stylesheet" type="text/css" />
          <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet" type="text/css" />
          <link href="/normalize.css" rel="stylesheet" />
          <link href="/style.css" rel="stylesheet" />

          <script src="/js/vendor.bundle.js" />
        </head>

        <body>
          {this.props.children}

          <script src="/js/app.bundle.js" />
        </body>
      </html>
    );
  }
});

export default Page;
