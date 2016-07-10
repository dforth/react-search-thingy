import React from 'react';
import SearchSuggestions from './SearchSuggestions'

class SearchThingy extends React.Component {

  constructor(props) {
    super(props);

    var defaultSearchString = '';

    if (this.props.defaultSearchString) {

      defaultSearchString = this.props.defaultSearchString;
    }

    this.state = this.initialState = {

      searchString: defaultSearchString,
      searchSuggestions: []
    };
  }

  componentDidMount() {

  }

  getSearchSuggestions(searchText) {

    return [
      searchText + "test1",
      searchText + "test2",
      searchText + "test3"
    ]
  }

  onChange(event) {

    var currentSearchStringValue = event.target.value;

    var newSearchSuggestions = [];

    if (currentSearchStringValue.length > 3) {

        newSearchSuggestions = this.getSearchSuggestions(currentSearchStringValue);
    }

    this.setState({

      searchString: currentSearchStringValue,
      searchSuggestions: newSearchSuggestions
    });
  }

  onSubmit(event) {

    if (this.state.searchString) {
      alert("Search for: '" + this.state.searchString + "'");
    }
  }

  handleSuggestionSelection(selection) {

    console.log("TODO: handleSuggestionSelect: ", selection);
  }

  render() {

    return (
      <div className="SearchThingy">
        <div className="SearchThingy_Field">
          <input type="search" className="SearchThingy_Input" name="search" placeholder="Search..." value={this.state.searchString} onChange={this.onChange.bind(this)} />
          <button className="SearchThingy_Button" id="searchThingyButton" onClick={this.onSubmit.bind(this)} >Search</button>
        </div>
        {
          this.state.searchSuggestions.length > 0 &&
          <SearchSuggestions
            searchText={this.state.searchString}
            searchSuggestions={this.state.searchSuggestions}
            selectionHandler={this.handleSuggestionSelection.bind(this)}
          />
        }
      </div>
    );
  }
}

SearchThingy.propTypes = {
  defaultSearchString: React.PropTypes.string
};

SearchThingy.defaultProps = {
};

export default SearchThingy;
