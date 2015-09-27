import React, { Component, PropTypes } from 'react';
import ScrollBox from './ScrollBox';

import './Search.less';

let getRegex = (value) => {
 return new RegExp(`\\b${value.trim()}`, 'gi');
};

class Search extends Component {
  static displayName = 'Search';
  static propTypes = {
    data: PropTypes.array
  };

  static defaultProps = {
    data: []
  };

  state = {
    enable: false
  };

  getFilterSearchResult() {
    let { value = '' } = this.state;
    let { data } = this.props;

    return data.filter(item => {
      if (item.title.toLowerCase().match(getRegex(value))) {
        return true;
      } else {
        if (!item.tags) return false;
        let tags = item.tags.filter(tag => {
          return tag.toLowerCase().match(getRegex(value));
        });
        if (tags.length) {
          return true;
        }
      }
      return false;
    });
  }

  handleOnFocus(e) {
    this.setState({
      enable: true,
      value: e.target.value
    });
  }

  handleOnChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleOnBlur(e) {
    const { isScrollBoxFocused } = this.state;
    if(isScrollBoxFocused) return;
    this.setState({
      enable: false
    });
  }

  handleScrollBoxMouseLeave(e) {
    this.setState({
      isScrollBoxFocused: false
    });
  }

  handleScrollBoxMouseEnter(e) {
    this.setState({
      isScrollBoxFocused: true
    });
  }

  render() {
    let filteredResults = this.getFilterSearchResult();
    let viewableList = filteredResults.map(item => {
      return (
        <div key={item.title}>
            <a href={`http://${window.location.host}${item.href}`}><div className='search__scrollbox__item'>{item.title}</div></a>
        </div>
      );
    });
    return (
      <div className='search'>
            { this.state.enable  ?
            <div>
              <input
                autoFocus={true}
                className='search__component'
                onFocus={e => this.handleOnFocus(e)}
                onChange={e => this.handleOnChange(e)}
                onBlur={e => this.handleOnBlur(e)}/>
               <ScrollBox
                className='search__scrollbox mdl-shadow--2dp'
                onMouseLeave={e => this.handleScrollBoxMouseLeave(e)}
                onMouseEnter={e => this.handleScrollBoxMouseEnter(e)}
                autoExpand={true}>
                  {viewableList}
               </ScrollBox>
             </div>
             :
             <i className='icon-search' onClick={e => this.handleOnFocus(e)}></i>
           }
      </div>
    );
  }
}

export default Search;
