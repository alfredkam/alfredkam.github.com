# Pull images
FROM ubuntu:14.04
FROM node:4.0.0
MAINTAINER Alfred Kam <kam.alfred@gmail.com>

# Install pygments (for syntax highlighting)
RUN apt-get -qq update \
	&& DEBIAN_FRONTEND=noninteractive apt-get -qq install -y --no-install-recommends python-pygments \
	&& rm -rf /var/lib/apt/lists/*

# Install Nginx
RUN \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx

# Define mountable directories.
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx"]

# Download and install hugo
ENV HUGO_VERSION 0.13
ENV HUGO_BINARY hugo_${HUGO_VERSION}_linux_amd64

ADD https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz /usr/local/
RUN tar xzf /usr/local/${HUGO_BINARY}.tar.gz -C /usr/local/ \
	&& ln -s /usr/local/${HUGO_BINARY}/${HUGO_BINARY} /usr/local/bin/hugo \
	&& rm /usr/local/${HUGO_BINARY}.tar.gz

# Install node packages
ADD package.json /tmp/package.json
ADD startup.sh /tmp/startup.sh
RUN chmod 777 /tmp/startup.sh
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Create working directory
WORKDIR /opt/app
ADD . /opt/app

# Automatically build site + webpack content
RUN mkdir -p public/
RUN mkdir -p /opt/app/static/scripts
RUN node /opt/app/node_modules/webpack/bin/webpack
RUN hugo -d /opt/app/public

# By default, serve site
# ENV HUGO_BASE_URL http://alfredkam.com
# CMD hugo server -b ${HUGO_BASE_URL}

# Add file for serving
RUN cp -r /opt/app/public/* /var/www/html/
ENTRYPOINT ["/tmp/startup.sh"]

# Expose default port
EXPOSE 80
