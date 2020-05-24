#!/bin/bash

curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version $YARN_VERSION

/root/.yarn/bin/yarn global add webpack-cli