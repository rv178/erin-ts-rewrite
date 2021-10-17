const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to ban.')
                .setRequired(true)),
	async execute(interaction) {
        const member = interaction.options.getMember('user');
        member.ban();

	    interaction.reply(`${member} has been banned.`);
	},
};
