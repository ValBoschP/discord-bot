import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { status } from "minecraft-server-util";


const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID; 
const CHANNEL_ID = process.env.CHANNEL_ID; 
const MC_SERVER = process.env.MC_SERVER; 
const MC_PORT = process.env.MC_PORT || 25565; 


const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});


async function checkServerStatus() {
  try {
    const response = await status(MC_SERVER, parseInt(MC_PORT));
    console.log(`🟢 Servidor online con ${response.players.online} jugadores.`);
    updateChannelName("🟢online-server-");
  } catch (error) {
    console.log("🔴 Servidor offline.");
    updateChannelName("🔴offline-server");
  }
}

async function updateChannelName(newName) {
  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(CHANNEL_ID);

  if (channel && channel.name !== newName) {
    await channel.setName(newName);
    console.log(`✅ Canal actualizado a: ${newName}`);
  }
}

client.once("ready", () => {
  console.log(`✅ Bot iniciado como ${client.user.tag}`);
  checkServerStatus();
  setInterval(checkServerStatus, 10000); 
});

client.login(TOKEN);
