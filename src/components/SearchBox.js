import React, { Component, PropTypes } from 'react';

class SearchBox extends Component {
  static displayName = 'SearchBox';
  static propTypes = {
    data: PropTypes.Object
  };

  state = {
    hidden: true,
    key: ''
  };

  handleClick() {
    this.setState({
      hidden: true
    });
  }

  handleCapture(e) {
    const key = e.targetValue;
    this.setState({
        key,
        hidden: false
    });
  }

  getFilterSearchResult() {
    let { key } = this.state;
    let { data } = this.props;

    return data.filter(item => {
      if (item.title.toLowerCase().match(key)) {
        return true;
      } else {
        let tags = item.tags.filter(tag => {
          return tag.toLowerCase().match(key);
        });
        if (tags) {
          return true;
        }
      }
      return false;
    });
  }

  render() {
      let filteredResults = this.getFilterSearchResult();
      let viewableList = filteredResults.map(item => {
        return (
          <div className='results'>
              <a href={`http://${window.location.host}${item.href}`}>{item.title}</a>
          </div>
        );
      });

      return (
          <div className='row'>
              <div className='col-xs-12'>
                  <input onChange={e => this.capture(e)}
                        className='col-xs-6 col-xs-offset-3' />
                  <i onClick={e => this.handleClick(e)} className='icon-cancel'></i>
              </div>
              <div className='col-xs-6 col-xs-offset-3 resultWrapper'>
                  {this.state.hidden == false && viewableList == '' ? 'search not found' : viewableList}
              </div>
          </div>
      );
  }
}

export default SearchBox;
