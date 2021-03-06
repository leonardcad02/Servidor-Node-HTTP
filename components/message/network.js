const express = require('express');
const router = express.Router();
const response = require('../../network/response')
const controller  = require('./controller')

router.get('/', function(req, res){   
    const filterMessages = req.query.user || null;
    controller.getMessage(filterMessages)
        .then((messageList) =>{
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpect Error', 500, e);
        });
        //console.log(res.body.text)    
});
router.post('/', function(req, res){
    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage)=>{
            response.success(req,res, fullMessage, 201);            
        })
        .catch(e =>{
            response.error(req,res, 'Informacion Invalida', 400, 'Error para logearlo');
        });

   
});

router.patch('/:id', function(req, res){
    console.log(req.params.id);
    controller.updateMessage(req.params.id, req.body.message)
        .then((data)=>{
            response.success(req, res, data, 200);
        })
        .catch(e =>{
            response.error(req, res, "Error interno", 500)
        })
    res.send('ok')
})

module.exports = router