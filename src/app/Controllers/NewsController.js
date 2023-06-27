class NewsController {
    index(req, res, next) {
        res.send("news")
    }
    test(req, res, next) {
        res.send("test")
    }
    show(req, res, next) {
        res.send("Error 404")
    }
    home(req, res, next) {
        res.send("IS HOME!!!")
    }

}

module.exports = new NewsController;
