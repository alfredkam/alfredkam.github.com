+++
template = "post"
title = "Goodbye Marionette & Hello React"
tags = ["react","backbonejs","marionettejs","angular","javascript"]
date = "2014-05-28"
type = "post"
url = "Goodbye Marionette Hello React"
img = "/img/unsplash/tumblr_n1iq25Wq701st5lhmo1_1280.jpg"
+++

<p>
     I have been developing a lot of large javascript web apps that requires a lot of subview management or componets and decentralize the model dependecies to better suit the component re-usability.  It was not till early this year, I was still designing them with Backbone + Marionette.  Now it's <b>Backbone + React or Angular + React</b>.  For this post let's concentrate in comparing Backbone + Mariontte & Backbone + React.   

     As we all know, Backbone 'View' itself is a design flaw.  It had a lot of issues regarding its memory management and sub view management.  Marionette on the other hand, did help solved the sub view management and memory issues by offering a wide range of common designs and design patterns to help build the application.
</p>

<p>
    Although Marionette provided a decent way to handle layout, subviews and code management, it is still too dependent on Backbone and gets more complex upon further sub view nesting. In Marionette the view is represented as a tree, the subviews is also part of the tree, thus if to render the middle layer must destruct and a rebuilt must occur. As well as rendering multiple Marionette Layers and Regions, although these Marionette functionalites are really awesome which helped took out the pain in backbone. While nesting those components doesnt play nicely with each other and hard to decouple, causing the sub layouts and sub regions to have an event show fire before its parent fires the show event.
</p>
<p>
    Consider in Marionette, you used a layout to display a widget on a page.  Within the widget there is also a layout before it calls the itemview.  In other words nested layout then itemview.
</p>
<div class='row'>
  <div class='col-md-12'>
    <img style='width:100%' src='/img/layout-example-marionette+react.svg'></img>
  </div>
</div>
<pre class='language-javascript'>
    <code class='language-markup'>
      <!-- html structure -->
      &#60;html&#62;
        &#60;body&#62;
          <div id='menu'>
          </div>
          <div id='widget'>
          </div>
          <script id="some-template" type="text/html">
            <ul>
              <% _.each(items, function(item){ %>
              <li> <%= item.someAttribute %> </li>
              <% }); %>
            </ul>
          </script>

          <script id="some-comment-template" type="text/html">
            <ul>
                <li><%= item.someAttribute %> </li>
            </ul>
          </script>

          <script id="widget-layout-template" type="text/html">
            <div id='stats-region'>
            </div>
            <div id='comment-region'>
            </div>
          </script>
        &#60;/body&#62;
      &#60;/html&#62;
    </code>
    <code class='language-javascript'>
      //javascript code
      'use strict';

      define([
        'backbone', 'marionette'
      ], function(
        Backbone, Marionette
      ) {
        var AppLayout = Backbone.Marionette.Layout.extend({
          template : '#some-layout-template'
          regions : {
            widget : '#widget',
            menu : '#menu'  
          }
        });

        var MenuItem = Backbone.Marionette.IteView.extend({
          template : '#some-template'
        });

        var CommentItem = Backbone.Marionette.ItemView.extend({
          template : '#some-comment-template'
        });

        var StatsItem = Backbone.Marionette.ItemView.extend({
          template : '#some-template'
        });

        var CommentsCompositeView = Backbone.CompositeView.extend({
          template : '#some-comment-template',
          itemView : CommentItem
        });

        var WidgetLayout = Backbone.Marionette.Layout.extend({
          initialize : function () {
            this.collection = new Backbone.Collection();
          },
          template : '#widget-layout-template',
          regions : {
            stats : new Marionette.Region({
              el : "#stats-region"
            })
            comments : new Marionette.Region({
              el : '#comment-region'
            })
          },
          onShow : function () {
            this.regions.stats.show(new StatsItem(
              model : someModel
            ));
            this.regions.comments.show(new CommentsCompositeView({
              collection : this.collection
            }));
          }
        });

        var layout = new AppLayout();
        layout.render();
        layout.widget.show(new WidgetLayout());
        layout.menu.show(new MenuItem());
      });
    </code>
</pre>
<p>
  In this example we will run into a render issue with the sub region fire before the parent does.
</p>
<p>
  Now came 2014 and there is a new contender in the market called Facebook React, I'll just call it React for short.  React is a 'View' Framework.  So in terms of a MVC, its the 'V' Component.  Suprisingly React further simplified the entire landscape of 'View' framework.  It only expose the real nodes that you have
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
