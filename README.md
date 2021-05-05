# webhook [Name subject to change]
#### tiny server tool for automatic repo pulls

## Description
This app is designed as a simple [webhook](https://en.wikipedia.org/wiki/Webhook) service.
It allows you to automatically respond to code changes on many git platforms that support webhooks, such as:
- [Github](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/manage-webhooks/)
- [Gitlab](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html)
- [Gitea](https://docs.gitea.io/en-us/webhooks/)

...and many others!

## Prerequisites
- Node.js (LTS version or later)
- npm/yarn
- [optional] [pm2](https://github.com/Unitech/pm2)

## Installation

#### Clone and install dependencies
```shell script
git clone https://github.com/rngnrs/webhook
cd webhook
npm i # or `yarn install`
```

#### Setting environment variables
Create `.env` file:
```shell script
cp .env.example .env
# ...edit .env as you wish...
```
Or just use plain variables:
```shell script
PORT=8080 REPO=/var/www/awoo node app 
```
#### Usage
- Run script directly (choose one):
```shell script
npm run start
yarn start
node app
```
- [pm2] Use `pm2`:
```shell script
pm2 start app.js --name awoo-webhook
```
- [systemd] Use self-made services.

Read your system manual.