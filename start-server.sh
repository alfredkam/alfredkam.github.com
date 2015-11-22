#!/bin/sh

# Set New Relic License & Name
nrsysmond-config --set license_key=$NEWRELIC_LICENSE
nrsysmond-config --set hostname=$NEWRELIC_HOSTNAME

# Start Services
/etc/init.d/newrelic-sysmond start
/etc/init.d/nginx start
