// guardor todos los mensajes
//const list = [];
'use strict'
const db = require('mongoose');
const Model = require('./model');
const { config } = require('./config');

const user = encodeURIComponent(config.dbUser);
const pass =encodeURIComponent(config.dbPassword);
const host = encodeURIComponent(config.dbHost);
const database = encodeURIComponent(config.dbName);
const uri = `mongodb+srv://${user}:${pass}@${host}/${database}?retryWrites=true&w=majority`;

db.Promise = global.Promise;
db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('[db connection] Database connected')
	})
	.catch( error => {
		console.error('[db connection] Connection failed', error.message) 
	});

function addMessage (message){
    //list.push(messaje);
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessage(filterUser){
    let filter = {};
    if (filterUser != null){
        filter = {user: filterUser};    
    }
    const message = await Model.find(filter);
    return message;
}

async function updateText(id, message){
    const foundmessage = await Model.findOne({
        _id : id
    });
    foundmessage.message = message;
    const newMessage = await foundmessage.save()
    return newMessage;
}
module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateText,
}