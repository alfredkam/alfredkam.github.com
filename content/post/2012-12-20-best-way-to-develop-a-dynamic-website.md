+++
template = "post"
title = "Best way to develop a dynamic website"
tags = ["Dev", "JavaScript"]
date = "2012-12-20"
url = "best way to develop a dynamic website"
type = "post"
img = "/img/unsplash/tumblr_n3tsz9iUPi1st5lhmo1_1280.jpg"
+++
<p>The develop a dynamic website, with all those smooth page transitions similar to gmail.  As per design we will use <a href="http://twitter.github.com/bootstrap/">Bootstrap</a>, Bootstrap provides all the css tools you need to setup a quick website.</p>
<p><strong>Frontend skills you will need</strong><br />
- javascript<br />
- html</p>
<p><strong>Frameworks</strong><br />
First of all we will start of with a model view controller + observer design patterns to achieve a maintainable site.<br />
The web frameworks that we will use are<br />
- <a href='http://backbonejs.org'>backbone js</a>   , giving a "structure" to the code<br />
- <a href='http://requirejs.org'>require js</a>    , setting up javascript dependencies, works like php include<br />
- <a href='http://mustache.github.com'>mustache</a>      , page templates<br />
- <a href='http://jquery.com'>jquery</a>        , dom manipulations</p>
<p>as font icons we can get them for free at <a href="http://fontello.com">fontello</a>, their package includes font-awesome</p>
<p><strong>Folder Structure</strong><br />
<pre class='language-markup'>
  <code>
        index.html
        css/
        templates/      <=== contains the html templates
        js/views/	<=== responsible for inital html materials and listenes to model changes / actions / events
        js/models/ 	<=== responsible for data models
        js/controller/ 	<=== defines the site routes
        blueprints/     <=== contains all the 3rd party library
</code>
</pre>
<p>To setup hashbang (similar to gmail) for page manipulations, there is a backbone module - backbone router.  Using backbone router we can set up page to change dynamically depending on the hashbang setup. To let your hash bang searchable / crawable, checkout this <a href='http://www.alfredkam.com/searchable-hash-bang-seo'>post</a>.</p>
<p>You can checkout the <a href='https://github.com/alfredkam/boilerplates'>Boiler Plate</a> i've setup using this structure for off the shelve deployment.</p>
<p><strong>Further Readings</strong><br />
Backbone Router<br />
- http://backbonetutorials.com/what-is-a-router/</p>
<p>Backbone + MVC<br />
- http://backbonetutorials.com/organizing-backbone-using-modules/<br />
- http://coenraets.org/blog/2011/12/backbone-js-wine-cellar-tutorial-part-1-getting-started/<br />
- http://blog.andyet.com/2010/oct/29/building-a-single-page-app-with-backbonejs-undersc/<br />
- http://backbonetutorials.com/what-is-a-model/</p>
