const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the bot latency.'),
	async execute(interaction) {
	interaction.reply(`yes, test cmd`);
	},
};
