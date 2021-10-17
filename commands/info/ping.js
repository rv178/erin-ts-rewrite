const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const client = require("../../index.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the bot latency.'),
	async execute(interaction) {

	interaction.reply("Ping Pong")
},
};