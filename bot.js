const Discord = require('discord.js')
const client = new Discord.Client()
const rbx = require('noblox.js')
const fs = require('fs')

const config = require('./config.json')
rbx.cookieLogin(config.cookie)

client.on('ready', () => {

    console.log('Graceful Bot is logged in on Discord.')
    client.user.setActivity(`The Graceful Bloodline | ${config.prefix}help`, {type:"WATCHING"})

})

client.on('message', async msg => {

    const msgContent = msg.content
    const args = msgContent.split(' ')
    const argLength = args.length
    const prefix = config.prefix

    if (msg.content.startsWith(`${config.prefix}help`)) {

        const helpembed = new Discord.MessageEmbed()
            .setAuthor('Graceful Bot | Command List', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
            .addField(`${prefix}promote [user]`, 'Promotes a user to the next available rank.', false)
            .addField(`${prefix}demote [user]`, 'Demotes a user to the next available rank.', false)
            .addField(`${prefix}setrank [user] [rank ID]`, 'Sets a user to the rank ID specified.', false)
            .addField(`${prefix}xp [user]`, "Checks a person's current XP level.", false)
            .addField(`${prefix}add [user] [xp]`, "Adds the specified amount of XP to the user.", false)
            .addField(`${prefix}remove [user] [xp]`, "Removes the specified amount of XP from the user.", false)
            .setTimestamp()
            .setFooter('The Graceful Bloodline')
            .setColor("GREEN")
        msg.channel.send(helpembed)

    }

    if (msg.content.startsWith(`${prefix}promote`)) {

        if(msg.member.roles.cache.some(role =>[config.approvedRole].includes(role.name))){

            if (argLength === 2) {

                var username = args[1]
            
                rbx.getIdFromUsername(username).then(id => {

                    rbx.promote(config.groupId, id).then(roles => {

                        var newRole = roles.newRole.name
                        var oldRole = roles.oldRole.name

                        const okcool = new Discord.MessageEmbed()
                            .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                            .setDescription("**Successful Promotion**")
                            .addField('Target User', `[${username}](https://roblox.com/users/${id}/profile)`, false)
                            .addField('Previous Rank', oldRole, false)
                            .addField('New Rank', newRole, false)
                            .setTimestamp()
                            .setFooter('The Graceful Bloodline')
                            .setColor("GREEN")
                        msg.channel.send(okcool)

                    }).catch(function(err) {

                        const wrongembed = new Discord.MessageEmbed()
                            .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                            .setDescription("The user could not be promoted. Perhaps they have achieved the max promotable rank?")
                            .setTimestamp()
                            .setFooter('The Graceful Bloodline')
                            .setColor("RED")
                        msg.channel.send(wrongembed)

                    })

                }).catch(function(err) {
                    
                    const wrongembed = new Discord.MessageEmbed()
                        .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                        .setDescription("The user does not exist on ROBLOX. Please try again.")
                        .setTimestamp()
                        .setFooter('The Graceful Bloodline')
                        .setColor("RED")
                    msg.channel.send(wrongembed)

                })

            }
        
        } else {

            const wrongembed = new Discord.MessageEmbed()
                .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                .setDescription("You have insufficient permissions.")
                .setTimestamp()
                .setFooter('The Graceful Bloodline')
                .setColor("RED")
            msg.channel.send(wrongembed)

        }

    }

    if (msg.content.startsWith(`${prefix}demote`)) {

        if(msg.member.roles.cache.some(role =>[config.approvedRole].includes(role.name))){

            if (argLength === 2) {

                var username = args[1]
            
                rbx.getIdFromUsername(username).then(id => {

                    rbx.demote(config.groupId, id).then(roles => {

                        var newRole = roles.newRole.name
                        var oldRole = roles.oldRole.name

                        const okcool = new Discord.MessageEmbed()
                            .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                            .setDescription("**Successful Demotion**")
                            .addField('Target User', `[${username}](https://roblox.com/users/${id}/profile)`, false)
                            .addField('Previous Rank', oldRole, false)
                            .addField('New Rank', newRole, false)
                            .setTimestamp()
                            .setFooter('The Graceful Bloodline')
                            .setColor("GREEN")
                        msg.channel.send(okcool)

                    }).catch(function(err) {

                        const wrongembed = new Discord.MessageEmbed()
                            .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                            .setDescription("The user could not be demoted. Perhaps they're above the bot in the group or they're at the lowest rank?")
                            .setTimestamp()
                            .setFooter('The Graceful Bloodline')
                            .setColor("RED")
                        msg.channel.send(wrongembed)

                    })

                }).catch(function(err) {
                    
                    const wrongembed = new Discord.MessageEmbed()
                        .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                        .setDescription("The user does not exist on ROBLOX. Please try again.")
                        .setTimestamp()
                        .setFooter('The Graceful Bloodline')
                        .setColor("RED")
                    msg.channel.send(wrongembed)

                })

            }
        
        } else {

            const wrongembed = new Discord.MessageEmbed()
                .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                .setDescription("You have insufficient permissions.")
                .setTimestamp()
                .setFooter('The Graceful Bloodline')
                .setColor("RED")
            msg.channel.send(wrongembed)

        }

    }

    if (msg.content.startsWith(`${prefix}setrank`)) {

        if(msg.member.roles.cache.some(role =>[config.approvedRole].includes(role.name))){

            if (argLength === 3) {

                var username = args[1]
            
                rbx.getIdFromUsername(username).then(async id => {

                    if (!isNaN(args[2])) {

                        rbx.setRank(config.groupId, id, Number(args[2])).then(async roles => {

                            rbx.getRole(config.groupId, Number(args[2])).then(role => {

                                var name = role.name

                                const okcool = new Discord.MessageEmbed()
                                    .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                    .setDescription("**Successful Rank Change**")
                                    .addField('Target User', `[${username}](https://roblox.com/users/${id}/profile)`, false)
                                    .addField('New Rank', name+' (ID: '+args[2]+')', false)
                                    .setTimestamp()
                                    .setFooter('The Graceful Bloodline')
                                    .setColor("GREEN")
                                msg.channel.send(okcool)
                            })

                            
    
                        }).catch(function(err) {
    
                            const wrongembed = new Discord.MessageEmbed()
                                .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                .setDescription("The user could not be demoted. Perhaps they are above the bot in the group or the role doesn't exist?")
                                .setTimestamp()
                                .setFooter('The Graceful Bloodline')
                                .setColor("RED")
                            msg.channel.send(wrongembed)

                        })

                    } else {

                        const wrongembed = new Discord.MessageEmbed()
                            .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                            .setDescription("For the third argument you must provide a valid number from 1 to 255.")
                            .setTimestamp()
                            .setFooter('The Graceful Bloodline')
                            .setColor("RED")
                        msg.channel.send(wrongembed)

                    }

                    
                }).catch(function(err) {
                    
                    const wrongembed = new Discord.MessageEmbed()
                        .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                        .setDescription("The user does not exist on ROBLOX. Please try again.")
                        .setTimestamp()
                        .setFooter('The Graceful Bloodline')
                        .setColor("RED")
                    msg.channel.send(wrongembed)

                })

            }
        
        } else {

            const wrongembed = new Discord.MessageEmbed()
                .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                .setDescription("You have insufficient permissions.")
                .setTimestamp()
                .setFooter('The Graceful Bloodline')
                .setColor("RED")
            msg.channel.send(wrongembed)

        }

    }

    if (msg.content.startsWith(`${prefix}xp`)) {

        if (argLength === 2) {

            rbx.getIdFromUsername(args[1]).then(id => {

                rbx.getRankInGroup(config.groupId, id).then(async rank => {

                    if (!rank>0) {

                        const wrongembed = new Discord.MessageEmbed()
                            .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                            .setDescription("The user is not in the group.")
                            .setTimestamp()
                            .setFooter('The Graceful Bloodline')
                            .setColor("RED")
                        msg.channel.send(wrongembed)

                    }

                    else {

                        let rankInGroup1 = await rbx.getRole(config.groupId, rank)
                        let rankInGroup = rankInGroup1.name

                        if (fs.existsSync(`./users/${id}.json`)) {

                            var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                            var parsed = JSON.parse(content)
                            var currentXP = parsed.XP

                            const okcool = new Discord.MessageEmbed()
                                .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                .addField('User', `[${args[1]}](https://roblox.com/users/${id}/profile)`, false)
                                .addField('XP', '**'+currentXP+'**', false)
                                .addField('Current Group Rank', rankInGroup, false)
                                .setTimestamp()
                                .setFooter('The Graceful Bloodline')
                                .setColor("GREEN")
                            msg.channel.send(okcool)
                            
                            
                        } else {

                            fs.writeFileSync(`./users/${id}.json`, JSON.stringify({"XP":0}))
                            const okcool = new Discord.MessageEmbed()
                                .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                .addField('User', `[${args[1]}](https://roblox.com/users/${id}/profile)`, false)
                                .addField('XP', '**0**', false)
                                .addField('Current Group Rank', rankInGroup, false)
                                .setTimestamp()
                                .setFooter('The Graceful Bloodline')
                                .setColor("GREEN")
                            msg.channel.send(okcool)

                        }

                    }

                })

            }).catch(function(err) {

                console.error(err)

                const wrongembed = new Discord.MessageEmbed()
                    .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                    .setDescription("The user does not exist on ROBLOX. Please try again.")
                    .setTimestamp()
                    .setFooter('The Graceful Bloodline')
                    .setColor("RED")
                msg.channel.send(wrongembed)

            })

        } else {

            const wrongembed = new Discord.MessageEmbed()
                .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                .setDescription("You are missing the username argument! Try again.")
                .setTimestamp()
                .setFooter('The Graceful Bloodline')
                .setColor("RED")
            msg.channel.send(wrongembed)

        }

    }

    if (msg.content.startsWith(`${config.prefix}add`)) {

        if(msg.member.roles.cache.some(role =>[config.approvedRole].includes(role.name))){

            if (argLength === 3) {

                if (!isNaN(args[2])) {

                    rbx.getIdFromUsername(args[1]).then(id => {

                        if (fs.existsSync(`./users/${id}.json`)) {

                            rbx.getRankInGroup(config.groupId, id).then(async rank => {

                                if (rank > 0) {
    
                                    let xpToAdd;
                                    let xpAdded;
    
                                    if (args[2] > config.maxXP) {
    
                                        var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                        var parsed = JSON.parse(content)
                                        var currentXP = parsed.XP
                                        xpToAdd = Number(currentXP)+Number(config.maxXP)
                                        xpAdded = Number(config.maxXP)
    
                                    } else {
    
                                        var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                        var parsed = JSON.parse(content)
                                        var currentXP = parsed.XP
                                        xpToAdd = Number(currentXP)+Number(args[2])
                                        xpAdded = Number(args[2])
    
                                    }
    
                                    let rankInGroup1 = await rbx.getRole(config.groupId, rank)
                                    let rankInGroup = rankInGroup1.name
    
                                    fs.writeFileSync(`./users/${id}.json`, JSON.stringify({XP:Number(xpToAdd)}))
    
                                    var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                    var parsed = JSON.parse(content)
                                    var currentXP = parsed.XP
    
                                    const okcool = new Discord.MessageEmbed()
                                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                        .setDescription(`**Successfully added ${xpAdded} XP to user ${args[1]}.**\nHere are their current stats:`)
                                        .addField('User', `[${args[1]}](https://roblox.com/users/${id}/profile)`, false)
                                        .addField('XP', '**'+currentXP+'**', false)
                                        .addField('Current Group Rank', rankInGroup, false)
                                        .setTimestamp()
                                        .setFooter('The Graceful Bloodline')
                                        .setColor("GREEN")
                                    msg.channel.send(okcool)
    
                                } else {
                                    const wrongembed = new Discord.MessageEmbed()
                                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                        .setDescription("The user is not in the group.")
                                        .setTimestamp()
                                        .setFooter('The Graceful Bloodline')
                                        .setColor("RED")
                                    msg.channel.send(wrongembed)
                                }
                                
                            })

                        } else {

                            fs.writeFileSync(`./users/${id}.json`, JSON.stringify({"XP":0}))

                            rbx.getRankInGroup(config.groupId, id).then(async rank => {

                                if (rank > 0) {
    
                                    let xpToAdd;
                                    let xpAdded;
    
                                    if (args[2] > config.maxXP) {
    
                                        var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                        var parsed = JSON.parse(content)
                                        var currentXP = parsed.XP
                                        xpToAdd = Number(currentXP)+Number(config.maxXP)
                                        xpAdded = Number(config.maxXP)
    
                                    } else {
    
                                        var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                        var parsed = JSON.parse(content)
                                        var currentXP = parsed.XP
                                        xpToAdd = Number(currentXP)+Number(args[2])
                                        xpAdded = Number(args[2])
    
                                    }
    
                                    let rankInGroup1 = await rbx.getRole(config.groupId, rank)
                                    let rankInGroup = rankInGroup1.name
    
                                    fs.writeFileSync(`./users/${id}.json`, JSON.stringify({XP:Number(xpToAdd)}))
    
                                    var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                    var parsed = JSON.parse(content)
                                    var currentXP = parsed.XP
    
                                    const okcool = new Discord.MessageEmbed()
                                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                        .setDescription(`**Successfully added ${xpAdded} XP to user ${args[1]}.**\nHere are their current stats:`)
                                        .addField('User', `[${args[1]}](https://roblox.com/users/${id}/profile)`, false)
                                        .addField('XP', '**'+currentXP+'**', false)
                                        .addField('Current Group Rank', rankInGroup, false)
                                        .setTimestamp()
                                        .setFooter('The Graceful Bloodline')
                                        .setColor("GREEN")
                                    msg.channel.send(okcool)
    
                                } else {
                                    const wrongembed = new Discord.MessageEmbed()
                                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                        .setDescription("The user is not in the group.")
                                        .setTimestamp()
                                        .setFooter('The Graceful Bloodline')
                                        .setColor("RED")
                                    msg.channel.send(wrongembed)
                                }
                                
                            })

                        }

                    }).catch(function(err) {

                        const wrongembed = new Discord.MessageEmbed()
                            .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                            .setDescription("The user does not exist on ROBLOX. Please try again.")
                            .setTimestamp()
                            .setFooter('The Graceful Bloodline')
                            .setColor("RED")
                        msg.channel.send(wrongembed)

                    })

                } else {

                    const wrongembed = new Discord.MessageEmbed()
                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                        .setDescription("Invalid number argument. Try writing a number between 1 and 255.")
                        .setTimestamp()
                        .setFooter('The Graceful Bloodline')
                        .setColor("RED")
                    msg.channel.send(wrongembed)

                }

            } else {

                const wrongembed = new Discord.MessageEmbed()
                    .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                    .setDescription("You are missing an argument! Try again.")
                    .setTimestamp()
                    .setFooter('The Graceful Bloodline')
                    .setColor("RED")
                msg.channel.send(wrongembed)

            }

        } else {

            const wrongembed = new Discord.MessageEmbed()
                .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                .setDescription("You have insufficient permissions.")
                .setTimestamp()
                .setFooter('The Graceful Bloodline')
                .setColor("RED")
            msg.channel.send(wrongembed)
    
        }

    } 

    if (msg.content.startsWith(`${config.prefix}remove`)) {

        if(msg.member.roles.cache.some(role =>[config.approvedRole].includes(role.name))){

            if (argLength === 3) {

                if (!isNaN(args[2])) {

                    rbx.getIdFromUsername(args[1]).then(id => {

                        if (fs.existsSync(`./users/${id}.json`)) {

                            rbx.getRankInGroup(config.groupId, id).then(async rank => {

                                if (rank > 0) {
    
                                    let xpToAdd;
                                    let xpRemoved;
    
                                    if (args[2] > config.maxXP) {
    
                                        var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                        var parsed = JSON.parse(content)
                                        var currentXP = parsed.XP
                                        xpToAdd = Number(currentXP)-Number(config.maxXP)
                                        xpRemoved = Number(config.maxXP)
    
                                    } else {
    
                                        var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                        var parsed = JSON.parse(content)
                                        var currentXP = parsed.XP
                                        xpToAdd = Number(currentXP)-Number(args[2])
                                        xpRemoved = Number(args[2])
    
                                    }
    
                                    let rankInGroup1 = await rbx.getRole(config.groupId, rank)
                                    let rankInGroup = rankInGroup1.name
    
                                    fs.writeFileSync(`./users/${id}.json`, JSON.stringify({XP:Number(xpToAdd)}))
    
                                    var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                    var parsed = JSON.parse(content)
                                    var currentXP = parsed.XP
    
                                    const okcool = new Discord.MessageEmbed()
                                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                        .setDescription(`**Successfully removed ${xpRemoved} XP from user ${args[1]}.**\nHere are their current stats:`)
                                        .addField('User', `[${args[1]}](https://roblox.com/users/${id}/profile)`, false)
                                        .addField('XP', '**'+currentXP+'**', false)
                                        .addField('Current Group Rank', rankInGroup, false)
                                        .setTimestamp()
                                        .setFooter('The Graceful Bloodline')
                                        .setColor("GREEN")
                                    msg.channel.send(okcool)
    
                                } else {
                                    const wrongembed = new Discord.MessageEmbed()
                                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                        .setDescription("The user is not in the group.")
                                        .setTimestamp()
                                        .setFooter('The Graceful Bloodline')
                                        .setColor("RED")
                                    msg.channel.send(wrongembed)
                                }
                                
                            })

                        } else {

                            fs.writeFileSync(`./users/${id}.json`, JSON.stringify({"XP":0}))
                            
                            rbx.getRankInGroup(config.groupId, id).then(async rank => {

                                if (rank > 0) {
    
                                    let xpToAdd;
                                    let xpRemoved;
    
                                    if (args[2] > config.maxXP) {
    
                                        var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                        var parsed = JSON.parse(content)
                                        var currentXP = parsed.XP
                                        xpToAdd = Number(currentXP)-Number(config.maxXP)
                                        xpRemoved = Number(config.maxXP)
    
                                    } else {
    
                                        var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                        var parsed = JSON.parse(content)
                                        var currentXP = parsed.XP
                                        xpToAdd = Number(currentXP)-Number(args[2])
                                        xpRemoved = Number(args[2])
    
                                    }
    
                                    let rankInGroup1 = await rbx.getRole(config.groupId, rank)
                                    let rankInGroup = rankInGroup1.name
    
                                    fs.writeFileSync(`./users/${id}.json`, JSON.stringify({XP:Number(xpToAdd)}))
    
                                    var content = fs.readFileSync(`./users/${id}.json`, 'utf-8')
                                    var parsed = JSON.parse(content)
                                    var currentXP = parsed.XP
    
                                    const okcool = new Discord.MessageEmbed()
                                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                        .setDescription(`**Successfully removed ${xpRemoved} XP from user ${args[1]}.**\nHere are their current stats:`)
                                        .addField('User', `[${args[1]}](https://roblox.com/users/${id}/profile)`, false)
                                        .addField('XP', '**'+currentXP+'**', false)
                                        .addField('Current Group Rank', rankInGroup, false)
                                        .setTimestamp()
                                        .setFooter('The Graceful Bloodline')
                                        .setColor("GREEN")
                                    msg.channel.send(okcool)
    
                                } else {
                                    const wrongembed = new Discord.MessageEmbed()
                                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                                        .setDescription("The user is not in the group.")
                                        .setTimestamp()
                                        .setFooter('The Graceful Bloodline')
                                        .setColor("RED")
                                    msg.channel.send(wrongembed)
                                }
                                
                            })


                        }

                        


                    }).catch(function(err) {

                        const wrongembed = new Discord.MessageEmbed()
                            .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                            .setDescription("The user does not exist on ROBLOX. Please try again.")
                            .setTimestamp()
                            .setFooter('The Graceful Bloodline')
                            .setColor("RED")
                        msg.channel.send(wrongembed)

                    })

                } else {

                    const wrongembed = new Discord.MessageEmbed()
                        .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                        .setDescription("Invalid number argument. Try writing a number between 1 and 255.")
                        .setTimestamp()
                        .setFooter('The Graceful Bloodline')
                        .setColor("RED")
                    msg.channel.send(wrongembed)

                }

            } else {

                const wrongembed = new Discord.MessageEmbed()
                    .setAuthor('Graceful Bot | XP Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                    .setDescription("You are missing an argument! Try again.")
                    .setTimestamp()
                    .setFooter('The Graceful Bloodline')
                    .setColor("RED")
                msg.channel.send(wrongembed)

            }

        } else {

            const wrongembed = new Discord.MessageEmbed()
                .setAuthor('Graceful Bot | Rank Management System', 'https://cdn.discordapp.com/avatars/696088686768422942/cec0d8cd5c23cb004d3df964bd3e4c55.webp?size=128')
                .setDescription("You have insufficient permissions.")
                .setTimestamp()
                .setFooter('The Graceful Bloodline')
                .setColor("RED")
            msg.channel.send(wrongembed)
    
        }

    } 

})

client.login(config.botToken)