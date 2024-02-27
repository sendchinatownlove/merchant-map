# SCL Merchant Map

This is a single-page [React](https://reactjs.org/) app that uses [Vite](https://vitejs.dev/)'s build system.

If you're new to Vite, it has a lot of common [defaults](https://vitejs.dev/guide/features.html) including Typescript, CSS Modules, glob importing. Please take a look at what's already available before installing plugins.

# Getting started Developing

1. Clone this repo.
2. Set to node version 18.x, using nvm or similar
3. `npm run dev` to start the Vite server.
4. Visit `http://localhost:3000` to see your app.
5. Make changes to the code to see it update live.

Make an `.env` file in the root directory and store your key as shown in the `.env.example` file. You will need the following keys and IDs in your `.env` file

- Google Maps API key: You can get an API key by following the instructions from Google [here](https://developers.google.com/maps/documentation/javascript/get-api-key).
- Map ID: Ask Jacob for this.

# Creating a production build

- `npm run build`
- See vitejs.dev for other plugins and tooling, such as using [Env variables](https://vitejs.dev/guide/env-and-mode.html)


# deploy 
- `npm install -g firebase-tools`
- `firebase login`
- `firebase deploy` ** should need google cloud console access to sendchinatownlove project


# legacy info
- this app was built using node 14 and yarn
- currently working tenously with node 18 and npm
- looks like the google apis and may other packages are reaching end of life
- our airtable data source has been moved and broken
- the data has been manually added to the repo for the time being