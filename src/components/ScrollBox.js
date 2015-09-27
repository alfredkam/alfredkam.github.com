import React, { Component, PropTypes } from 'react';

class ScrollBox extends Component {
  static displayName = 'ScrollBox';
  static propTypes = {
    scrollNotifyOffset : PropTypes.number,
    onScrollNotify     : PropTypes.func,
    height             : PropTypes.number
  };

  static defaultProps = {
    height: 200,
    autoExpand: false,
    onScrollNotify: Function.prototype,
    scrollNotifyOffset: 0
  };

  componentDidUpdate() {
    this._setContentHeight();
    this._handleScroll();
  }

  componentDidMount() {
    this._setContentHeight();
    this._handleScroll();
  }

  _contentHeight = 0;

  _lastScrollTop = 0;

  _setContentHeight() {
    this._contentHeight = this.refs.content.getDOMNode().offsetHeight;
  }

  _handleScroll() {
    var scrollTop = this.refs.content.getDOMNode().scrollTop;
    var triggerPoint = this._contentHeight - this.props.height - this.props.scrollNotifyOffset;
    var scrollingDown = scrollTop > this._lastScrollTop;

    if (scrollTop > triggerPoint && scrollingDown) {
      this.props.onScrollNotify();
    }
    this._lastScrollTop = scrollTop;
  }

  render() {
    const { className='', height, children, autoExpand, ...others } = this.props;
    const scrollerStyles = autoExpand ? {
      height: "auto",
      "maxHeight": height,
      overflow : 'auto'
    } : {
      height: height,
      overflow : 'auto'
    };

    return (
      <div className={`scrollbox ${className}`}
        onScroll={ e => this._handleScroll() }
        style={scrollerStyles}
        {...others}>
        <div ref="content"
          className="scrollbox__content">
          {children}
        </div>
      </div>
    );
  }
}

export default ScrollBox;
