# Flower Shop

## Overview

This is the codebase for the Flower shop e-commerce website, where customers can browse and purchase beautiful flower arrangements online.

## Purpose

The primary purpose of Flower Shop is to create a user-friendly online marketplace where customers can easily browse, select, customize, and purchase flowers from the comfort of their homes. By leveraging technology, we aim to streamline the process of buying flowers while ensuring the highest quality products and customer satisfaction.

## Technology stack

HTML5
CSS3
JavaScript (ES6+)
Typescript
React.js
CommerceTools

Tools for code improvement: Eslint, Prettier, Husky
Testing: Jest

## Available Scripts

In the project directory, you can run:

### `npm run lint`

Runs eslint and checks all the eslintrc.json file configured rules.

### `npm run lint:fixed`

Runs eslint --fix to fix eslint errors.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage`

This script will run all tests with Jest and generate a coverage report, showing how much of code is covered by the tests.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run format`

Runs prettier which formats code based on rules written in .prettierrc file.

### `npm run eject`

### `npm pre-commit`

Runs prettier, eslint and tests before commit.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## instructions for setting up and running the project locally

### `git clone https://github.com/NataliaIv90/ecommerce-app.git`

Downloads project repository.

### `cd ecommerce-app`

Move to the project directory.

### `npm install`

Installs all dependancies.

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## `Project keys`

You can use the project by putting the key values
given for you after registering on the commercetools platform.

REACT_APP_API_HOST_URL={{host}}

REACT_APP_API_PROJECT_KEY={{project_key}}

REACT_APP_API_AUTH_URL={{auth_url}}

REACT_APP_API_CLIENT_ID={{client_id}}

REACT_APP_API_CLIENT_SECRET={{client_secret}}

REACT_APP_API_SCOPES={{scopes}}
