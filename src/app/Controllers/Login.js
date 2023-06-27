const moduleLogin = require("../../models/Login")
class LogInController {
    signUp(req, res) {
        moduleLogin.logInAccount(req.body, (error, result) => {
            console.log(result)
            if (res.statusCode === 200) {
                res.send(result)
            }

        })
    }
    Post(req, res) {
            moduleLogin.upLoadNew(req.body, (error, result) => {
                console.log("setqua", req.body)
                // console.log("ketqua", result)
                // if (res.statusCode) {
                //      res.send(res.statusCode)
                // }
            })
    }
}

module.exports = new LogInController