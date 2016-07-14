
import React from 'react';
import ReactDOM from 'react-dom';
import SearchThingy from '../SearchThingy';

class SearchExample extends React.Component {

  constructor(props) {
    super(props);
  }

  searchSuggestionHandler(searchText) {

    console.log('searchSuggestionHandler called: ', searchText);

    const testSuggestions = [];

    for (var i=0; i< 10; i++) {
      testSuggestions.push(searchText + 'test' + i);
    }

    // more for testing
    testSuggestions.push('blah ' + searchText + ' blah');
    testSuggestions.push('TestyMcTestFace ' + searchText);

    return testSuggestions;

  }

  searchHandler(searchText) {

    console.log('searchHandler called: ', searchText);
  }

  render() {
    return (
        <SearchThingy
          searchSuggestionHandler={this.searchSuggestionHandler}
          searchHandler={this.searchHandler}
          clearSearchTextOnSubmit={true}
        />
    );
  }

}

export default SearchExample;


ReactDOM.render(<SearchExample />, document.getElementById('searchContainer'));
