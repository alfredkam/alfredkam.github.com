import 'prismjs';
import React from 'react';
import $ from 'zepto';
import Search from './components/Search';
import SearchData from './constants/posts.json';

let _ = {
  escape: require('lodash/string/escape')
};

import './styles/Base.less';

$('code').each(function () {
  var html = _.escape($(this).html());
  html = html.replace(/&amp;lt;/g,'&lt;');
  html = html.replace(/&amp;gt;/g,'&gt;');
  $(this).html(html);
});

$(document).ready(function () {
    // $('#navCollapse').collapse({
    //     toggle: false
    // });
});

React.render(
  <Search data={SearchData} />,
  document.getElementById('SearchComponent')
);
