const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to kick.')
                .setRequired(true)),
	async execute(interaction) {
        	const member = interaction.options.getMember('user');
        	member.kick();
	    	interaction.reply(`${member} has been kicked.`);
	},
};
