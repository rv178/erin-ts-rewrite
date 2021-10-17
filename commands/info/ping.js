const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the bot latency.'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });

		interaction.editReply(`Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};
