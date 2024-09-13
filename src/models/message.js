const db = require('../connects/DBConnect');

const message = {
    getAllMessager: async function (id, callback) {
        // return db.query("Select * from ChannelMessager1", callback);
        try {
            const comment = await db.query("Select * from ChannelMessager where articleID=?", [id.id]);
            const user = await db.query("Select * from UserAccount ");
            const indexComment = comment[0]
            const list = user[0]
            const listUser = list.length


            // console.log('comment :', listUser)
            const combine = indexComment.map((item, index1) => {
                for (let index = 0; index <= listUser; index++) {
                    if (indexComment[index1]?.use_id === list[index]?.use_id) {

                        return {
                            messagerID: item.messagerID,
                            messager: item.messager,
                            use_id: item.use_id,
                            articleID: item.articleID,
                            email: list[index].email,
                            avatar: list[index].avatar,
                            passwordUse: list[index].passwordUse,
                            address: list[index].address,
                            numberPhone: list[index].numberPhone,
                            create_at: item.create_at,
                        }
                    }

                }
            })
            callback(null, { success: true, comment: combine, message: "comment the article" });
        } catch (error) {
            console.error("Error registering account:", error);
            callback(error, null);
        }
    },
    addMessage: async function (ChannelMessager, callback) {
        // console.log("value", ChannelMessager)
        // return db.query("Insert into ChannelMessager1(userName,avatar,messager) values(?,?,?)", [ChannelMessager.userName, ChannelMessager.avatar, ChannelMessager.messager]);
        try {
            const comment = await db.query("Insert into ChannelMessager(messager,use_id,articleID) values(?,?,?)", [ChannelMessager.messager, ChannelMessager.use_id, ChannelMessager.idArticle.id]);
            const user = await db.query("Select * from UserAccount where use_id =?", [ChannelMessager.use_id]);
            const listUser = user[0]
            // console.log("listUser :", listUser)
            callback(null, { success: true, comment: comment, message: "comment of articles should" })
        } catch (error) {
            console.error("Error registering account:", error);
            callback(error, null);
        }
    },
    deleteMessage: async function (id, callback) {
        try {
            // console.log("deleteMessage: ", id)
            const DeleteComment = await db.query("delete from ChannelMessager where messagerID=?", [id.deleteId]);
            // console.log("deleteMessage: ", comment)
            const comment = await db.query("Select * from ChannelMessager where articleID=?", [id.id]);
            const user = await db.query("Select * from UserAccount ");
            const indexComment = comment[0]
            const list = user[0]
            const listUser = list.length


            // console.log('comment :', listUser)
            const combine = indexComment.map((item, index1) => {
                for (let index = 0; index <= listUser; index++) {
                    if (indexComment[index1]?.use_id === list[index]?.use_id) {

                        return {
                            messagerID: item.messagerID,
                            messager: item.messager,
                            use_id: item.use_id,
                            articleID: item.articleID,
                            email: list[index].email,
                            avatar: list[index].avatar,
                            passwordUse: list[index].passwordUse,
                            address: list[index].address,
                            numberPhone: list[index].numberPhone,
                            create_at: item.create_at,
                        }
                    }

                }
            })
            callback(null, { success: true, comment: combine, message: "message delete" })
        } catch (error) {
            console.error("Error message delete:", error);
            callback(error, null);
        }
    },
    deleteMessage1: function (id, callback) {
        return db.query("delete from ChannelMessager2 where Id=?", [id], callback);
    },
    // updateMessage1: function (id, ChannelMessager, callback) {
    //     return db.query("update ChannelMessager1 set messager=? where messagerID=?", [ChannelMessager.messager, id], callback);
    // },
    updateMessage: async function (ChannelMessager, callback) {
        try {
            const fixMessager = await db.query("update ChannelMessager set messager=? where messagerID=?", [ChannelMessager.messager, ChannelMessager.messagerID]);
            callback(null, { success: true, comment: fixMessager, message: "fix message" });
        } catch (err) {
            console.error("Error message fix:", err);
            callback(err, null);
        }
    },
    Addcomments: async (input, callback) => {
        try {
            console.log('AddComment ::', input)

            const { use_id, post_id, messager_id, friend, parent_id, commentMessager } = input;
            const AddComment = await db.query(`insert into comments(use_id, articleID, messagerID, content,tagged_user_id) values(?,?,?,?,?)`, [use_id, post_id.id, messager_id, commentMessager, parent_id])
            const commentId = AddComment[0]?.insertId;
            if (parent_id) {
                const notificationMassage = `${friend} đã nhắc đến bạn`
                console.log('notificationMassage: ', notificationMassage)
                await db.query(`insert into notifications(use_id,message,readd,flag,address,articleID,user_children) values(?, ?, ?, ?, ?, ?, ?)`, [parent_id, notificationMassage, false, false, commentId, post_id.id, use_id])
            }
            callback(null, { success: true, commentID: commentId });
        } catch (err) {
            callback(err, null)
        }
    },
    getComments: async (id, callback) => {
        try {
            const getComments = await db.query(`SELECT * from comments where articleID=?`, [id])

            const user = await db.query("Select * from UserAccount ");
            const Gcomment = await db.query("Select * from comments ");
            const indexComment = Gcomment[0]
            const list = user[0]
            const listUser = list.length


            // console.log('comment :', indexComment)
            const combine = indexComment.map((item, index1) => {
                for (let index = 0; index <= listUser; index++) {
                    if (indexComment[index1]?.use_id === list[index]?.use_id) {
                        return {
                            commentID: item.id,
                            messager: item.content,
                            messagerID: item.messagerID,
                            use_id: item.use_id,
                            articleID: item.articleID,
                            email: list[index].email,
                            avatar: list[index].avatar,
                            passwordUse: list[index].passwordUse,
                            address: list[index].address,
                            numberPhone: list[index].numberPhone,
                            create_at: item.create_at,
                        }
                    }

                }
            })
            // console.log('combine :', combine)
            // const length =  listUser.length
            // for (let index = 0; index < array.length; index++) {
            //     const element = array[index];

            // }
            // console.log(comment[0])
            callback(null, { success: true, comment: combine, message: 'Get all comments' })
        } catch (err) {
            callback(err, null)
        }
    },
    callNotification: async (input, callback) => {
        try {
            // console.log('????????+++++_____',input)
            const getNotification = await db.query(`select * from notifications where use_id = ? and readd = ? and flag = ?`, [input, false, false])
            const update = getNotification[0].map((item, index) => {
                return item.id_notification
            })
            if (update.length > 0) {
                const placeholders = update.map(() => '?').join(',');
                console.log('????????+++++_____', update)
                const updateNotification = await db.query(`UPDATE notifications SET flag = ? WHERE id_notification IN (${placeholders})`, [true, ...update]);
                console.log('output', updateNotification)
            }
            const data = getNotification[0]
            // await db.query(`insert into notifications(flag) values(?)`, [true])
            callback(null, { success: true, result: data, message: "all notifications" })
        } catch (err) {
            if (!callback.called) {
                callback(err, null);
            }
        }
    },
    callBell: async (input, callback) => {
        // console.log('callBell', input);
        try {
            const getNotification = await db.query(`select * from notifications where use_id = ? `, [input])
            const getUser = await db.query(`select * from UserAccount  `)
            // console.log('getNotification ---: ', getNotification[0]);
            const data = getNotification[0]
            const userNew = getUser[0]

            const dataa = []
            const date = data?.map((item, index) => {
                const itemId = index + 1
                const createdAt = new Date(item?.created_at);
                const fomrattedDate = `${createdAt.toLocaleTimeString("en-GB")} ${createdAt.toLocaleDateString("en-GB")}`
                for (var i = 0; i <= userNew.length; i++) {
                    // console.log('use_id:::1 ', item.user_children)
                    // console.log('use_id::: ', userNew[i].use_id)
                    if (item.user_children === userNew[i].use_id) {
                        return dataa.push({
                            id_notification: item.id_notification,
                            use_id: item.use_id,
                            message: item.message,
                            readd: item.readd,
                            created_at: fomrattedDate,
                            flag: item.flag,
                            address: item.address,
                            articleID: item.articleID,
                            avatar: userNew[i].avatar
                        })
                    }
                }

            });
            callback(null, { success: true, data: dataa, message: "success get notification" });
        } catch (err) {
            callback(err, null);
        }
    },
    callTotal: async (input, callback) => {
        // console.log('callBell', input);
        try {
            const getNotification = await db.query(`select * from notifications where use_id = ? and readd = ?`, [input, false])
            const getTotal = await db.query(`SELECT COUNT(*) AS total FROM notifications where use_id = ? and readd is false`, [input, false])
            // console.log('getNotification ---: ', getTotal[0][0]?.total);
            const totals = getTotal[0][0]?.total
            callback(null, { success: true, total: totals, message: "success get notification" });
        } catch (err) {
            callback(err, null);
        }
    },
    ChangeNotification: async (input, callback) => {
        try {
            const changeNotifi = await db.query(`UPDATE notifications SET readd = ? WHERE id_notification=?`, [true, input.idNotification])
            const Total = await db.query(`SELECT COUNT(*) AS total FROM notifications WHERE use_id = ? AND readd is false`, [input.use_id, false])
            console.log('getNotification ---: ', Total);
            const totals = Total[0][0]?.total
            callback(null, { success: true, total: totals, message: "success get notification" });
        } catch (err) {
            callback(err, null);
        }
    },
    DeleteComment: async (id, callback) => {
        try {
            const deleteComment = await db.query(`delete from comments where id = ?`, [id.idDelete]);
            callback(null, { success: true, message: "success delete comment" });
        } catch (err) {
            callback(err, null);
        }
    },
};
module.exports = message;
