const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`Bot ready as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  if (
    msg.includes("سكربتات") ||
    msg.includes("سكربت") ||
    msg.includes("السكربت") ||
    msg.includes("السكربتات")
  ) {

    const embed = new EmbedBuilder()
      .setColor(0x2ecc71)
      .setTitle("📦 جميع السكربتات")
      .setDescription("اختر السكربت الذي تريده من القائمة بالأسفل 👇🏻")
      .addFields(
        {
          name: "🕵️ سكربت ماب السرقة",
          value: "https://discord.com/channels/1411623180665098290/1413890559805751439/1462706628511006782"
        },
        {
          name: "🌊 سكربت ماب السرقة (مود التسونامي)",
          value: "https://discord.com/channels/1411623180665098290/1413890559805751439/1466095729251713276"
        },
        {
          name: "⚔️ سكربت ماب سرقة آلة PvP",
          value: "https://discord.com/channels/1411623180665098290/1413890559805751439/1470001617914036248"
        },
        {
          name: "🌪️ سكربت ماب تسونامي الأصلي",
          value: "https://discord.com/channels/1411623180665098290/1413890559805751439/1462786270471393390"
        }
      )
      .setFooter({ text: "Zen Hub Scripts" })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
