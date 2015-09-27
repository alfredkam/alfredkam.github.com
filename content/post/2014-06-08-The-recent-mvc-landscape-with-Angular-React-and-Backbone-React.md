+++
template = "post"
title = "The recent MVC landscape with Angular+React and Backbone+React"
tags = ["react","backbone","angular","javascript","fast rendering", "inital loading","optimization"]
date = "2014-06-08"
url = "The recent mvc landscape with Angular React and Backbone React"
type = "post"
img = "/img/unsplash/tumblr_n6essmaWs11st5lhmo1_1280.jpg"
+++
<p>
    This post might bring in some arguments for both parties that favour one of the framework then the other, but this will be a worth while comparision to take a look at the recent MVC landscape.  Just to clarify - I'm still relatively new to Angular.
</p>
<p>
    Lets be clear - React is a component that is designed and focused to replace the 'V' component under a MVC framework.  The most recognise MVC frameworks are Backbone & Angular, and it's starting to increasingly standout that React is able to replace the 'V' component due to its virtual dom design, minimal exposure of real dom elements and data-binding handling.  It is also <a href='http://williambrownstreet.net/blog/2014/04/faster-angularjs-rendering-angularjs-and-reactjs/'>proven from this post</a> that Angular + React provides the fastest rendering.
</p>
<p>
    To achieve fast render and low inital load speed, the design of the component hierarchy structure is relatively important.  In Angular, React needs to be initiated at the controller. For Backbone, on the other hand needs to be initiated at the router.
</p>
<p>
    Link to <a href='http://plnkr.co/edit/7DKHQ6tR7TCKkR5bFURu?p=preview'>Angular+React Demo</a><br>
    Link to <a href='http://plnkr.co/edit/1mwjMNh0RQP8PVrinOmD?p=preview'>Backbone+React Demo</a><br>
</p>
<div class='row'>
    <div class='col-md-12'>
        <pre class='col-md-6'>
            <code class='language-javascript'>
                //Angular Example
                angular.module('fasterAngular', []).
                controller('mycontroller', ['$scope', function($scope){
                   $scope.framework = 'ReactJs';
                   $scope.data = [];
                   // Fill the data map with random data
                   $scope.refresh = function(){
                       for(var i = 0; i < 1500; ++i) {
                           $scope.data[i] = {};
                           for(var j = 0; j < 5; ++j) {
                               $scope.data[i][j] = Math.random();
                           }
                       }
                   }

                   $scope.refresh();

                   $scope.$watchCollection('data', function(newValue, oldValue){
                       React.renderComponent(
                           MYLIST({data:newValue}),
                           document.getElementById("fastRepeatArea")
                       );
                   })
                }])
            </code>
        </pre>

        <pre class='col-md-6'>
            <code class='language-javascript'>
                //Backbone example
                $(document).ready(function () {
                  new (Backbone.Router.extend({
                    initialize : function () {
                        var data = [];
                        var refresh = function () {
                          for(var i = 0; i < 1500; ++i) {
                                  data[i] = {};
                                  for(var j = 0; j < 5; ++j) {
                                      data[i][j] = Math.random();
                                  }
                              }
                          React.renderComponent(
                            MYLIST({data:data}),
                            document.getElementById("fastRepeatArea")
                          );
                        };
                        refresh();
                        $('button#refreshBtn').click(function () {
                          refresh();
                        });
                    },
                  }))();
                });
            </code>
        </pre>
    </div>
</div>
<p>
     React is initiated under the same flow and it would achieve the same render speed.  This example can be further improved by delegating the data change event and click event to React or using mixins to listen to partial changes. Instead of having it through the Angular controller or Backbone router.
</p>
<p>
    At this point, Angular+React and Backbone+React would be equivalent. Now lets take a look at the required components and initial loading speed.
</p>
<p>
    According to <a href='http://lhorie.github.io/mithril/'>Mithril</a>, Angular takes 7.49ms to load and Backbone takes 18.54ms to load.  Another important to note is Backbone is light weight but it still depends upon underscore & jquery.  Those add up during initial script request!
</p>
<p>
    I believe this pretty much dictates which combination is the go to framework for heavy web apps.  Every second counts to keep your user on your site!
</p>ntender in the market called Facebook React, I'll just call it React for short.  React is a 'View' Framework.  So in terms of a MVC, its the 'V' Component.  Suprisingly React further simplified the entire landscape of 'View' framework.  It only expose the real nodes that you have
</p>
<p>
  Lets see how this will look like in React, ive also included the propeller <a href='https://github.com/usepropeller/react.backbone'>react.backbone</a>.  It allows us to feed in backbone models into react and databind with mixin.
</p>

<pre>
  <code class='language-markup'>
      <!-- html structure -->
      &#60;html&#62;
        &#60;body&#62;
        &#60;/body&#62;
      &#60;/html&#62;
  </code>
  <code class='language-javascript'>
    //javascript code
    /** @jsx React.DOM **/
    'use strict';

    define ([
      'jquery', backbone', 'react', 'react.backbone'
    ], function (
      $, Backbone, React,
    ) {

      var CommentComponent = React.createBackboneClass({
        var comments = this.props.collection.map(function(item) {
          return (
            {item.get('comment')}
          )
        });
        return (
          <div>
            {comments}
          </div>
        );
      });

      var StatsComponent = React.createBackboneClass({
        render : function () {
          return (
            <div>
              {/* html template */}
            </div>
          );
        }
      });

      var MenuComponent = React.createBackboneClass({
        render : function () {
          return (
            <div>
              {/* html template */}
            </div>
          );
        }
      });

      var WidgetLayout = React.createBackboneClass({
        componentWillMount : function () {
          this.collection = Backbone.Collection();
        },
        render : function () {
          return (
            <StatsComponent />
            <CommentsComponent collection={this.collection}/>
          )
        };
      });

      var AppLayout = React.createBackboneClass({
        render : function () {
          return (
            <div>
                <MenuComponent />
                <WidgetLayout />
            </div>
          );
        };
      });
      React.renderComponent({
        <AppLayout />,
        $('body')[0]
      });
    });
  </code>
</pre>
<p>
  The code base is smaller, easier to understand and to control.  Now some may ask about Angular + React comparing with Backbone + React.  For this I'll leave it to next post, but this is now pretty clear Marionette is out of the game.
</p>
