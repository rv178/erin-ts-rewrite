require('pyx-error-log');

const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.config = require("./config")
client.commands = new Collection();

const signale = require('signale');
const { token } = require('./config.json');

const fs = require('fs');

fs.readdirSync("./commands").forEach(dir => {
	const cmdFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

	for (const file of cmdFiles) {
		const command = require(`./commands/${dir}/${file}`);
		client.commands.set(command.data.name, command)
	}
})

client.once('ready', () => {
	require('./slash')
	signale.debug('Loading..', 'done!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;
	if (!client.commands.has(commandName)) return;

	try {
		await client.commands.get(commandName).execute(interaction);
	} catch (error) {
		signale.fatal(new Error(error));
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);

module.exports = client;
