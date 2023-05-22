class SiteController {
    index(req, res) {
        res.render('home')
    }
    search(req, res) {
        console.log(req.query)
        res.render('search')
    }
}
module.exports = new SiteController;