const generate_category_channel = "493362230012805121"
const generate_text_channel = "595276458524409867"
const generate_voice_channel = "594601612480217089"
const default_options = {
	type: "voice",
	bitrate: 96000,
	parent: generate_category_channel, // "temporary channels" category
	permissionOverwrites: [{
		id: "493360812279201792", // @everyone role
		deny: ["VIEW_CHANNEL"]
	}]
}


module.exports = command = {
	// TODO: remove previous temporary lobbies in case of shutdown
	init: guild => {

	},
	execute: message => {
		if(message.member.voiceChannelID !== generate_voice_channel)
			return message.reply("Must be in the temporary channel lobby!")

		const name = Math.random().toString()
		const options = default_options

		// Add all other mentioned users
		message.mentions.users.forEach(user =>
			options.permissionOverwrites.push({
				id: user,
				allow: ["VIEW_CHANNEL"]
			})
		)

		// Add the author the permission to delete the channel if he wishes to
		options.permissionOverwrites.push({
			id: message.author,
			allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS"]
		})

		message.guild.createChannel(name, options)
			.then(voice_channel => {
				// Move the author to the newly generated channel
				message.member.setVoiceChannel(voice_channel.id)
				// Move everyone else that was mentioned and is in the right voice channel to the newly generated one
				message.mentions.members.forEach(member => {
					if(member.voiceChannelID == generate_voice_channel)
						member.setVoiceChannel(voice_channel.id)
				})
			})
	}
}