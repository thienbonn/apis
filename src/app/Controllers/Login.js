const moduleLogin = require("../../models/Login")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


require('dotenv').config()

class LogInController {
    async register(req, res) {
        try {
            const file = req.file;
            // console.log('file ==== ', file);
            if (!file) {
                return res.status(400).send('No file uploaded.');
            }
            const processedImageBuffer = await sharp(file.buffer)
                .jpeg({ quality: 80 })
                .toFormat('png')
                .toBuffer();
            // console.log('processedImageBuffer ==== ', processedImageBuffer);
            const filename = `${Date.now()}-image.png`;
            const outputPath = path.join(__dirname, '..', '..', 'public', 'img', filename);
            fs.writeFileSync(outputPath, processedImageBuffer);
            const input = { ...req.body, avatar: filename }
            moduleLogin.registerAccount(input, async (error, result) => {
                // console.log("input", req.body, result)
                if (error) {
                    res.status(400).json({ success: false, message: 'Account already exists' })
                } else {
                    const secretKey = process.env.SECRET_KEY;

                    if (result.success == true) {
                        const secret = '1802888882'
                        const tokenn = await bcrypt.compare(req.body.password, result.account.passwordUse)

                        if (tokenn && result.success !== false) {
                            const token = jwt.sign({ id: result.account.use_id }, secretKey)
                            const response = { success: true, message: result.message, userAccount: [{ ...result.account, token: token }] }
                            // console.log("setqua", response)
                            return res.send(response)
                        }
                    }
                    return res.send(result)
                }
            })
        } catch (error) {
            res.send(error)
        }
    };

    signUp(req, res) {
        const input = req.body
        moduleLogin.logInAccount(req.body, async (error, result) => {
            const secret = '1802888882'
            const secretKey = process.env.SECRET_KEY
            if (error) {
                res.status(400).json({ success: false, message: 'Account already exists' })
            } else if (result.success === true) {
                // console.log(result)
                const tokenn = await bcrypt.compare(input.password, result.userAccount[0].passwordUse)
                if (tokenn) {
                    const token = jwt.sign({ id: result.userAccount[0].use_id }, secretKey)
                    const response = { success: true, message: result.message, userAccount: [{ ...result.userAccount[0], token: token }] }
                    console.log("setqua", response)
                    res.send(response)
                }
            } else if (result.success === false) {
                res.send(result)
            }
        })
    };

    Create(req, res) {
        moduleLogin.upLoadNew(req.body, (error, result) => {
            // console.log("setqua", req.body)
        })
    }
}

module.exports = new LogInController