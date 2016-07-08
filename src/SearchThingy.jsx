import React from 'react';

class SearchThingy extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.initialState = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <i className="fa fa-search"></i>
      </div>
    );
  }
}

SearchThingy.propTypes = {
};

SearchThingy.defaultProps = {
};

export default SearchThingy;
