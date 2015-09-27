import React, { Component, PropTypes } from 'react';
import SearchBox from './SearchBox';

class Search extends Component {
  static displayName = 'Search';
  static propTypes = {
    searchData: PropTypes.array
  };

  static defaultProps = {
    searchData: []
  };

  state = {
    onFocus: false
  };

  hanldeOnFocus(e) {

  }

  render() {
    return (
        <div>
            <input onFocus={e => this.hanldeOnFocus(e)} placeholder='Search' />
              { this.state.onFocus  ?
               <SearchBox data={this.props.searchData} /> :
               null }
        </div>
    );
  }
}

export default Search;
