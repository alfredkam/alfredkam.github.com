+++
template = "post"
title = "installing mysql-python on mac"
url = "installing mysql-python on mac"
type = "post"
tags = ["documentation", "flask","mac","mysql-python","sqlalchemy"]
date = "2014-02-18"
img = "/img/unsplash/tumblr_n2k1499dIp1st5lhmo1_1280.jpg"
+++
<p>Awesome next challenge - running a flask server to connect to a MAMP [2.1.3] sql server on a mac (mavericks).  Flask is a light weight python server and uses flask-sqlalchemy to connect.  Installing mysql-python seems to be a challenge.</p>
<pre class='language-bash'>
<code>
#assuming you've already installed xcode & homebrew
brew install mysql   #use brew install mysql --universal if your not using 64bit
</code>
</pre>
<p>Go to <a href="http://dev.mysql.com/downloads/mysql/">dev mysql</a><br />
download the latest release and decompress the file.</p>
<pre class='language-bash'>
<code>
cd /path/to/download/
tar -xvf mysql-*.tar.gz
cd /path/to/extract/
mkdir /Applications/MAMP/Library/include
cp -r include/* /Applications/MAMP/Library/include
cp -r lib/* /Applications/MAMP/Library/lib

export ARCHFLAGS="-arch $(uname -m)"
export PATH=$PATH:/Applications/MAMP/Library/bin
export DYLD_LIBRARY_PATH=/Applications/MAMP/Library/lib

sudo easy_install mysql-python
</code>
</pre>
<p>FYI: this line will cause trouble with git</p>
<pre class='language-bash'>
<code>
export DYLD_LIBRARY_PATH=/Applications/MAMP/Library/lib
</code>
</pre>
<p>Rebooting your computer will clear it.</p>
<p>On a side note, when your connecting to the MAMP sql, python may complain mysql.sock is missing.  It is located under</p>
<pre class='language-bash'>
<code>
/Applications/MAMP/tmp/mysql/mysql.sock
</code>
</pre>
<p><strong>Additional Source</strong><br />
<a href="http://racingtadpole.com/blog/mamp-python-and-mysqldb/">mamp-python-mysql</a><br />
<a href="http://stackoverflow.com/questions/17920115/python-mysqldb-again-symbol-not-found-mysql-affected-rows">stackoverflow</a></p>
