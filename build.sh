#!/bin/bash
yarn install --immutable
yarn workspaces foreach --exclude "@kaoto/step-extension-repository" --parallel --verbose run clean
yarn workspaces foreach --exclude "@kaoto/step-extension-repository" --topological-dev --parallel --verbose run build

rm -rf ./dist
mkdir -p ./dist

yarn workspaces foreach --exclude "@kaoto/step-extension-repository" --exclude step-extension-template --exclude common --parallel --verbose exec bash -c 'working_folder=${PWD##*/}; cp -r "${PWD}/dist/" "../dist/${working_folder}"'
