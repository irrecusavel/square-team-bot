# <img src='https://github.com/josejooj/square-team-bot/assets/76636096/4ca01ab0-4523-4f5a-9f50-5242400845da' style="width: 22px; margin-right: 10px;"> Square Team Bot

Square Team Bot is a bot developed to meet the requests of some users to have a moderation team for their Square Cloud applications.<br><br>
Square Team Bot uses the Square Cloud API as a base, but with an own moderation system, where its moderators can perform actions on the applications such as start, restart, stop, search logs, request backup, and more.

## 🤔 How it works

The Square Team Bot is easy to use and fully command-managed, that have 4 slash commands in discord, they are:

- `/ping` -> Returns the discord gateway ping, created only to check if the bot is running<br>
- `/apps` -> This is the main command, with this command you and your moderators will manage the applications<br>
- `/modadd` -> This command adds a moderator for **all applications** (If you want to add only one, use `/apps`)<br>
- `/modlist` -> This command list all your moderators and the applications who they manage (And you can remove a moderator with this command)

## 👩‍💻 Getting the Square Team Bot

### Basic setup

Firstly, check who you have 3 things:

1. Some Discord Bot Token and a Discord Server to use him
2. Your Square Cloud API Key
3. The [last release](https://github.com/josejooj/square-team-bot/releases) of Square Team Bot (download the `distributable.zip`)

### Setting up your instance of Square Team Bot

1. Open the `.env` file on your `distributable.zip`
2. Set the `DISCORD_TOKEN` as your discord bot token
3. Set the `SQUARE_CLOUD_API_KEY` as your Square Cloud API Key

## 💙 Hosting your instance of Square Team Bot

### Hosting on your machine (Your personal computador, VPS, VM...)

1. Install the [node.js](https://nodejs.org/pt-br/download) runtime
2. Unzip the `distributable.zip` into a folder
3. Open your terminal inside the folder
4. Run the command `node .`

### Hosting on Square Cloud

1. Simple access the [Square Cloud Dashboard](https://squarecloud.app/dashboard) and upload your version of `distributable.zip`

## ➕ Additional information

> 🏁 **`Language`**: English<br>
> 🤖 **`Runtime`**: node.js with TypeScript
