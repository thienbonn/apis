const message = require('../../models/message');

class SiteController {
    index(req, res) {
        // res.send(message.getAllMessager(
            
        // ))
       
        message.getAllMessager1((error, message) => {
            console.log(message)
            if(error) {
                res.json(error)
            } else {
                res.send(message)
            }
        })
    }
    index1(req, res) {

        message.getAllMessager2((error, message) => {
            if(error) {
                res.json(error)
            } else {
                res.send(message)
            }
        })
    }
    postt(req, res) {
 
        message.addMessage( req.body, (error, result)=>{
            console.log("post1: ",req.body)
            if(error) {
                res.json(error)
            } else {
                res.json(req.body)
            }
        })
    }
    postt1(req, res) {

        // console.log("post2: ",req.body)
        message.addMessage1( req.body, (error, add)=>{
            console.log(add)
            if(error) {
                res.json(error)
            } else {
                res.send(req.body)
            }
        })
       
    }
    delete(req, res) {
        console.log(req.params)
        const id = req.params.id
        message.deleteMessage(id, (error,curr) => {
            if(error) {
                res.json(error)
            } else {
                res.send(curr)
            }
        })
    }
    delete1(req, res) {
        const id = req.params.id
        message.deleteMessage1(id, (error,curr) => {
            if(error) {
                res.json(error)
            } else {
                res.send(curr)
            }
        })
    }
    edit(req,res){
        console.log("put1body :",req.body)
        console.log("put1id: ",req.params.id)
        message.updateMessage(req.params.id,req.body,(error,result)=>{
            if(error) {
                res.json(error)
            } else {
                res.send(result)
            }
        })
    }
    edit1(req,res){
        console.log("put2",req.body)
        console.log("put2",req.params.id)
        message.updateMessage1(req.params.id,req.body,(error,result)=>{
            if(error) {
                res.json(error)
            } else {
                res.send(result)
            }
        })
    }
    search(req, res) {
        console.log("test",req.body)
        res.render('search')
    
    }
}
module.exports = new SiteController 