const db = require('../connects/DBConnect');

const Login = {
    logInAccount: (account, callback) => {
        // console.log("login:: ",account.password)
        return db.query("select * from UserAccount WHERE email=? AND password =? ", [account.email, account.password], callback)
        // return db.query("delete from ChannelMessager2 where Id=?", [id], callback);
    },
    upLoadNew: (upload, callback) => {
        // console.log("--module::", upload)
        const title = upload.title;
        const content = upload.content
        const type = upload.type
        db.query("insert into articles(title,type) value(?,?)", [title, type], callback);
        db.query("select max(articleID) as ID from articles", (error, result) => {
            let article = result[0].ID + 1
            db.query("insert into articlesContent(content,articleID) value(?,?)", [content, article], callback);
        })
        // return table primary and table secondary
        // return db.query("select * from articlesContent, articles where articlesContent.articleID = articles.articleID", callback)

    }
}

module.exports = Login
