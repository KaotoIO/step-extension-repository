#!/bin/bash

build_extension () {
  echo Processing the extension in $1
  cd "$1"
  yarn install
  yarn clean
  yarn build
  current_dir=${PWD##*/}
  mkdir -p "../dist/"
  mv "dist/" "../dist/$current_dir"
}

rm -rf dist

export -f build_extension

find "$PWD" -maxdepth 1 -mindepth 1 -not -name '.*' -type d -exec bash -c 'build_extension "$0"' {} \;
