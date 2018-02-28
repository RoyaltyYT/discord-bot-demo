const Discord = require("discord.js");
const client = new Discord.Client();

function commandIs(str, msg){
	return msg.content.toLowerCase().startsWith("." + str);
}

function pluck(array){
	return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role){
	if(pluck(mem.roles).includes(role)){
		return true;
	} else {
		return false;
	}
}

function clientConnection($status, $game){
	client.user.setStatus($status);
	client.user.setGame($game);
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
	clientConnection("online", "In Use");
});

client.on('message', msg => {
	var args = msg.content.split(/[ ]+/);
	var status = 'online';

	// Bot Say Command
	if(commandIs("say", msg)){
		if(hasRole(msg.member, "Control Bot")){
			for(i = 1; i < args.length; i++){
				msg.channel.sendMessage(args[i]);		
			}
		};
	};
	
	// Status Changer
	if(commandIs("status", msg)){
		if(hasRole(msg.member, "Control Bot")){
			if(args[1] === "online" || "dnd" || "idle" || "invisible"){
				status = args[1];
				client.user.setStatus(status);
			} else {
				console.log("Error : .status")
			}
		}
	}

	if(commandIs("game", msg)){
		if(hasRole(msg.member, "Control Bot")){
			client.user.setGame(args[1]);
		}
	}

	if(commandIs("kick", msg)){
		if(hasRole(msg.member, "Control Bot")){
			if(!msg.guild.member(msg.mentions.users.first()).kickable){
				return msg.reply("You cant kick that user");
			} else {
				if(args.length < 1) {
					return msg.reply("You need to argument a reason.")
				} else if(args.length > 1){
					msg.guild.member(msg.mentions.users.first()).kick();
				}
			}
		}
	}
});

client.login("NDE4MTMzMjkwMTYwMDk1MjQ2.DXhWwA.gOACY7HNYz-9gMLZX_eHxNTxTbc");
