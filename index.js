require("dotenv").config()

const Discord = require("discord.js")
const client = new Discord.Client()

let prefix = "!"


const init = async () => {
  const commands = await require("./commands")

  client.on("message", message => {
    if(message.content.startsWith(prefix)) {
      const message_no_prefix = message.content.substring(prefix.length)
      const command = message_no_prefix.split(" ")[0].toLowerCase()

      if(commands.has(command)) {
        commands.get(command).execute(message)
      } else {
        message.channel.send("Allo, that arent sound the of rights?!?")
      }
    }
  })
  console.log(process.env)
  // Initiate client connection
  client.login(process.env.BOT_TOKEN)
}

init()