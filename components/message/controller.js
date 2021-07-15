//Este es el archivo que a definir todas las funciones de lo que va a suceder

const store = require('./store')
function addMessage(user, message){
    // console.log(user);
    // console.log(message);
    return new Promise((resolve, reject) => {
        if(!user || !message){
            console.error('[messagecontroler] no hay usuario o mensaje')
            reject('Los datos son incorrectos');
            return false;
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date(),
        };
        store.add(fullMessage)        
        resolve(fullMessage)
        console.log(fullMessage)
    });
    
}

function getMessage(filterUser){
    return new Promise((resolve, reject) =>{

        resolve(store.list(filterUser))
    })
}

function updateMessage(id, message){
    console.log(id);
    console.log(message);
    return new Promise (async(resolve, reject) =>{
        if(!id || !message){
            reject('Invaled Data');
            return false;
        }
        const result = await store.updateText(id, message)
        resolve(result);
    })
    }
module.exports = {
    addMessage,
    getMessage,
    updateMessage
};