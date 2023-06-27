const db = require('../connects/DBConnect');

const message = {
    getAllMessager1: function (callback) {
        return db.query("Select * from ChannelMessager1", callback);
    },
    getAllMessager2: function (callback) {
        return db.query("Select * from ChannelMessager2", callback);
    },
    getSinhMessageId: function (id, callback) {
        return db.query("select * from ChannelMessager where Id=?", [id], callback);
    },
    addMessage: function (ChannelMessager, callback) {
        // console.log("value",ChannelMessager)
        return db.query("Insert into ChannelMessager1(userName,avatar,messager) values(?,?,?)", [ChannelMessager.userName, ChannelMessager.avatar, ChannelMessager.messager], callback);
    },
    addMessage1: function (ChannelMessager, callback) {
        return db.query("Insert into ChannelMessager2(userName,avatar,messager) values(?,?,?)", [ChannelMessager.userName, ChannelMessager.avatar, ChannelMessager.messager], callback);
    },
    deleteMessage: function (id, callback) {
        return db.query("delete from ChannelMessager1 where Id=?", [id], callback);
    },  
    deleteMessage1: function (id, callback) {
        return db.query("delete from ChannelMessager2 where Id=?", [id], callback);
    },  
    updateMessage: function (id, ChannelMessager, callback) {
        return db.query("update ChannelMessager1 set userName=?,avatar=?,messager=? where Id=?", [ChannelMessager.userName, ChannelMessager.avatar, ChannelMessager.messager, id], callback);
    },
    updateMessage1: function (id, ChannelMessager, callback) {
        return db.query("update ChannelMessager2 set userName=?,avatar=?,messager=? where Id=?", [ChannelMessager.userName, ChannelMessager.avatar, ChannelMessager.messager, id], callback);
    }
};

module.exports = message;
