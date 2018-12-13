# Brexit news feed

## Description

This is an API that gets the latest brexit news headlines using webtask.io


## Setup

- Run `touch .env`
- Create an API key on https://newsapi.org/ and put it in the `.env` file
- Run `yarn`
- Run `yarn add global wt-cli` to install webtask
- Run `wt init` 
- Run `yarn add global webtask-bundle` to install webtask bundle

## Deployment

- Run `yarn deploy` 

## Usage

- You will get an endpoint after deployment, then simply performa a GET request:

Example using curl:

`curl https://wt-229e6f8cde9e49667547c26f210895e9-0.sandbox.auth0-extend.com/brexit-news-feed | jq .`

## Tests

Run tests using `yarn test`