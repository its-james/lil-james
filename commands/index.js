const fs = require("fs")
module.exports = function() {
	const commands = new Map()
	fs
		.readdirSync("./commands")
		.filter(filename => filename != "index.js")
		.forEach(filename => commands.set(filename.slice(0, -3), require(`./${filename}`)))

	return commands
}()