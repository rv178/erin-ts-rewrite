const Discord = require("discord.js")
const Dotenv = require("dotenv");
const Path = require("path");
const logger = require("./logger");

// Initializing .env file
Dotenv.config({ path: Path.join(__dirname,"../.env") });

// Initializing the client object
const client = new Discord.Client({ 
	intents: new Discord.Intents([Discord.Intents.FLAGS.GUILD_VOICE_STATES,Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]).remove([Discord.Intents.FLAGS.DIRECT_MESSAGES])
});

// Client configs
client.emoji = { "bd":"<:bd:886912421229379594>"}
client.events = new Discord.Collection()
client.slashCommands = new Discord.Collection();
require("./Handler")(client);

process.on('unhandledRejection', async (err) => {
	const webhookClient = new WebhookClient({ url: process.env.ERROR_LOG});

    const errEmbed = new Discord.MessageEmbed().setTitle('Error!')
        .setDescription("```" + err.stack + "```")
        .setTimestamp()
        .setColor("RED")

    log.error(`[Error!] ${err.stack}`)

    webhookClient.send({
        username: "Error logging",
        embeds: [errEmbed]
    })

});

client.login(process.env.BOT_TOKEN);
module.exports = client;
