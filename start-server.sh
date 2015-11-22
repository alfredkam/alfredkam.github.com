#!/bin/sh

nrsysmond-config --set license_key=$NEWRELIC_LICENSE

/etc/init.d/newrelic-sysmond start
/etc/init.d/nginx start
