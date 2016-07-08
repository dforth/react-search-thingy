var React = require('react');
var ReactDOM = require('react-dom');

import SearchThingy from '../SearchThingy';

var SearchExample = React.createClass({
  render: function() {
    return (
      <SearchThingy />
    );
  }
});


ReactDOM.render(<SearchExample/>, document.getElementById('searchContainer'));
