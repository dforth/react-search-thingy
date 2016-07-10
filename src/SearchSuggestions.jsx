import React from 'react';

class SearchSuggestions extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <ul className="SearchThingy_suggestions">
        {this.props.searchSuggestions.map((suggestion, index) =>
          <li className="SearchThingy_suggestion"
            key={index}
            onClick={() => this.props.selectionHandler(suggestion)}
            >
            <span>
              {this.props.searchText}
              <strong>{suggestion.substr(this.props.searchText.length)}</strong>
            </span>
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
