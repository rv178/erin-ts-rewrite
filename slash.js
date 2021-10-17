require('pyx-error-log');
const client = require("./index")
const signale = require('signale');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

const commands = [];

fs.readdirSync("./commands").forEach(dir => {

	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
	const command = require(`./commands/${dir}/${file}`);
	commands.push(command.data.toJSON());
}
})

const clientId = client.user.id
const guildId = client.config.guildid

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		signale.pending('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		signale.success('Successfully reloaded application (/) commands.');
	} catch (error) {
		signale.fatal(new Error(error));
	}
})();
