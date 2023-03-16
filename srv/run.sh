#!/bin/bash
# Run go services
# stop, delete and run new dockers instances
# for service countries,regions,municipalities
# Use config from git repo server
# Go to go wks
# build with dockerfile
if [ $# -eq 0 ]
  then
echo "No arguments supplied: ./run.sh {production,dev,tcl,...}"
    exit
fi
env=$1
serviceName=angel
APP_ROOT=~/www/${serviceName}
portOut=3011
portIn=80
if [ "${env}" == "production" ]
	then
	    APP_ROOT=/data/www/${serviceName}
        cd $APP_ROOT || exit
        # Build with dockerfile
        docker rm -f ${serviceName}
        # Build with dockerfile
        docker build --file=${APP_ROOT}"/srv/Dockerfile" --output type=docker  \
        --build-arg environment="${env}" \
        -t alpine/angel .
        echo ".............................Build done, execute cmd docker run ${serviceName}"
        docker run  --name ${serviceName}  \
        -p ${portOut}:${portIn} \
        -v /data/www/${serviceName}/.env.prod:/usr/share/nginx/html/.env \
        -it -d --restart always alpine/angel
    else
        cd $APP_ROOT || exit
        docker rm -f ${serviceName}
        # Build with dockerfile
        docker build --file=$APP_ROOT"/srv/Dockerfile" --output type=docker  \
        --build-arg environment="${env}" \
        -t alpine/angel .

        docker run  --name ${serviceName}  \
        -p ${portOut}:${portIn} \
        -it -d  alpine/angel
       # Docker exec ${serviceName} /start.sh ${env} &
fi

