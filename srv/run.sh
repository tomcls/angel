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
portOut=3010
portIn=80
if [ "${env}" == "production" ]
	then
	    APP_ROOT=/data/www/${serviceName}
        cd $APP_ROOT || exit
        # Build with dockerfile
        docker rm -f ${serviceName}
        # Build with dockerfile
        docker build --file=${APP_ROOT}"/srv/Dockerfile" \
        --build-arg environment="${env}" \
        -t alpine/nginx .
        echo ".............................Build done, execute cmd docker run ${serviceName}"
        docker run  --name ${serviceName}  \
        -p ${portOut}:${portIn} \
        -it -d --restart always alpine/nginx
    else
        cd $APP_ROOT || exit
        docker rm -f ${serviceName}
        # Build with dockerfile
        docker build --file=$APP_ROOT"/srv/Dockerfile" \
        --build-arg environment="${env}" \
        -t alpine/nginx .

        docker run  --name ${serviceName}  \
        -p ${portOut}:${portIn} \
        -it -d  alpine/nginx
       # Docker exec ${serviceName} /start.sh ${env} &
fi

