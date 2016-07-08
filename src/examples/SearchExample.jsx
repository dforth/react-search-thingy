var React = require('react');
var ReactDOM = require('react-dom');

var SearchExample = React.createClass({
  render: function() {
    return (
      <div>
        Let's get started
      </div>
    );
  }
});


ReactDOM.render(<SearchExample/>, document.getElementById('searchContainer'));
