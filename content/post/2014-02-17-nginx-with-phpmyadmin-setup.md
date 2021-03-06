+++
template = "post"
title = "nginx with changed phpmyadmin directory setup"
tags = ["403", "502", "changed phpmyadmin directory", "phpmyadmin", "nginx", "Dev"]
date = "2014-02-17"
url = "nginx with phpmyadmin setup"
type = "post"
img = "/img/unsplash/tumblr_n2k1499dIp1st5lhmo1_1280.jpg"
+++
<p>Recently decided to setup a nginx / python / mysql lightweight backend to interact with a nodejs services.   So decided to change phpmyadmin directory as well - i did run into 502 / 403 nginx errors, hope this post will help anyone who had the same issues too.</p>
<p>Setup process - assuming you are using ubuntu 12.04LTS</p>
<pre class="language-markup">
<code>
#install mysql & nginx
sudo apt-get install mysql-server mysql-client
sudo apt-get install nginx

#start nginx
sudo service nginx start

#install php5 & phpmyadmin
sudo apt-get install php5-fpm php5-mysql php5-curl php5-gd php5-intl php-pear php5-imagick php5-imap php5-mcrypt php5-memcache php5-ming php5-ps php5-pspell php5-recode php5-snmp php5-sqlite php5-tidy php5-xmlrpc php5-xsl php5-xcache phpmyadmin

#reload php5
sudo service php5-fpm reload
</code>
</pre>
<pre class="language-markup">
<code>
#modify php5-fpm
sudo vi /etc/php5/fpm/pool.d/www.conf
</code>
</pre>
<pre class="language-bash">
<code>
#look for listen and modify as follow
[...]
;listen = 127.0.0.1:9000
listen = /tmp/php5-fpm.sock
[...]
</code>
</pre>
<pre class="language-markup">
<code>
#setup nginx config
sudo vi /etc/nginx/site-enabled/default
</code>
</pre>
<pre class="language-bash">
<code>
#add this after location /
[...]
location /pma {
    alias /usr/share/phpmyadmin/;
}

location ~ ^/pma/(.*\.(js|css|gif|jpg|png))$ {
    alias /usr/share/phpmyadmin/$1;
}

location ~ ^/pma(.+\.php)$ {
    alias /usr/share/phpmyadmin$1;
    fastcgi_pass unix:/tpm/php5-fpm.sock;
    fastcgi_index index.php;

    charset utf8;

    include fastcgi_params;
    fastcgi_param DOCUMENT_ROOT /usr/share/phpmyadmin;
}

#if you want to enable php site wide
location ~ \.php$ {
                try_files $uri =404;
                fastcgi_split_path_info ^(.+\.php)(/.+)$;
                fastcgi_pass unix:/tmp/php5-fpm.sock;
                fastcgi_index index.php;
                include fastcgi_params;
}
[...]
</code>
</pre>
<pre class="language-markup">
<code>
sudo service nginx reload
</code>
</pre>
<p>FYI: The most common 502 / 403 errors are due to this line in the nginx config file. </p>
<pre class="language-bash">
<code>
fastcgi_pass unix:/tmp/php5-fpm.sock; #example using unix:/var/run/php-fpm.sock;
</code>
</pre>
<p>Hopefully this post will help some travellers here.</p>
<p><b>Source</b><br>
<a href="http://stackoverflow.com/questions/17359413/nginx-change-phpmyadmin-directory">stackoverflow</a><br />
<a href="http://www.howtoforge.com/installing-nginx-with-php5-and-php-fpm-and-mysql-support-lemp-on-ubuntu-12.04-lts">howtoforge</a></p>
