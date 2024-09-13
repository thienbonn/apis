const message = require('../../models/message');

class SiteController {
    index(req, res) {
        const paramms = req.query
        message.getAllMessager(paramms, (error, message) => {
            if (error) {
                res.json(error)
            } else {
                res.send(message)
            }
        })
    }
    post(req, res) {
        message.addMessage(req.body, (error, result) => {
            if (error) {
                res.json(error)
            } else {
                res.json(req.body)
            }
        })
    }
    delete(req, res) {
        const id = req.params
        message.deleteMessage(id, (error, curr) => {
            if (error) {
                res.json(error)
            } else {
                res.send(curr)
            }
        })
    }
    edit(req, res) {
        const input = req.body
        message.updateMessage(input, (error, result) => {
            if (error) {
                res.json(error)
            } else {
                res.send(result)
            }
        })
    }
    search(req, res) {
        // console.log("test", req.body)
        res.render('search')

    }
    comments(req, res) {
        const input = req.body
        // console.log("input :", input)
        message.Addcomments(input, (error, reply) => {
            if (error) {
                res.json(error)
            } else {
                res.send(reply)
            }
        })
    }
    getComment(req, res, next) {
        const paramms = req.query.id
        message.getComments(paramms, (error, reply) => {
            if (error) {
                res.json(error)
            } else {
                res.send(reply)
            }
        })
    }
    notification(req, res, next) {
        const input = req.params.id
        message.callNotification(input, (err, result) => {
            if (err) {
                return res.json(err)
            } else {
                return res.send(result)
            }
        })
    }
    notificationBell(req, res, next) {
        const input = req.params.id
        message.callBell(input, (err, result) => {
            if (err) {
                return res.json(err)
            } else {
                return res.send(result)
            }
        })
    }
    notificationTotal(req, res, next) {
        const input = req.params.id
        message.callTotal(input, (err, result) => {
            if (err) {
                return res.json(err)
            } else {
                return res.send(result)
            }
        })
    }
    watchedMessage(req, res, next) {
        // console.log('inputLook :: ', req.body)
        const input = req.body
        message.ChangeNotification(input, (err, notification) => {
            if (err) {
                res.json(err)
            } else {
                res.send(notification)
            }
        })
    }
    DLTComment(req, res, next) {
        const IdDelete = req.body
        message.DeleteComment(IdDelete,(err, notification) => {
            if (err) {
                res.json(err)
            } else {
                res.send(notification)
            }
        })
    }
}
module.exports = new SiteController 