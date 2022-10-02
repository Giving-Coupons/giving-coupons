## Giving Coupons

### IMPORTANT

RUN `./enable-githooks.sh` to enable the git hooks that will run the linting before you push.

### Frontend

1. Install nvm
1. Install node
1. Install yarn
1. Install dependencies: `yarn install`
1. Run the app: `yarn dev` (this will start the app on port 3000)

### Backend

1. Install rbenv
1. Install ruby 3.0.3
1. Install dependencies: `bundle install`
1. Set up database if it does not exist (for development, set username and password
   to `postgres` and ensure it is accessible at `localhost:5432`).
1. Run `rails db:create` if it is a freshly created database
1. Run `rake db:migrate` if your database has not been migrated to the latest version
1. Run the app: `bundle exec rails s -p 4000` (this will start the app on port 4000)

