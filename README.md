
# Discord Bot

This is a **Discord bot** that allows you to interact with Minecraft servers to check if they are online or offline, as well as other basic administration commands.

## 📂 Project Structure

```
discord-bot/
├── src/
│   └── bot.js          # Main bot file.
├── package.json        # Dependencies and scripts.
└── README.md           # This file.
```

## 🚀 Installation

1. **Clone this repository**:

```bash
git clone https://github.com/ValBoschP/discord-bot.git
cd discord-bot
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up your `.env` file**:

Create a `.env` file in the root directory and add your **Discord TOKEN** and any other necessary configurations.

```env
DISCORD_BOT_TOKEN=your_discord_bot_token
GUILD_ID=your_discord_server_id
CHANNEL_ID=your_discord_channel_id
MC_SERVER=minecraft_ip_address
MC_PORT=25565
```

4. **Start the bot**:

Use PM2 to keep the bot running in the background:

```bash
pm2 start src/bot.js --name discord-bot
pm2 save
pm2 startup
```

## 🔧 Usage

- **Basic command to check the server status**:

   The bot will check if the Minecraft server is **online** or **offline** and update the name of the channel in Discord.

   Example view on Discord Channels:
   
   ```bash
   #🟢online-server
   or
   #🔴offline-server
   ```

## 🛠️ Dependencies

- **discord.js**: The main library to interact with the Discord API.
- **pm2**: Tool to keep the bot running in the background.
- **dotenv**: To load environment variables from the `.env` file.

These dependencies are automatically installed with:

```bash
npm install
```

## 🔒 Security

Make sure to **never share** your **Discord TOKEN** or any sensitive information. Use `.env` to handle these configurations securely.

## 💡 Contributions

If you have ideas or improvements, feel free to open a **pull request**! 😊

## 📄 License

This project is licensed under the **MIT** License. For more details, see the [LICENSE](LICENSE) file.
