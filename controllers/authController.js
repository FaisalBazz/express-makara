const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const {validation} = require('../middleware/validation');
const jwt = require('jsonwebtoken');
const  dotenv = require('dotenv')
dotenv.config()

const login = async (req, res) => { 
    try {
        const email = req.body.email
        const password = req.body.password
        const getData = await userModel.findOne({
            where : {email: email}
        })

        if(!getData) res.status(400).send("Username tidak terdaftar");
        const resultLogin = bcrypt.compareSync(password, getData.password);

        if(!resultLogin) res.status(400).send("Username/Password salah!");

        // Token
        const token = jwt.sign({email: getData.email}, process.env.TOKEN_RAHASIA);
        res.header('auth-token', token).json({
                "error": false,
                "message": "success",
                "loginResult": {
                    "userId": "id",
                    "email": email,
                    "token": token
                }
            });
        
      
    } catch (error) {
        res.status(400).send("Error!");
    }
}

const register = async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        // validation form
        const {error} = validation(req.body);
        console.log(error);
        if(error) return res.status(400).send(error.details[0].message);
        // jika sudah sesuai kriteria simpan data
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt)

        const users = new userModel({
            name : name,
            email : email,
            password : hashedPassword,
        })

        const savedUser = await users.save();
        res.json({
                error: false,
                message: 'User Created'
              })
    } catch (error) {
        res.status(400).send("Error!")
    }
}

module.exports = {
    register, login
}