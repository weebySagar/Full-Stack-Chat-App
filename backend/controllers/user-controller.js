const bcrypt = require('bcrypt');
const {Op} = require('sequelize')

const User = require('../models/user-model');
const sequelize = require('../db/database');
const { generateToken } = require('../utils/token');


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

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({where:{email}});
        
        if(user){
            bcrypt.compare(password,user.dataValues.password,(err,result)=>{
                if(result){
                    const token = generateToken(user.dataValues.id)
                    res.status(200).json({message:'User login successfully',token:token,user:user})
                }
                else{
                    res.status(401).json('User not authorized')
                }
            })
            
        }
        else{
            res.status(404).json('User not found')
        }
    } catch (error) {
        res.status(500).json('Internal server error')
    }
}


exports.getSearchedUser = async(req,res) =>{
    try {
        const {email} = req.query;

        const users = await User.findAll({
            where:{
                email:{
                    [Op.like] :`${email}%`
                }
            }
        })

        res.send(users)
    } catch (error) {
        res.status(500).send('Internal server error')
    }
}