+++
template = "post"
title = "Searchable Hash Bang (SEO)"
tags = ["Dev", "ajax", "Dev Notes", "Front-End", "Hash Bang", "JavaScript", "SEO"]
date = "2013-02-01"
+++
<p>Having a dynamic website, AJAX is often used and rely on hash bang to act as a http GET to let the site be interactive.  Inorder to have your application searchable / crawable, there are couple of rules to follow as suggested by <a href='https://developers.google.com/webmasters/ajax-crawling/docs/specification'>the google specs</a>.</p>
<p>Assuming your too lazy to checkout the specs. In summary the hash bang should be setup this way:</p>
<p>In a typical site, you will notice the url with http GET are written in this format<br />
<code><br />
http://yoursite.com?key1=value1&key2=value2<br />
</code><br />
Now in your hashbang, your will want to transform<br />
<code><br />
http://yoursite.com#value1&value2<br />
</code><br />
into beautiful url<br />
<code><br />
http://yoursite.com<strong>#!key1=value1&key2=value2</strong><br />
</code></p>
