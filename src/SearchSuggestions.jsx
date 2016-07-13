import React from 'react';
import classNames from 'classnames';

class SearchSuggestions extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  renderSuggestionText(suggestionText) {

    let startIndex = suggestionText.indexOf(this.props.searchText);

    if (startIndex == -1) {

      return (
        <span>{suggestionText}</span>
      );

    } else {

      return (
        <span>
          { suggestionText.substr(0, startIndex) }
          <strong>{this.props.searchText}</strong>
          { suggestionText.substr(startIndex + this.props.searchText.length) }
        </span>
      );

    }
  }


  handleClick(suggestion) {

    console.log('suggestion: ', suggestion);

    this.props.selectionHandler(suggestion);
  }

  render() {

    return (
      <ul className="SearchThingy_suggestions">
        {this.props.searchSuggestions.map((suggestion, index) =>
          <li className={classNames(
              'SearchThingy_suggestion',
              {'selected': this.props.selectedSuggestionIndex == index}
              )}
            key={index}
            onClick={() => this.handleClick(suggestion)}
            onMouseDown={(event) => event.preventDefault()}
            >
            { this.renderSuggestionText(suggestion) }
          </li>
        )}
      </ul>
    );
  }
}

SearchSuggestions.propTypes = {

  searchText: React.PropTypes.string.isRequired,
  searchSuggestions: React.PropTypes.array.isRequired
};

export default SearchSuggestions;
