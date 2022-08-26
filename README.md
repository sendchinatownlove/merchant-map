# SCL Merchant Map

This is a single-page [React](https://reactjs.org/) app that uses [Vite](https://vitejs.dev/)'s build system.

If you're new to Vite, it has a lot of common [defaults](https://vitejs.dev/guide/features.html) including Typescript, CSS Modules, glob importing. Please take a look at what's already available before installing plugins.

# Getting started Developing

1. Clone this repo.
2. Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [yarn](https://yarnpkg.com/).
3. `yarn dev` to start the Vite server.
4. Visit `http://localhost:3000` to see your app.
5. Make changes to the code to see it update live.

Make an `.env` file in the root directory and store your key as shown in the `.env.example` file. You will need the following keys and IDs in your `.env` file

- Google Maps API key: You can get an API key by following the instructions from Google [here](https://developers.google.com/maps/documentation/javascript/get-api-key).
- Map ID: Ask Jacob for this.

# Creating a production build

- `yarn build`
- See vitejs.dev for other plugins and tooling, such as using [Env variables](https://vitejs.dev/guide/env-and-mode.html)


# deploy 
- `npm install -g firebase`
- `firebase login`
- `firebase deploy` ** should need google cloud console access to sendchinatownlove project