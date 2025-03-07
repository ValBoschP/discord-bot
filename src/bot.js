import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { status } from "minecraft-server-util";

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const MC_SERVER = process.env.MC_SERVER;
const MC_PORT = process.env.MC_PORT || 25565;

let CHANNEL_NAME = undefined;
let IS_SERVER_ON = undefined;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

/**
 * Check the server status and update the channel name accordingly.
 * If the server is online, the channel name will be 🟢online-server
 * If the server is offline, the channel name will be 🔴offline-server
 * @returns {Promise<void>}
 */
async function checkServerStatus() {
  try {
    const response = await status(MC_SERVER, parseInt(MC_PORT));
    console.log(`🟢 Server Online with ${response.players.online} players.`);
    if (!IS_SERVER_ON) {
      IS_SERVER_ON = true;
      updateChannelName("🟢online-server");
    }
  } catch (error) {
    console.log("🔴 Server Offline.");
    if (IS_SERVER_ON) {
      IS_SERVER_ON = false;
      updateChannelName("🔴offline-server");
    }
  }
}

/**
 * Update the channel name with the new name.
 * @param {string} newName - The new name for the channel.
 * @returns {Promise<void>}
 */
async function updateChannelName(newName) {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(CHANNEL_ID);
    
    if (channel && channel.name !== newName) {
      await channel.setName(newName);
      console.log(`✅ Channel name updated to ${newName}`);
    }
  } catch (error) {
    console.error("❌ Error updating channel name.");
  }
}

/**
 * Event handler for when the bot is ready.
 * @returns {Promise<void>}
 */
client.once("ready", async () => {
  console.log(`✅ Bot started as ${client.user.tag}`);
  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(CHANNEL_ID);
  if (!channel) {
    console.error("Channel does not exist 💀");
    exit(-1);
  }
  CHANNEL_NAME = channel.name;
  IS_SERVER_ON =  channel.name[0] === "🟢" ? true : false;
  checkServerStatus();
  setInterval(checkServerStatus, 10000);
});

client.login(TOKEN);