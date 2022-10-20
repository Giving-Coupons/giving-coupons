# Giving Coupons Frontend

## Getting Started

1. Install nvm by following the instructions [here](https://github.com/nvm-sh/nvm#install--update-script).
   Then, install the Node version in `.nvmrc` via:
   ```sh
   nvm install <version>
   ```
1. Install Yarn for dependency management.
   ```sh
   npm install --global yarn
   ```
1. Install the project dependencies.
   ```sh
   yarn install
   ```
1. Set up the necessary environment variables by creating a `.env` file in the frontend directory. Refer to `.env.example` for the list of required variables.
   **Make sure not to commit any credentials added here.**
1. Start the React application.
   ```sh
   $ yarn start
   ```

## Linting

To run the linter:

```sh
yarn lint
```

Some lint errors can be auto-corrected:

```sh
yarn lint:fix
```
