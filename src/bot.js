import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { status } from "minecraft-server-util";

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const MC_SERVER = process.env.MC_SERVER;
const MC_PORT = process.env.MC_PORT || 25565;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

async function checkServerStatus() {
  try {
    const response = await status(MC_SERVER, parseInt(MC_PORT));
    console.log(`🟢 Server Online with ${response.players.online} players.`);
    updateChannelName("🟢online-server");
  } catch (error) {
    console.log("🔴 Server Offline.");
    updateChannelName("🔴offline-server");
  }
}

async function updateChannelName(newName) {
  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(CHANNEL_ID);

  if (channel && channel.name !== newName) {
    await channel.setName(newName);
    console.log(`✅ Channel changed to: ${newName}`);
  }
}

client.once("ready", () => {
  console.log(`✅ Bot started as ${client.user.tag}`);
  checkServerStatus();
  setInterval(checkServerStatus, 10000);
});

client.login(TOKEN);
