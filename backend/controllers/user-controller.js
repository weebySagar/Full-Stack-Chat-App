const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const sequelize = require('../db/database');


exports.addUser=async(req,res)=>{
    const {name,email,password,phone} = req.body;
    const t = await sequelize.transaction();
    try {
        const hashedPassword =await bcrypt.hash(password,10)
       const response = await User.create({name,email,password:hashedPassword,phone},{transaction:t});

       if(response){
            await t.commit()
            res.status(201).json(response)
       }
    } catch (error) {
        await t.rollback()
        if(error.name == 'SequelizeUniqueConstraintError'){

           return res.status(400).json('User already Exists')
        }
        return res.status(500).json('Internal Server Error')
    }
}