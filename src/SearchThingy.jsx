import React from 'react';
import SearchSuggestions from './SearchSuggestions';
import classNames from 'classnames';

import './searchThingyStyles';

class SearchThingy extends React.Component {

  constructor(props) {
    super(props);

    let defaultSearchString = '';

    if (this.props.defaultSearchString) {

      defaultSearchString = this.props.defaultSearchString;
    }

    this.state = this.initialState = {

      searchString: defaultSearchString,
      searchSuggestions: [],
      highlightedSuggestionIndex: null,
      hasFocus: false
    };
  }

  componentDidMount() {

  }

  getSearchSuggestions(searchText) {

    if (this.props.searchSuggestionHandler) {

      return this.props.searchSuggestionHandler(searchText);
    }
  }

  updateSearchText(newSearchString) {

    if (newSearchString != this.state.searchString) {

      let newSearchSuggestions = [];

      if (newSearchString.length > 2) {

          newSearchSuggestions = this.getSearchSuggestions(newSearchString);
      }

      this.setState({

        searchString: newSearchString,
        searchSuggestions: newSearchSuggestions
      });
    }
  }

  onChange(event) {

    this.updateSearchText(event.target.value);
  }

  performSearch() {

    let searchText = this.state.searchString;

    if (this.state.highlightedSuggestionIndex != null && this.state.searchSuggestions) {

        searchText = this.state.searchSuggestions[this.state.highlightedSuggestionIndex];
    }

    if (this.props.clearSearchTextOnSubmit) {

      this.clearSearch();
    }

    if (searchText) {

      this.props.searchHandler(searchText);
    }

  }

  onSubmit(event) {

    this.performSearch();
  }

  handleSuggestionSelection(selectedSuggestion) {
console.log('test');
    this.updateSearchText(selectedSuggestion);

    this.performSearch();
  }

  clearSearch() {

    this.setState({
      searchString: '',
      hasFocus: false,
      searchSuggestions: [],
      highlightedSuggestionIndex: null
    });
  }

  moveSelectionDown() {

    if (this.state.searchSuggestions) {

      let index = this.state.highlightedSuggestionIndex;

      if (index == null) {

        index = 0;

      } else {

        index = index + 1;

        if (index >= this.state.searchSuggestions.length) {

          index = null;
        }
      }

      this.setState({

        highlightedSuggestionIndex: index
      });
    }
  }

  moveSelectionUp() {

    if (this.state.searchSuggestions) {

      let index = this.state.highlightedSuggestionIndex;

      if (index == null) {

        index = this.state.searchSuggestions.length - 1;

      } else {

        index = index - 1;

        if (index < 0) {

          index = null;
        }
      }

      this.setState({

        highlightedSuggestionIndex: index
      });
    }
  }

  onKeyDown(event) {

    const keyValue = event.which || event.keyCode;

    switch (keyValue) {

      case 38: // Up Arrow
        event.preventDefault();
        this.moveSelectionUp();
        break;

      case 40: // Down Arrow

        event.preventDefault();
        this.moveSelectionDown();
        break;

      case 13: // Enter

        this.performSearch();
        break;

      case 27: // Escape

        this.refs.searchInput.blur();
        break;

      default:
        // Anything else and we clear the suggestion selection
        if (this.state.highlightedSuggestionIndex != null) {
          this.setState({
            highlightedSuggestionIndex: null
          });
        }
    }
  }

  render() {

    return (
      <div id={'SearchThingy_' + this.props.id} className="SearchThingy">
        <div className="SearchThingy_Field">
          <input
            type="search"
            ref="searchInput"
            className={
              classNames(
                'SearchThingy_Input',
                {'selected': this.state.highlightedSuggestionIndex == null}
              )
            }
            maxLength="80"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            name="search"
            placeholder="Search..."
            value={this.state.searchString}
            onChange={this.onChange.bind(this)}
            onBlur={this.clearSearch.bind(this)}
            onKeyDown={this.state.searchSuggestions && this.onKeyDown.bind(this)}
            onFocus={() => this.setState({hasFocus: true})}
            />
          <button
            className="SearchThingy_Button"
            id="searchThingyButton"
            onClick={this.onSubmit.bind(this)} ><i className="fa fa-search"></i></button>
        </div>
        {
          this.state.searchSuggestions.length > 0 &&
          <SearchSuggestions
            searchText={this.state.searchString}
            searchSuggestions={this.state.searchSuggestions}
            selectionHandler={this.handleSuggestionSelection.bind(this)}
            selectedSuggestionIndex={this.state.highlightedSuggestionIndex}
          />
        }
      </div>
    );
  }
}

SearchThingy.propTypes = {
  id: React.PropTypes.string,
  defaultSearchString: React.PropTypes.string,
  searchSuggestionHandler: React.PropTypes.func,
  searchHandler: React.PropTypes.func.isRequired,
  clearSearchTextOnSubmit: React.PropTypes.bool
};

SearchThingy.defaultProps = {
  id: "1",
  defaultSearchString: undefined,
  searchSuggestionHandler: undefined,
  clearSearchTextOnSubmit: true
};

export default SearchThingy;
