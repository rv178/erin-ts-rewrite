const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const log = require(require("path").join(__dirname,"../logger"))

module.exports = async (client) => {
	const eventFiles = await globPromise(`${process.cwd()}/Events/*/*.js`);
	eventFiles.forEach((file)=>{
		file = file.replace(/\.js$/,"");
		require(file)
		log.warn(`Event file: ${file}.js loaded.`)
	});
    log.debug(`All event files loaded!`)

	const arrayOfSlashCommands = [];
	const slashCommands = await globPromise(`${process.cwd()}/Commands/*/*.js`);
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);
		log.warn(`Slash command file: ${JSON.stringify(file, null, 4)} loaded.`);
        arrayOfSlashCommands.push(file);
    });
    log.debug(`Slash commands loaded!`)

	client.on("ready", async () => {
		//await client.guilds.cache.get("add development guild name").commands.set(arrayOfSlashCommands);
		//await client.application.commands.set(arrayOfSlashCommands);
		//log.debug(`Slash Commands Registered!`)
	});
};
