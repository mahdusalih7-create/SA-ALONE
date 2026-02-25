const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ComponentType 
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const commands = ["سكربت", "سكربتات", "السكربت", "السكربتات"];

// مجموعة لتخزين المستخدمين الذين أغلقوا الـ Hint
const disabledHintUsers = new Set();

client.on("ready", () => {
  console.log(`Bot ready as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const msg = message.content.toLowerCase();

  // -----------------------------
  // 1️⃣ إذا وجد أي كلمة مفتاحية في أي مكان (Hint)
  // -----------------------------
  if (!msg.startsWith(".") && !disabledHintUsers.has(message.author.id)) {
    for (const cmd of commands) {
      if (msg.includes(cmd)) {

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("close_hint_permanent")
            .setLabel("اغلاق الملاحظة للابد")
            .setStyle(ButtonStyle.Danger)
        );

        const hintMsg = await message.reply({
          content: "⚠️ إذا تبي تطلع لك السكربتات اكتب `.سكربت`",
          components: [row]
        });

        const collector = hintMsg.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 60000
        });

        collector.on("collect", async (interaction) => {
          if (interaction.customId === "close_hint_permanent" && interaction.user.id === message.author.id) {
            disabledHintUsers.add(interaction.user.id);
            await interaction.update({ content: "✅ تم إغلاق الملاحظة للأبد", components: [] });
          } else {
            await interaction.reply({ content: "❌ انت غير مسموح لك باغلاق الملاحظة", ephemeral: true });
          }
        });

        return;
      }
    }
  }

  // -----------------------------
  // 2️⃣ الرد على الأمر مع نقطة
  // -----------------------------
  if (msg.startsWith(".")) {
    const command = msg.slice(1);
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
          },
          {
            name: "🔥 سكربت ماب اللافا",
            value: "https://discord.com/channels/1411623180665098290/1413890559805751439/1476270639496171632"
          }
        )
        .setFooter({ text: "SA | ALONE" })
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    }
  }
});

client.login(process.env.TOKEN);
