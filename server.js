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

  const msg = message.content.toLowerCase().trim();

  // قائمة الكلمات الرئيسية
  const commands = ["سكربت", "سكربتات", "السكربت", "سكرب"];

  // -----------------------------
  // 1️⃣ Hint إذا كتب بدون نقطة
  // -----------------------------
  if (!msg.startsWith(".") && commands.includes(msg)) {
    return message.reply("⚠️ إذا تبي تطلع لك السكربتات اكتب `.سكربت`");
  }

  // -----------------------------
  // 2️⃣ الرد على الأمر مع نقطة
  // -----------------------------
  if (msg.startsWith(".")) {
    const command = msg.slice(1); // إزالة النقطة
    if (commands.includes(command)) {

      const embed = new EmbedBuilder()
        .setColor(0x2ecc71)
        .setTitle("📦 جميع السكربتات")
        .setDescription("اختر السكربت الذي تريده من القائمة 👇🏻")
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

      return message.reply({ embeds: [embed] });
    }
  }
});

client.login(process.env.TOKEN);
