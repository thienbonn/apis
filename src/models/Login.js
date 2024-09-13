const db = require('../connects/DBConnect');
const bcrypt = require("bcrypt")
const Login = {
    registerAccount: async (account, callback) => {
        try {
            const alreadyExists = await db.query("Select * from UserAccount where email=?", [account.email]);
            var oj = []
            for (var item of alreadyExists[0]) {
                const checkAccount = await bcrypt.compare(account.password, item.passwordUse)
                if (checkAccount) {
                    oj.push(item)
                }
            }
            if (oj.length <= 0) {
                const length = 15;
                const hadhed = await bcrypt.hash(account.password, length)
                // console.log("login::1 ", hadhed)
                const newUser =
                {
                    use_id: account.use_id,
                    email: account.email,
                    password: hadhed,
                    avatar: account.avatar,
                    address: account.address,
                    numberPhone: account.numberPhone
                }
                await db.query("Insert into  UserAccount(email,passwordUse,avatar,address,numberPhone) values(?,?,?,?,?)", [newUser.email, newUser.password, newUser.avatar, newUser.address, newUser.numberPhone]);
                const NewAccount = await db.query("select * from UserAccount where email=? and numberPhone=?", [account.email, account.numberPhone]);
                // console.log("login::1 ", NewAccount[0][0])
                callback(null, { success: true, message: 'User registered successfully', account: NewAccount[0][0] });
            } else {
                callback(null, { status: null, success: false, message: 'Account already exists with matching password' });
            }
        } catch (error) {
            console.error("Error registering account:", error);
            callback(error, null);
        }
    },

    logInAccount: async (account, callback) => {
        try {
            console.error("Error Login account:", account);
            const alreadyExists = await db.query("Select * from UserAccount where email=?", [account.email], callback);
            var oj = []
            for (var item of alreadyExists[0]) {
                const checkAccount = await bcrypt.compare(account.password, item.passwordUse)
                if (checkAccount) {
                    oj.push(item)
                }
            }
            console.log("exists :", oj)
            if (oj.length !== 0) {
                callback(null, { success: true, message: "success", userAccount: oj, status: 200 })
            } else {
                callback(null, { success: false, message: "account not already exists", status: 404 })
            }
        } catch (error) {
            console.error("Error Login account:", error);
            callback(error, null);
        }
    },

    upLoadNew: (upload, callback) => {
        const title = upload.title;
        const content = upload.content
        const type = upload.type
        db.query("insert into articles(title,type) value(?,?)", [title, type], callback);
        db.query("select max(articleID) as ID from articles", (error, result) => {
            let article = result[0].ID + 1
            db.query("insert into articlesContent(content,articleID) value(?,?)", [content, article], callback);
        })
    }
}

module.exports = Login
