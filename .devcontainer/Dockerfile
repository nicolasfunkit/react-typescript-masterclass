# Update the NODE_VERSION arg in docker-compose.yml to pick a Node version: 18, 16, 14
ARG NODE_VERSION=16
FROM mcr.microsoft.com/devcontainers/javascript-node:${NODE_VERSION}

# Hugo dev server port
EXPOSE 1313

# [Optional] Uncomment this section to install additional OS packages you may want.
#
#RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && go install github.com/go-task/task/v3/cmd/task@latest
#RUN sudo -u node go install github.com/go-task/task/v3/cmd/task@latest
# [Optional] Uncomment if you want to install more global node packages
# RUN sudo -u node npm install -g <your-package-list-here>

