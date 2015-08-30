

# Quick Start

1. Checkout the Repository
2. run `npm install` to fetch all node dependencies
3. set up your clone by edititing `src/config/config.json`
4. rename `evesso.example.json` to `evesso.json` and setup an app key here: https://developers.eveonline.com/applications or use the `evesso.localhost.json` if you want to test it locally
5. run `npm start` to start the application, you may change the environment like so: `export NODE_ENV=production` (options see in config.json)

# How to test
1. Set up the database
3. run `npm test` and assert all tests pass

# Cleanup
- In order to delete all sessions you need to delete `sessions/` as well as `session_secret`

# Requirements
- `mysql`
- `node`
- `npm`
