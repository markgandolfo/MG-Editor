## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/docs) (`npm i -g yarn`)

## Installation

* `git clone <repository-url>` this repository
* Change into the new directory
* Install dependencies `yarn`

## Dependency management
In `package.json` you will see that dependencies are split into dependencies and devDependencies.
Dependencies are required for the application to run and devDependencies are only required for developing.

### Adding a new dependency
Webpack will take the dependencies listed and combine them into `vendor.js`. When installing a new dependency make sure its adding to the correct location to avoid bundling unessacry scripts into `vendor.js`.

## Running / Development

* `yarn start`
* Visit your app at [http://localhost:8080](http://localhost:8080).

### Building

* `yarn build`
<!-- * `yarn build-production` Optimised bundle -->

