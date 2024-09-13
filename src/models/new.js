const db = require('../connects/DBConnect')

const newView = {
    viewss: async (callback) => {
        try {
            const getView = await db.query('SELECT * FROM course where deleted_at is null')
            callback(null, { data: getView[0]})
            // console.log('getView ::', getView[0])
        } catch (err) {
            console.error('error get course', err)
            callback(err, null)
        }
    },
    deleteArticle: async (input,callback) => {
        const {id} = input
        // console.log("create is called" , input);
        // console.log("create is called" , title);
        try {
            const savedArticle = await db.query(`UPDATE course set deleted_at=? where courseId=?`, [new Date(), id])
            const dataNew = await db.query(`select * from course where deleted_at is null`)
            const data = dataNew[0]
            callback(null, { success: true, data: data ,message: "add successfuly"})
        }catch (err) {
            callback(err, null)
        }
    },
    getArticle : async (callback) => {
        try {
            const getArtileOfuser = await db.query('select * from course where deleted_at is null')
            const getTheListOfDeletedArticle = await db.query('SELECT COUNT(*) AS total FROM course where deleted_at is not null')
            // console.log('getTheListOfDeletedArticle : ', getTheListOfDeletedArticle[0][0]?.total)
            const total_delete = getTheListOfDeletedArticle[0][0]?.total
            const dataGet = getArtileOfuser[0]
            const data = []
            const date = dataGet?.map((item,index) => {
                const itemId = index + 1
                const createdAt = new Date(item?.created_at);
                const fomrattedDate = `${createdAt.toLocaleTimeString("en-GB")} ${createdAt.toLocaleDateString("en-GB")}`
                return data.push({
                    id : itemId,
                    _id: item.courseId,
                    name : item.name,
                    description : item.description,
                    created_at : fomrattedDate,
                    // total_Articles_deleted : total_delete
                })
            });
            // console.log("data ::", data);
            callback(null, {success: true, message: "get all the articles", data: data, dataTotal: total_delete})
        }catch (err) {
            callback(err, null)
        }
    },
    getArticleCopy : async (callback) => {
        try {
            const getArtileOfuser = await db.query('select * from course where deleted_at is null')
            const getTheListOfDeletedArticle = await db.query('SELECT COUNT(*) AS total FROM course where deleted_at is not null')
            // console.log('getTheListOfDeletedArticle : ', getTheListOfDeletedArticle[0][0]?.total)
            const total_delete = getTheListOfDeletedArticle[0][0]?.total
            const dataGet = getArtileOfuser[0]
            const data = []
            const date = dataGet?.map((item,index) => {
                const itemId = index + 1
                const createdAt = new Date(item?.created_at);
                const fomrattedDate = `${createdAt.toLocaleTimeString("en-GB")} ${createdAt.toLocaleDateString("en-GB")}`
                return data.push({
                    id : itemId,
                    _id: item.courseId,
                    name : item.name,
                    description : item.description,
                    created_at : fomrattedDate,
                    // total_Articles_deleted : total_delete
                })
            });
            // console.log("data ::", data);
            callback(null, {success: true, message: "get all the articles", data: data, dataTotal: total_delete})
        }catch (err) {
            callback(err, null)
        }
    },
    articlesSaveTheTrash: async (callback) => {
        try {
            const articles = await db.query(`SELECT * from course where deleted_at is not null `)
            const arr = articles[0]
            // console.log('articles :' , arr)
            const array = []
            const newArr = arr?.map((item, index) => {
                const timeDelete = new Date(item?.deleted_at)
                const configuration = `${timeDelete.toLocaleTimeString('en-GB')} ${timeDelete.toLocaleDateString('en-GB')}`
                return array.push({
                    id: index,
                    _id: item.courseId,
                    name: item.name,
                    description: item.description,
                    deleted_at: configuration
                })
            });
            // console.log('articles :' , array)
            callback(null, {success: true, data: array, message: 'articles in the trash'})
        }catch (err) {
            callback(err, null)
        }
    },
    recoveryArticle: async (id,callback) => {
        // console.log(id)
        try {
            const databaseDeleted = await db.query(`Update course SET deleted_at = null WHERE courseId = ?`, [id])
            const data = await db.query('select * from course where deleted_at is null')
            callback(null, {success: true, data: data, message: 'articles in the trash'})
        } catch (err) {
            callback(err, null)
        }
    },
    createArticle: async (value,callback) => {
        try {
            console.log("value",value)
            const {title,content,image} = value
            const addArticlesToTable = await db.query(`insert into course(name, description,img) values(?, ?,?)`, [title,content,image])
            callback(null, {success: true, message: 'New Article added successfully'})
        } catch (e) {
            callback(e, null)
        }
    },
    getArticleFromTimeToTime: async (input,callback) => {
        console.log('lọt: ')

        try {
            const {foliwing} = input
            const articles = await db.query(`SELECT * FROM course order by created_at ${foliwing}`)
            // console.log('articles: ', articles[0])
            // const data = articles[0]

            const total_delete = getTheListOfDeletedArticle[0][0]?.total
            const dataGet = getArtileOfuser[0]
            const data = []
            const date = dataGet?.map((item,index) => {
                const itemId = index + 1
                const createdAt = new Date(item?.created_at);
                const fomrattedDate = `${createdAt.toLocaleTimeString("en-GB")} ${createdAt.toLocaleDateString("en-GB")}`
                return data.push({
                    id : itemId,
                    _id: item.courseId,
                    name : item.name,
                    description : item.description,
                    created_at : fomrattedDate,
                    // total_Articles_deleted : total_delete
                })
            });
            // console.log("data ::", data);
            callback(null, {success: true, data: data, message: 'article from time to'})
        }catch (e) {
            callback(e, null)
        }
    }
}
module.exports = newView