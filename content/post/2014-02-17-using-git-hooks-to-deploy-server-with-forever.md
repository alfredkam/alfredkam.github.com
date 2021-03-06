+++
template = "post"
title = "using git hooks to deploy server with forever"
url = "using git hooks to deploy server with forever"
type = "post"
tags = ["automatic deploy","dev-guide","eacces issue","flask","forever","git","git hooks","hooks","init.d service","nodejs","npm","python"]
date = "2014-02-17"
img = "/img/unsplash/tumblr_n1iq25Wq701st5lhmo1_1280.jpg"
+++
<p>If you love deploying with automation and you love the fact you dont need to touch your server (which you should!).  I've setup this up on an ec2 ubuntu 12.04 LTS, shouldnt differ too much with other ubuntu versions.  At this time of writing i'm setting up a nodejs / flask server</p>
<p>On your remote server</p>
<pre><code class='language-markup'>
#install forever and give it global access
sudo npm install -g forever
</code></pre>
<pre class='language-markup'><code>
#setup git bare at your deployment server
git clone --bare [repo url]
</code></pre>
<pre class='language-markup'><code>
#add the hooks
#navigate into your git folder
cd path/to/repo/hooks
vi pre-receive
</code></pre>
<pre class='language-bash'><code>
#!/bin/sh
echo "stopping server service"
service nodejs-www stop
</code></pre>
<pre class='language-bash'><code>
vi post-receive
</code></pre>
<pre class='language-bash'><code>
#!/bin/sh
echo "checkout the files"

branch=$(git branch | grep "*" | sed "s/* //")

if [ "$branch" = "master" ]
then
        echo "Master branch"
        git --work-tree=/home/ubuntu/app/www checkout -f
        echo "Successfully checked out master branch"
else
        echo "Not master branch"
fi

echo "start service"
service nodejs-www start
</code></pre>
<pre class='language-markup'><code>
sudo chmod +x pre-receive;
sudo chmod +x post-receive;
</code></pre>
<p>FYI: Just make sure the folders are created for the "git --work-tree"</p>
<pre><code class='language-markup'>
#navigate into init.d to create a service
cd /etc/init.d
sudo vi nodejs-www
</code></pre>
<pre class='language-bash'><code>
#! /bin/sh
# /etc/init.d/nodejs-www
#

NAME=nodejs-www
APP=index.js
APP_DIR=/home/ubuntu/app/www
forever=/usr/local/bin/forever
export PATH=$PATH:/usr/local/bin/
LOG=/var/log/nodejs-www.log

case "$1" in
  start)
    cd $APP_DIR
    echo "Starting $NAME"
    #I detached the message to 'screen', it is not a requirement
    screen -d -m /usr/bin/sudo -u ubuntu $forever --minUptime 5000 --spinSleepTime 2000 -a -l $LOG start $APP
    #if to run a python server use
    #screen -d -m /usr/bin/sudo -u ubuntu $forever --minUptime 5000 --spinSleepTime 2000 -a -l $LOG start -c python $APP
    echo "Started $Name"
    exit 0
    ;;
  stop)
    echo "Stopping script $NAME"
    cd $APP_DIR
    /usr/bin/sudo -u ubuntu $forever stop $APP
    exit 0
    ;;
  list)
    echo "List"
    /usr/bin/sudo -u ubuntu $forever list
    exit 0
    ;;
  *)
    echo "Usage: /etc/init.d/nodejs-www {start|stop|list}"
    exit 1
    ;;
esac

exit 0
</code></pre>
<p>FYI: Many others were able to run forever directly without having "/usr/bin/sudo -u ubuntu" (ubuntu is the user account) or substituting it with "sudo".  For my case on an amazon aws, without it, i ran into permission issues with forever and nodejs directory mapping issues.</p>
<p>A permission error similar to this:</p>
<pre><code class='language-javascript'>
fs.js:0
(function (exports, require, module, __filename, __dirname) { // Copyright Joy
^
Error: EACCES, permission denied '/root/.forever/pids/FepR.pid'
    at Object.fs.openSync (fs.js:410:18)
    at Object.fs.writeFileSync (fs.js:956:15)
    at writePid (/usr/local/lib/node_modules/forever/bin/monitor:13:6)
    at null.<anonymous> (/usr/local/lib/node_modules/forever/bin/monitor:46:5)
    at EventEmitter.emit (/usr/local/lib/node_modules/forever/node_modules/forever-monitor/node_modules/broadway/node_modules/eventemitter2/lib/eventemitter2.js:332:22)
    at /usr/local/lib/node_modules/forever/node_modules/forever-monitor/lib/forever-monitor/monitor.js:153:10
</code></pre>
<p>Now to wrap up the server side</p>
<pre><code class='language-markup'>
sudo chmod a+x nodejs-www
cd /var/log
sudo touch nodejs-www.log
sudo chmod 777 nodejs-www.log
</code></pre>
<p>Add to rc.local to start upon server start</p>
<pre><code class='language-markup'>
sudo vi /etc/rc.local
</code></pre>
<pre><code class='language-markup'>
#!/bin/sh -e
service nodejs-www start
exit 0
</code></pre>
<p>For some you may need to change the rc.local permission to executable.</p>
<p>If i didnt miss anything this should it for the server</p>
<p>Now on client side</p>
<pre><code class='language-markup'>
cd path/to/repo
git remote add deploy [remote server repo url]
git commit -am 'test deploy'
git push deploy master
</code></pre>
<p>This should be it, and the service should automatically stop and restart itself.  If i missed anything let me know :)</p>
