# Pull images
FROM ubuntu:14.04
FROM node:4.0.0
MAINTAINER Alfred Kam <kam.alfred@gmail.com>

# Install pygments (for syntax highlighting)
RUN apt-get -qq update \
	&& DEBIAN_FRONTEND=noninteractive apt-get -qq install -y --no-install-recommends python-pygments \
	&& rm -rf /var/lib/apt/lists/*

# Install NGINX
RUN \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx

# Install New Relic
RUN (wget -O - https://download.newrelic.com/548C16BF.gpg | apt-key add - && \
  sh -c 'echo "deb http://apt.newrelic.com/debian/ newrelic non-free" > /etc/apt/sources.list.d/newrelic.list' && \
	apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y newrelic-sysmond && \
	apt-get clean)

# Define mountable directories.
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx"]

# Download and install HUGO
ENV HUGO_VERSION 0.13
ENV HUGO_BINARY hugo_${HUGO_VERSION}_linux_amd64

ADD https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz /usr/local/
RUN tar xzf /usr/local/${HUGO_BINARY}.tar.gz -C /usr/local/ \
	&& ln -s /usr/local/${HUGO_BINARY}/${HUGO_BINARY} /usr/local/bin/hugo \
	&& rm /usr/local/${HUGO_BINARY}.tar.gz

# Install NODE packages
ADD package.json /tmp/package.json
ADD start-server.sh /tmp/start-server.sh
RUN chmod 777 /tmp/start-server.sh
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Create working directory
WORKDIR /opt/app
ADD . /opt/app

# Base on `config.toml`, automatically build a production copy of the site
# And Webpack the javascript bundle
RUN mkdir -p public/
RUN mkdir -p /opt/app/static/scripts
RUN node /opt/app/node_modules/webpack/bin/webpack
RUN hugo -d /opt/app/public

# Add static files to serve
RUN cp -r /opt/app/public/* /var/www/html/
ENTRYPOINT ["/tmp/start-server.sh"]

# Expose default port
EXPOSE 80
