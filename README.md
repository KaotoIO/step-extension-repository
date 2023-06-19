# step-extension-repository

This is the official step extensions repository for Kaoto.

To add your new step extension here, create a new folder following the [step extension template](step-extension-template). You can follow the [tutorial on how to build step extensions](https://kaoto.io/docs/add-custom-view/) to implement it. Don't forget to add automated tests to your extension.

For your extension to be properly deployed, it must offer the following commands (included by default on the step extension template):
 - `yarn clean` which cleans any previously generated code
 - `yarn install` which downloads all the dependencies needed
 - `yarn build` which generates the static html files in a folder called `dist`
 - `yarn test` which runs your tests to make sure your extension works fine
 
Once your extension is finished, [create a Pull Request](https://github.com/KaotoIO/step-extension-repository/compare) to include it on this repository.
