# Giving Coupons Backend

## Getting Started

1. Install rbenv by following the instructions [here](https://github.com/rbenv/rbenv#installation).
   This will allow you to manage multiple Ruby versions on your system.
1. Install ruby-build which is available as a rbenv plugin by following the instructions [here](https://github.com/rbenv/ruby-build#installation).
1. Install the version of Ruby specified in `.ruby-version`.
   ```sh
   rbenv install <version>
   ```
1. Install Bundler for managing dependencies.
   ```sh
   gem install bundler
   ```
1. Install dependencies.
   ```sh
   bundle install
   ```
1. Install PostgreSQL by following the instructions [here](https://www.postgresql.org/download/). By default, the application will connect to a database named `giving_coupons_development` on `localhost` with the username `postgres` and password `postgres`.
1. Create and migrate the database.
   ```sh
   bundle exec rails db:setup
   ```
1. Set up the necessary environment variables by creating a `.env` file in the backend directory. Refer to `.env.example` for the list of required variables.
1. Start the server on port 4000.
   ```sh
   bundle exec rails s -p 4000
   ```

## Migrating Database

To apply new migrations to the database, run:

```sh
bundle exec rails db:migrate
```

If the state of your database is out of sync, you can drop it and recreate it as such:

```sh
bundle exec rails db:migrate:reset
```

## Seeding Database

To seed the database:

```sh
bundle exec rails db:seed
```

## Linting

To run the linter:

```sh
bundle exec rubocop
```

Some lint errors can be auto-corrected:

```sh
bundle exec rubocop -A
```
