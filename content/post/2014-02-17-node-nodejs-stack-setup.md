+++
template = "post"
title = "nginx / nodejs stack setup"
tags = ["Dev", "nginx", "node", "nodejs", "portforward"]
date = "2014-02-17"
type = "post"
url = "nginx nodejs stack setup"
+++
<p>So when you have an nginx + nodejs combo, you want to use <i>nginx to port foward to nodejs</i></p>
<p>my nodejs uses forever to run on port 3000.</p>
<p>here is the nginx config setup</p>
<pre>
<code class="language-bash">
sudo vi /etc/nginx/site-enabled/default
</code>
</pre>
<pre>
<code class="language-bash">
#add this line before server { ... }
[...]
upstream app_nodejs {
        server localhost:3000;
}
[...]

#now in server {...}, assuming you want to map your url root to point to nodejs
location / {
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header Host $http_host;
               proxy_set_header X-NginX-Proxy true;

               proxy_pass http://app_nodejs;
               proxy_redirect off;
           }

</code>
</pre>
<p>Cheers</p>
